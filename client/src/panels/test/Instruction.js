import React, { Fragment } from 'react';
import showdown from 'showdown';

import { 
    Div,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    ANDROID,
    VKCOM,
    IOS
} from '@vkontakte/vkui';
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons';

const Text = ({ instruction }) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(instruction + '\n\n**Вы всегда можете вернуться к инструкции, нажав на значок наверху**.');

    return (
        <Div><div dangerouslySetInnerHTML={{ __html: html }} /></Div>
    )
};

const Instruction = (props) => {
    
    return (
        <ModalPage
            id='instruction'
            header={
            <ModalPageHeader
                left={
                <Fragment>
                    {(props.platform === ANDROID || props.platform === VKCOM) && (
                    <PanelHeaderButton 
                        aria-label='instr_cancel' 
                        onClick={() => props.setActiveModal(null)}>
                        <Icon24Cancel />
                    </PanelHeaderButton>
                    )}
                </Fragment>
                }
                right={
                <Fragment>
                    {(props.platform === ANDROID || props.platform === VKCOM) && (
                    <PanelHeaderButton 
                        aria-label='instr_done' 
                        onClick={() => props.setActiveModal(null)}>
                        <Icon24Done />
                    </PanelHeaderButton>
                    )}
                    {props.platform === IOS && (
                    <PanelHeaderButton 
                        aria-label='instr_ready' 
                        onClick={() => props.setActiveModal(null)}>
                        Готово
                    </PanelHeaderButton>
                    )}
                </Fragment>
                }
            >
                Инструкция
            </ModalPageHeader>
            }
        >
            {typeof(props.currentTest.decoration) !== 'undefined' && 
            typeof(props.currentTest.decoration.instruction) !== 'undefined' && 
                <Text instruction={props.currentTest.decoration.instruction}/>
            }
        </ModalPage>
    )
};

export default Instruction;
