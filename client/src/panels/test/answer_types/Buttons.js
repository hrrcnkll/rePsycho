import React, { useState } from 'react';

import { 
    Div,
    Button,
    Spacing,
    FormItem,
    Slider,
    FixedLayout
} from '@vkontakte/vkui';

const Buttons = ({answers, callProtocol}) => {
    const is_slider = answers.length > 5;
    const [value, setValue] = useState(0);

    return (
        <Div>
        {!is_slider &&
            <>
            {answers.map(({ a_id, content, handler_info}) => (    
                <div key={a_id}>
                    <Button 
                        appearance='accent'
                        size='m'
                        mode='secondary'
                        stretched={true}
                        onClick={() => callProtocol([{ a_id, content, handler_info }])}
                    >
                        {content}
                    </Button>
                    <Spacing key={a_id}/>
                </div>
            ))}
            </>
        }
        {is_slider &&
            <>
            {answers[value].content}
            <FormItem>
                <Slider 
                    min={0} 
                    max={answers.length - 1} 
                    step={1} 
                    defaultValue={0}
                    value={value}
                    onChange={value => setValue(value)}
                />
            </FormItem>
            <Spacing size={16}/>
            <Button
                appearance='accent'
                size='l'
                mode='secondary'
                stretched={true}
                onClick={() => callProtocol([{ 
                    a_id: answers[value].a_id, 
                    content: answers[value].content, 
                    handler_info: answers[value].handler_info
                }])}
            >
                Ответить
            </Button>
            </>
        }
        </Div>
    )
};

export default Buttons;