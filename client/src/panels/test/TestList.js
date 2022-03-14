import React from 'react';

import { 
    Group,
    CardGrid,
    ContentCard
} from '@vkontakte/vkui';

const TestList = ({testList, viewWidth, scheme, setTest, percents, setPercents, defaultImgs}) => {

    return (
        <Group>
            <CardGrid size={viewWidth >= 3 ? 'm': 'l'}>
                {testList.map((item) => (
                    <TestItem
                        key={item._id} 
                        item={item} 
                        width={viewWidth}
                        scheme={scheme}
                        setTest={setTest}
                        percent={percents[item.short_name]}
                        setPercents={setPercents}
                        defaultImgs={defaultImgs}
                    />
                ))}
            </CardGrid>
        </Group>
    )
};

const TestItem = ({item, width, scheme, setTest, percent, setPercents, defaultImgs}) => {
    const perc = Math.round((percent.aq_count * 100) / percent.q_count);
    const photo = typeof(item.decoration.photo) !== 'undefined' && item.decoration.photo !== 'default'
        ? item.decoration.photo
        : 'default'

    return (
        <>
        <ContentCard
            onClick={() => setTest(item.short_name)}
            src={
                photo !== 'default'
                    ? photo
                    : scheme === 'bright_light' ? defaultImgs.blue_black : defaultImgs.black_blue
            }
            maxHeight={120}
            mode='tint'
            header={item.full_name}
            text={item.decoration.description.substring(0, Math.min(300, item.decoration.description.length))}
            subtitle={perc !== 0 ? `Пройден на ${perc}% (${percent.aq_count}/${percent.q_count})` : ''}
        />
        </>
    )
};

export default TestList;