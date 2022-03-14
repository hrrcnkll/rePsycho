import React from 'react';

import { 
    Group,
    Header,
} from '@vkontakte/vkui';

import Buttons from './answer_types/Buttons';
import Friends from './answer_types/Friends';
import Checkboxes from './answer_types/Checkboxes';
import Forms from './answer_types/Forms';
import Radios from './answer_types/Radios';


const Answer = ({question, callProtocol, currentAnswer, setCurrentAnswer, isDesktop}) => {
    const { type, with_form } = question;
    const answers = question.answers.filter(item => item.is_available).sort((a, b) => a.position > b.position ? 1 : -1)

    const AnswerType = () => {
        if (type === 'buttons') {
            return <Buttons answers={answers} callProtocol={callProtocol} />;
        }
        else if (type === 'friends') {
            return <Friends 
                answers={answers} 
                callProtocol={callProtocol} 
                currentAnswer={currentAnswer}
                setCurrentAnswer={setCurrentAnswer}
            />;
        }
        else if (type === 'checkboxes') {
            return <Checkboxes
                answers={answers} 
                with_form={with_form}
                currentAnswer={currentAnswer}
                setCurrentAnswer={setCurrentAnswer}
            />
        }
        else if (type === 'forms') {
            return <Forms
                answers={answers} 
                currentAnswer={currentAnswer}
                setCurrentAnswer={setCurrentAnswer}
                isDesktop={isDesktop}
            />
        }
        else if (type === 'radios') {
            return <Radios
                answers={answers} 
                currentAnswer={currentAnswer}
                setCurrentAnswer={setCurrentAnswer}
            />
        }
    }

    return (
        <>
        <Group header={<Header>Варианты ответа</Header>}>
            <AnswerType/>
        </Group>
        </>
    )
};

export default Answer;