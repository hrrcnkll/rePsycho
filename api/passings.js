const { Router } = require('express');
const Passing = require('../models/Passing');
const router = Router();

const encoder = require('../service/encoder');

// /api/passings?test_short_name=...&status=...&states=...
router.get('/', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            const vk_id = auth_info.vk_user_id;
            const { test_short_name, status, states } = request.query;
            
            const query = { vk_id };
            
            // Checking the query parameters
            if (typeof(test_short_name) !== 'undefined') {
                query.test_short_name = { $in: test_short_name.split(',') };
            }
            if (typeof(status) !== 'undefined') { 
                query.status = status;
            }
            // Receiving the required document (or documents)
            const passing = typeof(test_short_name) !== 'undefined' && test_short_name.split(',').length === 1
            && typeof(status) !== 'undefined' && status === 'in_progress'
                ? await Passing.findOne(query) 
                : await Passing.find(query);

            // Creating a deep copy of an object
            const temp = Array.isArray(passing) ? passing : (passing instanceof Object ? [passing] : [])
            const local_passing = [];
            temp.forEach(obj => {
                // Receiving answers with required state
                if (typeof(states) !== 'undefined') {
                    obj.answers = obj.answers.filter(elem => elem.state === states)
                }
                local_passing.push(obj);
            });

            response.json(local_passing);
        }
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    }
    catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'API Error (passings): Что-то пошло не так. Попробуйте снова...' });
    }
})

// /api/passings/save_answer
router.post('/save_answer', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            const vk_id = auth_info.vk_user_id;
            const { test_short_name, q_id, time, items } = request.body;
            const candidate = await Passing.findOne({ vk_id, test_short_name, status: 'in_progress' });

            if (!candidate) {
                // Create a new document in the passings collection
                const passing = new Passing({ 
                        vk_id, 
                        test_short_name, 
                        status: 'in_progress',
                        answers: [{
                            q_id,
                            time,
                            items,
                            state: 'accepted'
                        }]
                    });
                await passing.save();
                response.status(201).json({ message: 'Новое прохождение создано' });
            }
            else {
                // Updating state of the previous answer to this question
                await Passing.findOneAndUpdate({ 
                    '_id': candidate._id,
                    answers: { $elemMatch: { q_id, state: 'accepted' } }
                }, {
                    $set: { "answers.$.state": 'rejected' }
                });
                // Adding a new answer
                await Passing.findByIdAndUpdate(candidate._id, {
                    $push: { 'answers': { q_id, time, items, state: 'accepted' } }
                });
                response.status(201).json({ message: 'Ответ сохранён' });
            }
        }
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    } 
    catch (e) {
        response.status(500).json({ message: 'API Error (passings/save_answer): Что-то пошло не так. Попробуйте снова...' })
    }
})

module.exports = router;