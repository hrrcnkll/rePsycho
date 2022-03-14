import React from 'react';

import { 
    Div,
    IconButton,
    FixedLayout,
    Button
} from '@vkontakte/vkui';
import { Icon28ChevronLeftOutline, Icon28ChevronRightOutline } from '@vkontakte/icons';

const Move = ({callProtocol, can_redo, goBack}) => {

    return (
        <FixedLayout vertical='bottom'>
            {!can_redo && 
            <Div>
                <Button
                    stretched
                    size='l'
                    onClick={() => callProtocol()}
                >
                    Ответить
                </Button>
            </Div>
            }
            {can_redo &&
            <>
                <IconButton
                    style={{ float: 'right' }}
                    size='l'
                    onClick={() => callProtocol()}
                >
                    <Icon28ChevronRightOutline width={42} height={42} />
                </IconButton>
                <IconButton
                    size='l'
                    onClick={goBack}
                >
                    <Icon28ChevronLeftOutline width={42} height={42} />
                </IconButton>  
            </>
            }
        </FixedLayout>
    )
};

export default Move;