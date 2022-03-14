import React from "react";
import {
  Tabbar,
  TabbarItem
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { 
    Icon28BillheadOutline,
    Icon28UserSquareOutline,
    Icon28SettingsOutline
} from "@vkontakte/icons";

const EpicControl = ({ onStoryChange, activeStory }) => {

  return (
    <Tabbar>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === 'tests'}
            data-story="tests"
            text="Тесты"
        >
            <Icon28BillheadOutline/>
        </TabbarItem>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === 'profile'}
            data-story="profile"
            text="Профиль"
        >
            <Icon28UserSquareOutline/>
        </TabbarItem>
        <TabbarItem
        onClick={onStoryChange}
        selected={activeStory === 'settings'}
        data-story="settings"
        text="Настройки"
        ><Icon28SettingsOutline/></TabbarItem>
    </Tabbar>
  );
}

export default EpicControl;