import React from 'react';
import {
    Group,
    Placeholder
} from '@vkontakte/vkui';
import { Icon56GestureOutline } from '@vkontakte/icons';

const Default = ({ block }) => {

    return (
        <Group>
            <Placeholder
                icon={<Icon56GestureOutline/>}
                header={typeof(block.header) !== 'undefined' ? block.header : ''}
            >
                {block.content}
            </Placeholder>
        </Group>
    )
};

export default Default;