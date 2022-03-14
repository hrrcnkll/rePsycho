const { Router } = require('express');
const Passing = require('../models/Passing');
const User = require('../models/User');
const Test = require('../models/Test');
const router = Router();

const encoder = require('../service/encoder');

// /api/results/form_result?test_short_name=...
router.get('/form_result', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            // Initial params
            const vk_id = auth_info.vk_user_id;
            const { test_short_name } = request.query;
            const completion_date = Date.now();
            const result = [];
            
            let out = 'default';

            // Looking for the necessary passing
            const passing = await Passing.findOne({ vk_id, test_short_name, status: 'in_progress' });
            // Creating a local copy
            const local_passing = { ...passing._doc };

            // Formation of the test result
            if (local_passing) {
                // Select only accepted answers
                local_passing.answers = local_passing.answers.filter(item => item.state === 'accepted');

                // Looking for the necessary test
                const test = await Test.findOne({ short_name: test_short_name });
                out = test.options.output_handler;

                // Сalling the necessary handler
                const handler = await require(`../result_handlers/${test.options.result_handler}`);
                handler(local_passing).map(item => result.push(item));
                    
                // Adding the result to the rest
                await User.findOneAndUpdate({ vk_id }, {
                    $push: { 'results': { test_short_name, completion_date, result } }
                });
                    
                // Update the status of the current passing
                passing.status = 'completed';
                await passing.save();
            }
            
            // Run through output handler
            const output_handler = await require(`../output_handlers/${out}`);
            const processed = output_handler(result);

            response.json({ test_short_name, completion_date, result: processed });
        }
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    }
    catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'API Error (results/form_result): Что-то пошло не так. Попробуйте снова...' });
    }
})

// /api/results?test_short_name=...&is_last=(0/1)&is_processed=(0/1)
router.get('/', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            // Initial params
            const vk_id = auth_info.vk_user_id;
            const { test_short_name, is_last, is_processed } = request.query;
            const required_tests = typeof(test_short_name) !== 'undefined'
                ? test_short_name.split(',')
                : []

            const user = await User.findOne({ vk_id });
            const local_results = user.results;

            const results = [];

            // Search for a specific list of tests
            if (required_tests.length) {
                // If all results are needed
                if (typeof(is_last) !== 'undefined' && is_last == false) {
                    required_tests.map(name => {
                        results.push(...local_results.filter(item => item.test_short_name === name))
                    });
                }
                // If only the latest results are needed
                else {
                    required_tests.map(name => {
                        const first_item = local_results.find(item => item.test_short_name === name);
                        const temp = typeof(first_item) !== 'undefined' ? first_item : {};
                        
                        if (Object.keys(temp).length) {
                            const last_res = local_results.reduce((prev, curr) =>
                                    (curr.test_short_name === name) && (curr.completion_date > prev.completion_date)
                                        ? curr 
                                        : prev
                                    , temp)
                            results.push(last_res);
                        }
                    });
                }
            }
            // Search across all possible tests
            else {
                // If all results are needed
                if (typeof(is_last) !== 'undefined' && is_last == false) {
                    results.push(...local_results)
                }
                // If only the latest results are needed
                else {
                    local_results.map(elem => {
                        const idx = results.findIndex(item => item.test_short_name === elem.test_short_name);
                        
                        if (idx !== -1) {
                            if (elem.completion_date >= results[idx].completion_date) {
                                results.splice(idx, 1, elem)
                            }
                        }
                        else {
                            results.push(elem)
                        }
                    })
                }
            }

            // If processing is needed
            if (typeof(is_processed) !== 'undefined' && is_processed == true) {
                const ids = results.map(item => item.test_short_name);
                const tests = await Test.find({ short_name: { $in: ids } }, { decoration: 0, questions: 0 });
                
                const processed_results = [];
                results.forEach(({ test_short_name, completion_date, result }) => {
                        const out = require(`../output_handlers/${tests.find(elem => elem.short_name === test_short_name).options.output_handler}`);

                        processed_results.push({
                            test_short_name,
                            completion_date,
                            result: out(result)
                        });
                    });

                response.json(processed_results);
            }
            else {
                response.json(results);
            }
        }
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    }
    catch (e) {
        console.log(e.message);
        response.status(500).json({ message: 'API Error (results): Что-то пошло не так. Попробуйте снова...' });
    }
})

module.exports = router;