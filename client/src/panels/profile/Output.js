import React from 'react';

import Default from './output_types/Default';
import ClarDesc from './output_types/ClarDesc';

const Output = ({ block }) => {

    const OutputType = () => {
        if (block.output === 'default') {
            return <Default block={block}/>
        }
        else if (block.output === 'clarification_description') {
            return <ClarDesc block={block}/>
        }
    }; 

    return (
        <OutputType/>
    )
};

export default Output;