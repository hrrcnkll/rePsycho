// Output handler for the Schwartz poll
module.exports = (result) => {
    const processed = [];
    
    const factors = {
        indv: [
            { 
                id: 'Безопасность (индивидуальный приоритет)', name: 'Безопасность', count: 4, subtitle: 'Индивидуальный приоритет', 
                description: 'Безопасность — безопасность для других людей и себя, гармония, стабильность общества и взаимоотношений. Она производна от базовых индивидуальных и групповых потребностей. По мнению Ш. Шварца, существует один обобщенный тип ценности безопасность, связано это с тем, что ценности, относящиеся к коллективной безопасности, в значительной степени выражают цель безопасности и для личности (социальный порядок, безопасность семьи, национальная безопасность, взаимное расположение, взаимопомощь, чистота, чувство принадлежности, здоровье).', 
            },
            { 
                id: 'Власть (индивидуальный приоритет)', name: 'Власть', count: 4, subtitle: 'Индивидуальный приоритет', 
                description: 'Власть — социальный статус, доминирование над людьми и ресурсами. Центральная цель этого типа ценностей заключается в достижении социального статуса или престижа, контроля или доминирования над людьми и средствами (авторитет, богатство, социальная власть, сохранение своего общественного имиджа, общественное признание). Ценности власти и достижения фокусируются на социальном уважении, однако ценности достижения (например, успешный, амбициозный) подчеркивают активное проявление компетентности в непосредственном взаимодействии, в то время как ценности власти (авторитет, богатство) подчеркивают достижение или сохранение доминантной позиции в рамках целой социальной системы.', 
            },
            { 
                id: 'Гедонизм (индивидуальный приоритет)', name: 'Гедонизм', count: 4, subtitle: 'Индивидуальный приоритет', 
                description: 'Гедонизм — наслаждение или чувственное удовольствие. Мотивационная цель данного типа определяется как наслаждение или чувственное удовольствие (удовольствия, наслаждение жизнью).', 
            },
            { 
                id: 'Доброта (индивидуальный приоритет)', name: 'Доброта', count: 6, subtitle: 'Индивидуальный приоритет', 
                description: 'Доброта — сохранение и повышение благополучия близких людей. Это более узкий «просоциальный» тип ценностей по сравнению с универсализмом. Лежащая в ее основе доброжелательность сфокусирована на благополучии в повседневном взаимодействии с близкими людьми. Этот тип ценностей считается производным от потребности в позитивном взаимодействии, потребности в аффилиации и обеспечении процветания группы. Его мотивационная цель — сохранение благополучия людей, с которыми индивид находится в личных контактах (полезность, лояльность, снисходительность, честность, ответственность, дружба, зрелая любовь).', 
            },
            { 
                id: 'Достижение (индивидуальный приоритет)', name: 'Достижение', count: 4, subtitle: 'Индивидуальный приоритет', 
                description: 'Достижение — личный успех через проявление компетентности в соответствии с социальными стандартами. Проявление социальной компетентности (что составляет содержание этой ценности) в условиях доминирующих культурных стандартов влечет за собой социальное одобрение.', 
            },
            { 
                id: 'Конформность (индивидуальный приоритет)', name: 'Конформность', count: 3, subtitle: 'Индивидуальный приоритет', 
                description: 'Конформность — сдерживание действий и побуждений, которые могут навредить другим и не соответствуют социальным ожиданиям. Данная ценность является производной от требования сдерживать склонности, имеющие негативные социальные последствия (послушание, самодисциплина, вежливость, уважение родителей и старших).', 
            },
            { 
                id: 'Самостоятельность (индивидуальный приоритет)', name: 'Самостоятельность', count: 3, subtitle: 'Индивидуальный приоритет', 
                description: 'Самостоятельность — самостоятельность мысли и действия. Определяющая цель этого типа ценностей состоит в самостоятельности мышления и выбора способов действия, в творчестве и исследовательской активности. Самостоятельность как ценность производна от организменной потребности в самоконтроле и самоуправлении, а также от интеракционных потребностей в автономности и независимости.', 
            },
            { 
                id: 'Стимуляция (индивидуальный приоритет)', name: 'Стимуляция', count: 4, subtitle: 'Индивидуальный приоритет', 
                description: 'Стимуляция — стремление к новизне и волнению, глубоким переживаниям. Этот тип ценностей является производным от организменной потребности в разнообразии и глубоких переживаниях для поддержания оптимального уровня активности. Биологически обусловленные вариации потребности в стимуляции, опосредованные социальным опытом, приводят к индивидуальным различиям в значимости этой ценности.', 
            },
            { 
                id: 'Традиция (индивидуальный приоритет)', name: 'Традиция', count: 3, subtitle: 'Индивидуальный приоритет', 
                description: 'Традиция — уважение и ответственность за культурные и религиозные обычаи и идеи. Любые социальные группы вырабатывают свои символы и ритуалы. Их роль и функционирование определяются опытом группы и закрепляются в традициях и обычаях. Традиционный способ поведения становится символом групповой солидарности, выражением единых ценностей и гарантией выживания. Традиции чаще всего принимают формы религиозных обрядов, верований и норм поведения. Мотивационная цель данной ценности — уважение, принятие обычаев и идей, которые существуют в культуре (уважение традиций, смирение, благочестие, принятие своей участи, умеренность) и следование им.', 
            },
            { 
                id: 'Универсализм (индивидуальный приоритет)', name: 'Универсализм', count: 5, subtitle: 'Индивидуальный приоритет', 
                description: 'Универсализм — понимание, терпимость и защита благополучия всех людей и природы. Мотивационные цели универсализма производны от тех потребностей выживания групп и индивидов, которые становятся явно необходимыми при вступлении людей в контакт с кем-либо вне своей среды или при расширении первичной группы.', 
            },
        ],
        norm: [
            { 
                id: 'Безопасность (нормативный идеал)', name: 'Безопасность', count: 4, subtitle: 'Нормативный идеал', 
                description: 'Безопасность — безопасность для других людей и себя, гармония, стабильность общества и взаимоотношений. Она производна от базовых индивидуальных и групповых потребностей. По мнению Ш. Шварца, существует один обобщенный тип ценности безопасность, связано это с тем, что ценности, относящиеся к коллективной безопасности, в значительной степени выражают цель безопасности и для личности (социальный порядок, безопасность семьи, национальная безопасность, взаимное расположение, взаимопомощь, чистота, чувство принадлежности, здоровье).', 
            },
            { 
                id: 'Власть (нормативный идеал)', name: 'Власть', count: 5, subtitle: 'Нормативный идеал', 
                description: 'Власть — социальный статус, доминирование над людьми и ресурсами. Центральная цель этого типа ценностей заключается в достижении социального статуса или престижа, контроля или доминирования над людьми и средствами (авторитет, богатство, социальная власть, сохранение своего общественного имиджа, общественное признание). Ценности власти и достижения фокусируются на социальном уважении, однако ценности достижения (например, успешный, амбициозный) подчеркивают активное проявление компетентности в непосредственном взаимодействии, в то время как ценности власти (авторитет, богатство) подчеркивают достижение или сохранение доминантной позиции в рамках целой социальной системы.', 
            },
            { 
                id: 'Гедонизм (нормативный идеал)', name: 'Гедонизм', count: 5, subtitle: 'Нормативный идеал', 
                description: 'Гедонизм — наслаждение или чувственное удовольствие. Мотивационная цель данного типа определяется как наслаждение или чувственное удовольствие (удовольствия, наслаждение жизнью).', 
            },
            { 
                id: 'Доброта (нормативный идеал)', name: 'Доброта', count: 8, subtitle: 'Нормативный идеал', 
                description: 'Доброта — сохранение и повышение благополучия близких людей. Это более узкий «просоциальный» тип ценностей по сравнению с универсализмом. Лежащая в ее основе доброжелательность сфокусирована на благополучии в повседневном взаимодействии с близкими людьми. Этот тип ценностей считается производным от потребности в позитивном взаимодействии, потребности в аффилиации и обеспечении процветания группы. Его мотивационная цель — сохранение благополучия людей, с которыми индивид находится в личных контактах (полезность, лояльность, снисходительность, честность, ответственность, дружба, зрелая любовь).', 
            },
            { 
                id: 'Достижение (нормативный идеал)', name: 'Достижение', count: 5, subtitle: 'Нормативный идеал', 
                description: 'Достижение — личный успех через проявление компетентности в соответствии с социальными стандартами. Проявление социальной компетентности (что составляет содержание этой ценности) в условиях доминирующих культурных стандартов влечет за собой социальное одобрение.', 
            },
            { 
                id: 'Конформность (нормативный идеал)', name: 'Конформность', count: 3, subtitle: 'Нормативный идеал', 
                description: 'Конформность — сдерживание действий и побуждений, которые могут навредить другим и не соответствуют социальным ожиданиям. Данная ценность является производной от требования сдерживать склонности, имеющие негативные социальные последствия (послушание, самодисциплина, вежливость, уважение родителей и старших).', 
            },
            { 
                id: 'Самостоятельность (нормативный идеал)', name: 'Самостоятельность', count: 3, subtitle: 'Нормативный идеал', 
                description: 'Самостоятельность — самостоятельность мысли и действия. Определяющая цель этого типа ценностей состоит в самостоятельности мышления и выбора способов действия, в творчестве и исследовательской активности. Самостоятельность как ценность производна от организменной потребности в самоконтроле и самоуправлении, а также от интеракционных потребностей в автономности и независимости.', 
            },
            { 
                id: 'Стимуляция (нормативный идеал)', name: 'Стимуляция', count: 4, subtitle: 'Нормативный идеал', 
                description: 'Стимуляция — стремление к новизне и волнению, глубоким переживаниям. Этот тип ценностей является производным от организменной потребности в разнообразии и глубоких переживаниях для поддержания оптимального уровня активности. Биологически обусловленные вариации потребности в стимуляции, опосредованные социальным опытом, приводят к индивидуальным различиям в значимости этой ценности.', 
            },
            { 
                id: 'Традиция (нормативный идеал)', name: 'Традиция', count: 4, subtitle: 'Нормативный идеал', 
                description: 'Традиция — уважение и ответственность за культурные и религиозные обычаи и идеи. Любые социальные группы вырабатывают свои символы и ритуалы. Их роль и функционирование определяются опытом группы и закрепляются в традициях и обычаях. Традиционный способ поведения становится символом групповой солидарности, выражением единых ценностей и гарантией выживания. Традиции чаще всего принимают формы религиозных обрядов, верований и норм поведения. Мотивационная цель данной ценности — уважение, принятие обычаев и идей, которые существуют в культуре (уважение традиций, смирение, благочестие, принятие своей участи, умеренность) и следование им.', 
            },
            { 
                id: 'Универсализм (нормативный идеал)', name: 'Универсализм', count: 5, subtitle: 'Нормативный идеал', 
                description: 'Универсализм — понимание, терпимость и защита благополучия всех людей и природы. Мотивационные цели универсализма производны от тех потребностей выживания групп и индивидов, которые становятся явно необходимыми при вступлении людей в контакт с кем-либо вне своей среды или при расширении первичной группы.', 
            },
        ]
    };

    processed.push(
        { output: 'clarification_description', factors: [] },
        { output: 'clarification_description', factors: [] }
    )

    Object.keys(result[0]).forEach(id => {

        const factor_indv = factors.indv.find(item => item.id === id);
        const factor_norm = factors.norm.find(item => item.id === id);

        if (typeof(factor_indv) !== 'undefined') {
            processed[0].factors.push({
                subtitle: factor_indv.subtitle,
                name: factor_indv.name,
                description: factor_indv.description,
                clarification: (result[0][id] / factor_indv.count).toFixed(5)
            });
        }
        else {
            processed[1].factors.push({
                subtitle: factor_norm.subtitle,
                name: factor_norm.name,
                description: factor_norm.description,
                clarification: (result[0][id] / factor_norm.count).toFixed(5)
            });
        }
    });

    processed[0].factors = processed[0].factors
        .sort((a, b) => a.clarification < b.clarification ? 1 : -1)
        .map((item, index) => ({ ...item, clarification: `Приоритет №${index + 1}`}));
    
    processed[1].factors = processed[1].factors
        .sort((a, b) => a.clarification < b.clarification ? 1 : -1)
        .map((item, index) => ({ ...item, clarification: `Приоритет №${index + 1}`}));

    return processed;
}
