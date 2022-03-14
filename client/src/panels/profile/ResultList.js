import React from 'react';

import { 
    Group,
    CardGrid,
    ContentCard,
    Header,
    Placeholder
} from '@vkontakte/vkui';
import { Icon56DocumentOutline } from '@vkontakte/icons';

import dateConverter from '../../utils/dateConverter';

const ResultList = ({ results, testList, setProfilePanel, setCurrentResult }) => {

    const showResult = (item) => {
        setCurrentResult(item);
        setProfilePanel('result');
    };

    const lastResults = Object.keys(results).map(name => {
        const test = testList.find(item => item.short_name === name);
        return { 
            short_name: test.short_name,
            full_name: test.full_name,
            completion_date: dateConverter(results[name].completion_date),
            result: results[name].result
        }
    }).sort((a, b) => a.completion_date.utc < b.completion_date.utc ? 1 : -1);

    return (
        <Group header={<Header multiline mode='secondary'>Результаты последних прохождений</Header>}>
            {!(Object.keys(results).length) &&
                <Placeholder
                    icon={<Icon56DocumentOutline/>}
                    header='Вы пока не прошли ни одного теста...&#128546;'
                />
            }
            <CardGrid size='l'>
                {lastResults.map((item, index) => (
                    <ResultItem
                        key={index} 
                        item={item}
                        showResult={showResult}
                    />
                ))}
            </CardGrid>
        </Group>
    )
};

const ResultItem = ({ item, showResult}) => {

    return (
        <>
        <ContentCard
            onClick={() => showResult(item)}
            maxHeight={120}
            mode='tint'
            //subtitle='rePsycho'
            header={item.full_name}
            caption={`Тест был пройден в ${item.completion_date.HM} ${item.completion_date.DMY}`}
        />
        </>
    )
};

export default ResultList;