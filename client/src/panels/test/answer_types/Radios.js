import React from 'react';

import {
    FormLayout,
    FormItem,
    RadioGroup,
    Radio
} from '@vkontakte/vkui';

const Radios = ({answers, currentAnswer, setCurrentAnswer}) => {

    return (
        <>
            <FormLayout>
                <FormItem>
                    <RadioGroup>
                    {answers.map(({ a_id, content, description }) => (
                        <Radio
                            key={a_id}
                            description={typeof(description) !== 'undefined' ? description : ''}
                            checked={currentAnswer.findIndex(item => item.a_id === a_id) !== -1}
                            name='answer'
                            value={`ans${a_id}`}
                            onChange={() => setCurrentAnswer([{
                                a_id, content,
                                description: typeof(description) !== 'undefined' ? description : ''
                            }])}
                        >
                            {content}
                        </Radio>
                    ))}
                    </RadioGroup>
                </FormItem>
            </FormLayout>
        </>
    )
};

export default Radios;