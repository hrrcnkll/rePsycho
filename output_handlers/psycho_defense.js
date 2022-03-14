// Output handler for the "psychological defense" test
module.exports = (result) => {
    const processed = [];
    
    const factors = [
        { name: 'Вытеснение', count: 12, description: 'Вытеснение – это неосознанное устранение травмирующих событий в самую глубину личности, так что человек без помощи психолога не сможет их вспомнить.' },
        { name: 'Гиперкомпенсация', count: 10, description: 'Гиперкомпенсация (реактивные образования) – это механизм психологической защиты, характеризующийся обратным действием. То есть человек подавляет неприятное событие так, что на уровне сознания оно проявляется противоположным образом.' },
        { name: 'Замещение', count: 12, description: 'Замещение появляется, когда человек не может проявить свою агрессию на другого человека, становясь из-за этого недовольным другими. Например, не имея возможности выразить свое возмущение начальнику, человек неосознанно возмущается поведением своих подчиненных, пытаясь так компенсировать свое возмущение.' },
        { name: 'Компенсация', count: 10, description: 'Компенсация – это замена своего недостатка с помощью присвоения свойств, характеристик, умений другого человека и выдачи их за свои. Если настойчивая работа в определенном виде деятельности приводит к неудаче, человек копирует того, кто находится выше статусом.' },
        { name: 'Отрицание', count: 13, description: 'Отрицание – это механизм психологической защиты, который не принимает тревожную информацию, не признает ее как есть, искажает восприятие действительности, чтобы не нанести вред сознанию человека. Преобладает он при внезапных травмирующих ситуациях, чтобы психика могла привыкнуть к случившемуся.' },
        { name: 'Проекция', count: 13, description: 'С помощью проекции человек переносит свои переживания, мысли и чувства на другого. В большей степени это те недостатки и промахи, за которые он испытывает вину.' },
        { name: 'Рационализация', count: 13, description: 'Рационализация (интеллектуализация) – это тот случай, когда человек ложно аргументирует свое поведение. Находясь в психологическом комфорте, он объясняет себе свои поступки, скрывая при этом истинные мотивы от себя самого.' },
        { name: 'Регрессия', count: 14, description: 'Регрессия – это возвращение на стадию ребенка. При опасной ситуации человек переходит к примитивным действиям (топает ногой, плачет на публику и т.д.). Он пытается обратить на себя внимание, не уступает оппоненту, становится упрямым, не хочет ничего обсуждать.' }
    ];

    processed.push({
        output: 'clarification_description',
        factors: []
    })

    Object.keys(result[0]).forEach(name => {
        const factor = factors.find(item => item.name === name);
        processed[0].factors.push({
            name,
            description: factor.description,
            clarification: `Выраженность: ${(result[0][name] * 100 / factor.count).toFixed(0)}%`
        });
    });

    return processed;
}