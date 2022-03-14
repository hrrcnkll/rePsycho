import React from 'react';
import {
    Group,
    Header,
    ContentCard,
    CardGrid
} from '@vkontakte/vkui';

const ClarDesc = ({ block }) => {

    return (
        <Group header={<Header multiline mode='secondary'>Результаты с описанием факторов</Header>}>
            <CardGrid size='l'>
                {block.factors.map((factor, index) => (
                    <ContentCard
                        key={index}
                        subtitle={typeof(factor.subtitle) !== 'undefined' ? factor.subtitle : ''}
                        header={typeof(factor.name) !== 'undefined' ? factor.name : ''}
                        text={typeof(factor.clarification) !== 'undefined' ? factor.clarification : ''}
                        caption={typeof(factor.description) !== 'undefined' ? factor.description: ''}
                        mode='outline'
                    />
                ))}
            </CardGrid>
        </Group>
    )
};

export default ClarDesc;