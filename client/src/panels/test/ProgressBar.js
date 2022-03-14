import React from 'react';

import { 
    Div,
    Group,
    Header,
    Progress
} from '@vkontakte/vkui';

const Question = ({value}) => {

    return (
        <Group header={
            <Header
                mode='secondary'
                multiline
            >
                Тест пройден на {Math.round(value)}%
            </Header>
        }>
            <Div>
                <Progress value={Math.round(value)} />
            </Div>
        </Group>
    )
};

export default Question;