import React from 'react';

import {
    Checkbox,
    Spacing
} from '@vkontakte/vkui';
import Form from './Form';

const Checkboxes = ({answers, with_form, currentAnswer, setCurrentAnswer}) => {
    // Select (remove) the required checkbox
    const chooseBox = (answer) => {
		const index = currentAnswer.findIndex(item => item.a_id === answer.a_id)
        index === -1
            ? setCurrentAnswer(currentAnswer => ([...currentAnswer, answer]))
            : setCurrentAnswer(currentAnswer => ([...currentAnswer.slice(0, index), ...currentAnswer.slice(index + 1)]))
	};

    return (
        <>
            {answers.map(({ a_id, content, description }, index) => (    
                <div key={a_id}>
                    {(index !== (answers.length - 1) || 
                     (typeof(with_form) === 'undefined' || (typeof(with_form) !== 'undefined' && !with_form))) && 
                    <>
                    <Checkbox
                        description={typeof(description) !== 'undefined' ? description : ''} 
                        checked={currentAnswer.filter(item => item.a_id === a_id).length}
                        onChange={() => chooseBox({ content, a_id })}
                    >
                        {content}
                    </Checkbox>
                    <Spacing key={a_id}/>
                    </>
                    }
                    {index === (answers.length - 1) && (typeof(with_form) !== 'undefined' && with_form) &&
                    <Form
                        a_id={a_id}
                        content={content}
                        currentAnswer={currentAnswer}
                        setCurrentAnswer={setCurrentAnswer}
                    />
                    }
                </div>
            ))}
        </>
    )
};

export default Checkboxes;