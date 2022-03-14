import React from 'react';

import { 
    Div,
    Group,
    Header,
    Gallery
} from '@vkontakte/vkui';

const Question = ({question, number, isDesktop}) => {

    const photos = Array.isArray(question.photo) 
        ? question.photo
        : [question.photo]

    return (
        <Group header={<Header>Вопрос №{number + 1}</Header>}>
            <Div>
                {question.content}
            </Div>
            {typeof(question.photo) !== 'undefined' && 
            <Div style={{ textAlign: 'center' }}>
                <Gallery align='center' showArrows>
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            alt={`question${index + 1}_photo`}
                            src={photo.url}
                            style={{ 
                                display: 'block', 
                                width: isDesktop && typeof photo.scale !== 'undefined' 
                                    ? `${photo.scale}%` 
                                    : '100%', 
                                height: isDesktop && typeof photo.scale !== 'undefined' 
                                    ? `${photo.scale}%` 
                                    : '100%', 
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        />
                    ))}
                </Gallery>
            </Div>
            }
        </Group>
    )
};

export default Question;