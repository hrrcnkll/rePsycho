import React from 'react';

import { Spacing } from '@vkontakte/vkui';
import Form from './Form';

const Forms = ({answers, currentAnswer, setCurrentAnswer, isDesktop}) => {

    return (
        <>
            {answers.map(({ a_id, content, placeholder }, index) => (    
                <div key={index}>
                    <Form
                        a_id={a_id}
                        content={content}
                        placeholder={placeholder}
                        currentAnswer={currentAnswer}
                        setCurrentAnswer={setCurrentAnswer}
                        isDesktop={isDesktop}
                    />
                    <Spacing key={index}/>
                </div>
            ))}
        </>
    )
};

export default Forms;