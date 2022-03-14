import React, { useState, useEffect } from 'react';

import Question from './Question';
import Answer from './Answer';
import ProgressBar from './ProgressBar';
import Move from './Move';
import { Spacing } from '@vkontakte/vkui';

const TestLogic = ({ 
    test, passingObj, setPassingObj, 
    setActiveModal, vk, request, showNotice, 
    finishTest, settings, isDesktop,
    results, percents, setPercents
 }) => {
    // First unanswered question number
    const [number, setNumber] = useState(0);
    // Answers to the current question
    const [currentAnswer, setCurrentAnswer] = useState([]);

    const callProtocol = async (current_answer = [...currentAnswer], check_conditions = true) => {
        
        // Conditions for the minimum and maximum number of answers
        const { min_count, max_count } = test.questions[number]
        
        // If an empty answer came (an empty array)
        if (!current_answer.length) {
            // If this question has already been answered
            if (typeof(passingObj[test.short_name][number]) !== 'undefined') {
                // To the next question
                if (number !== test.questions.length - 1) {
                    setNumber(number + 1)
                }
                // From the last question to the first unanswered
                else {
                    const index = passingObj[test.short_name].findIndex(item => typeof(item) === 'undefined');
                    index !== -1 ? setNumber(index) : setNumber(passingObj[test.short_name].length)  
                }
                return;
            }
            // Check if the question can be skipped
            else if (check_conditions && typeof(min_count) !== 'undefined' && !min_count) {
                current_answer = [{ 'content': 'question_skipped' }];
            }
            // If can't miss
            else {
                showNotice('Вопрос остался без ответа :(');
                return;
            }
        }
        // If a non-empty answer came (non-empty array)
        else {
            // If need to check the conditions
            if (check_conditions) {
                // Minimum count check
                if (typeof(min_count) !== 'undefined' && current_answer.length < min_count) {
                    showNotice('На вопрос дано недостаточно ответов :(');
                    return;
                }
                // Maximum count check
                if (typeof(max_count) !== 'undefined' && current_answer.length > max_count) {
                    showNotice('На вопрос дано слишком много ответов :(');
                    return;
                }
            }
        }
        
        // Creating a body for a POST request
        const time = Date.now();
        const body = {
            vk_id: vk,
            test_short_name: test.short_name,
            q_id: test.questions[number].q_id,
            time,
            items: current_answer
        };
        //console.log(body);
        
        // Sending answer to the server
        await request('/api/passings/save_answer', 'POST', body, { Authorization: window.location.search });

        // Saving answer in a local copy
        const temp = [...passingObj[test.short_name]];
        temp[number] = {
            q_id: test.questions[number].q_id,
            state: 'accepted',
            time,
            items: current_answer
        };
        setPassingObj(passingObj => ({ 
            ...passingObj, 
            [test.short_name]: temp
        }));
    }

    const goBack = () => {
        if (number !== 0) {
            setCurrentAnswer([]);
            setNumber(number - 1);
        }
    }

    useEffect(() => {
        // Passing percentage update
        setPercents(percents => ({ 
            ...percents, 
            [test.short_name]: 
            Object.keys(results).includes(test.short_name) && !passingObj[test.short_name].filter(Boolean).length
                ? {
                    aq_count: percents[test.short_name].q_count,
                    q_count: percents[test.short_name].q_count 
                } : {
                    aq_count: passingObj[test.short_name].filter(Boolean).length,
                    q_count: percents[test.short_name].q_count
                }
        }));

        if (!passingObj[test.short_name].length) {
            setNumber(0);
        }
        else {
            // Clear current answers
            setCurrentAnswer([]);
            // Go to next question
            if (passingObj[test.short_name].filter(Boolean).length !== test.questions.length) {
                // To the next question
                if (number !== test.questions.length - 1) {
                    setNumber(number + 1)
                }
                // From the last question to the first unanswered
                else {
                    const index = passingObj[test.short_name].findIndex(item => typeof(item) === 'undefined');
                    index !== -1 ? setNumber(index) : setNumber(passingObj[test.short_name].length)  
                }
            }
            // Test completion
            else {
                finishTest(test.short_name);
            }
        }
    }, [passingObj])
    
    useEffect(() => {
        if (passingObj[test.short_name].length !== 0) {
            const index = passingObj[test.short_name].findIndex(item => typeof(item) === 'undefined');
            index !== -1 ? setNumber(index) : setNumber(passingObj[test.short_name].length)
        }
        else if (settings.has_initial_instruction) {
            setActiveModal('instruction');
        }
    }, [])

    return (
        <>
            {settings.has_progressbar &&
            <ProgressBar value={passingObj[test.short_name].filter(Boolean).length * (100 / test.questions.length)}/>
            }
            <Question question={test.questions[number]} number={number} isDesktop={isDesktop}/>
            <Answer
                question={test.questions[number]}
                callProtocol={callProtocol}
                currentAnswer={currentAnswer} 
                setCurrentAnswer={setCurrentAnswer}
                isDesktop={isDesktop}
            />
            {test.questions[number].type !== 'buttons' &&
            <>
            <Spacing size={40}/>
            <Move
                callProtocol={callProtocol}
                can_redo={test.options.can_redo}
                goBack={goBack}
            />
            </>
            }
        </>
    )
};

export default TestLogic;