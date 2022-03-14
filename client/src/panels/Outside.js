import React from "react";
import {
    View, 
    Panel, 
    PanelHeader,
    Group,
    Placeholder
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Icon56FileBrokenOutline } from '@vkontakte/icons';

const Outside = () => {

    return (
        <View id='outside' activePanel='outside'>
            <Panel id='outside'>
            <PanelHeader>Неизвестная обстановка</PanelHeader>
                <Group>
                    <Placeholder
                        //stretched
                        icon={<Icon56FileBrokenOutline />}
                        header="«Не выходи из комнаты, не совершай ошибку...»"
                    >
                        Похоже, что Вы пытаетесь зайти в приложение из стороннего ресурса. 
                        Для прохождения тестов, пожалуйста, войдите в мини-приложение ВКонтакте!
                    </Placeholder>
                </Group>
            </Panel>
        </View>
    )
};

export default Outside;