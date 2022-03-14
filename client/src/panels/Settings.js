import React from "react";
import {
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  Cell,
  Switch,
  Spacing,
  CellButton
} from "@vkontakte/vkui";

const Settings = ({ settings, setSettings, request }) => {

    const changeSetting = (id, value) => {
      setSettings(settings => ({ ...settings, [id]: value }));
    };

    const saveSettings = async () => {
      await request('/api/users/save_settings', 'POST', settings, { Authorization: window.location.search });
    }; 

    return (
      <View activePanel="settings">
        <Panel id="settings">
          <PanelHeader>Настройки</PanelHeader>
          <Group header={<Header mode='secondary'>Оформление</Header>}>
            <Cell disabled multiline after={
                <Switch 
                  defaultChecked={settings.scheme === 'space_gray'} 
                  onClick={() => settings.scheme === 'bright_light'
                    ? changeSetting('scheme', 'space_gray') 
                    : changeSetting('scheme', 'bright_light')} 
                />
              }
            >
              Тёмная тема
            </Cell>
            <Cell disabled multiline after={
                <Switch 
                  defaultChecked={settings.has_progressbar} 
                  onClick={() => settings.has_progressbar 
                    ? changeSetting('has_progressbar', false) 
                    : changeSetting('has_progressbar', true) } 
                />
              }
            >
              Шкала прогресса
            </Cell>
            <Cell disabled multiline after={
                <Switch 
                  defaultChecked={settings.has_initial_instruction} 
                  onClick={() => settings.has_initial_instruction 
                    ? changeSetting('has_initial_instruction', false) 
                    : changeSetting('has_initial_instruction', true) } 
                />
              }
            >
              Показывать инструкцию в начале прохождения
            </Cell>
            <Spacing/>
            <CellButton 
              centered
              multiline
              onClick={() => saveSettings()}
            >
              Сохранить настройки
            </CellButton>
          </Group>
        </Panel>
      </View>
    );
  };

export default Settings;