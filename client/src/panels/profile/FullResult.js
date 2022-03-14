import React from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack
} from '@vkontakte/vkui';

import Output from './Output';

const FullResult = ({ currentResult, setProfilePanel }) => {

    return (
        <Panel>
            <PanelHeader
                left={<PanelHeaderBack onClick={() => setProfilePanel('profile')}/>}
            >
                Результат
            </PanelHeader>
            {Object.keys(currentResult).length && 
             currentResult.result.map((block, index) => (
                <Output 
                    key={index} 
                    block={block}
                />
             ))}
        </Panel>
    )
};

export default FullResult;