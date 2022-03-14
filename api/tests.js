const { Router } = require('express');
const Test = require('../models/Test');
const Passing = require('../models/Passing');
const router = Router();

const encoder = require('../service/encoder');

// /api/tests?test_short_name=...&with_questions=(0/1)&with_percent=(0/1)
router.get('/', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            const { test_short_name, with_questions, with_percent } = request.query;
            
            // Getting and saving a test collection locally
            const query = typeof(test_short_name) !== 'undefined' 
            ? { 'options.is_available': true, short_name: { $in: test_short_name.split(',') } }
            : { 'options.is_available': true }

            const temp_tests = await Test.find(query);
            let tests = [];
            temp_tests.forEach(test => {
                const init = typeof(with_percent) !== 'undefined' && with_percent == true 
                    ? { add: { q_count: test.questions.filter(question => question.is_available).length, aq_count: 0 } } 
                    : {};
                tests.push(Object.assign(init, test.toObject()));
            });


            // Getting additional information about passing these tests 
            // (percentages, number of questions answered and total number of questions)
            if (typeof(with_percent) !== 'undefined' && with_percent == true) {
                const all_passings = await Passing.find({ vk_id: auth_info.vk_user_id, status: 'in_progress' });
                
                all_passings.forEach(passing => {
                    const test_index = tests.findIndex(item => item.short_name === passing.test_short_name);
                    const available_questions = tests[test_index].questions.filter(question => question.is_available);
                    
                    tests[test_index].add.aq_count = passing.answers.reduce((prev_q, curr_q) => 
                        available_questions.findIndex(question => question.q_id === curr_q.q_id) !== -1
                            ? prev_q + 1
                            : prev_q
                    , 0);
                })
            }

            // Removing the list of questions if necessary
            if (typeof(with_questions) === 'undefined' || with_questions == false) {
                tests = tests.map(item => {
                    delete item.questions;
                    return item;
                });
            }

            response.json(tests);
        }
        // If launch parameters are invalid
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    }
    catch (e) {
        response.status(500).json({ message: 'API Error (tests): Что-то пошло не так. Попробуйте снова...'});
    }
})

module.exports = router;