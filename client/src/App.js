import React, { useState, useEffect } from "react";
import {
  ConfigProvider, 
  AdaptivityProvider,
  usePlatform,
  AppRoot,
} from "@vkontakte/vkui";
import bridge from '@vkontakte/vk-bridge';
import "@vkontakte/vkui/dist/vkui.css";

import MainMenu from "./panels/MainMenu";

import black_blue from './images/test_template_black_blue.png';
import blue_black from './images/test_template_blue_black.png';

const App = () => {
  const [user, setUser] = useState({});

  const [settings, setSettings] = useState({
    platform: usePlatform(),
    scheme: 'bright_light',
    defaultImgs : { black_blue, blue_black }
  });

  useEffect(() => {
    bridge
      .send("VKWebAppGetUserInfo")
      .then(data => {
        delete data.id;
        setUser(user => ({ ...user, ...data }));
      })
  }, []);

  return (
    <ConfigProvider platform={settings.platform} scheme={settings.scheme}
    >
      <AdaptivityProvider>
      <AppRoot>
        <MainMenu
          user={user}
          setUser={setUser}
          settings={settings}
          setSettings={setSettings}
        />
      </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;