import React from "react";
import {
    FixedLayout,
    SegmentedControl,
    Spacing
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { 
    Icon28BillheadOutline, 
    Icon28UserSquareOutline, 
    Icon28SettingsOutline
} from '@vkontakte/icons';

const NavControl = ({ activeStory, setActiveStory }) => {

    return (
      <>
      <FixedLayout vertical='top'>
        <SegmentedControl
          size='l' 
          value={activeStory}
          onChange={(value) => setActiveStory(value)}
          options={[
            {
              label: <Icon28BillheadOutline aria-hidden='true'/>,
              value: 'tests',
              'aria-label': 'Тесты'
            },
            {
              label: <Icon28UserSquareOutline aria-hidden='true'/>,
              value: 'profile',
              'aria-label': 'Профиль'
            },
            {
              label: <Icon28SettingsOutline aria-hidden='true'/>,
              value: 'settings',
              'aria-label': 'Настройки'
            }
          ]}
        />
      </FixedLayout>
    <Spacing size={34}/>
    </>
    )
};

export default NavControl