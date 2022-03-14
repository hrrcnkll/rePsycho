import React, { useState } from 'react';

import { 
    FormLayoutGroup,
    FormItem,
    Input,
    FormLayout,
    FormStatus,
    IconButton
} from '@vkontakte/vkui';
import { Icon20AddCircle } from '@vkontakte/icons';

const Form = ({a_id, content, placeholder, currentAnswer, setCurrentAnswer, isDesktop}) => {
    // Value displayed in possible form
    const [value, setValue] = useState('');
    const name = `form${a_id}`;

    const inputHandleChange = (e) => {
        e.preventDefault();
        setValue(e.currentTarget.value);
	};

	const inputHandleSubmit = (e) => {

        if (value) {
            e.preventDefault();

            const index = currentAnswer.findIndex(item => item.a_id === a_id);
            index === -1
                ? setCurrentAnswer(currentAnswer => ([...currentAnswer, { content: value, a_id }]))
                : setCurrentAnswer(currentAnswer => ([
                    ...currentAnswer.slice(0, index), 
                    { content: value, a_id }, 
                    ...currentAnswer.slice(index + 1)
                ]))
        }
    };

    return (
        <FormLayout /*onSubmit={inputHandleSubmit}*/>
            <FormLayoutGroup mode='vertical'>
                <FormItem 
                    top={content} 
                    //bottom='Для сохранения ответа нажмите кнопку ввода или кнопку справа'
                >
                    <Input
                        type='text'
                        name={name}
                        value={value}
                        onChange={inputHandleChange}
                        placeholder={
                            isDesktop && typeof(placeholder) !== 'undefined'
                                ? placeholder 
                                : ''
                        }

                        after={
                            <IconButton
                            hoverMode="opacity"
                            aria-label="Принять ответ"
                            onClick={inputHandleSubmit}
                            >
                                <Icon20AddCircle/>
                            </IconButton>
                        }
                    />
                </FormItem>
            </FormLayoutGroup>
            {currentAnswer.findIndex(item => item.a_id === a_id) !== -1 &&
            <FormLayoutGroup
                mode='horizontal'
                removable
                onRemove={() => setCurrentAnswer(currentAnswer => ([
                    ...currentAnswer.slice(0, currentAnswer.findIndex(item => item.a_id === a_id)), 
                    ...currentAnswer.slice(currentAnswer.findIndex(item => item.a_id === a_id) + 1)
                ]))}  
            >
                <FormItem top='Ваш ответ'>
                    <FormStatus header={currentAnswer.find(item => item.a_id === a_id).content}/>
                </FormItem>
            </FormLayoutGroup>
            }
        </FormLayout>
    )
};

export default Form;