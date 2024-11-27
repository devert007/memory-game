import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { init, mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';

const initializeTelegramSDK = async () => {
  try {
    // Attempt to initialize the real Telegram environment
    console.log("Initializing Telegram environment");
    const [miniApp] = await init();
    await miniApp.ready();
    miniApp.setHeaderColor('#fcb69f');
  } catch (error) {
    // In case of an error, initialize the mock Telegram environment
    console.error('Error initializing Telegram:', error);

    const initDataRaw = new URLSearchParams([
      ['user', JSON.stringify({
        id: 9928132,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      })],
      ['hash', '89d70994138648723846723846723846723846723846723846723846'],
      ['auth_date', '1716922846'],
      ['start_param', 'debug'],
      ['chat_type', 'sender'],
      ['chat_instance', '846723846723846723846723846723846723846723846723846'],
    ]).toString();

    mockTelegramEnv({
      themeParams: {
        accentTextColor: '#6ab2f2',
        bgColor: '#17212b',
        buttonColor: '#5288c1',
        buttonTextColor: '#ffffff',
        destructiveTextColor: '#ec3942',
        headerBgColor: '#fcb69f',
        hintColor: '#708499',
        linkColor: '#6ab2f2',
        secondaryBgColor: '#232e3c',
        sectionBgColor: '#17212b',
        sectionHeaderTextColor: '#6ab2f2',
        subtitleTextColor: '#708499',
        textColor: '#f5f5f5',
      },
      initData: parseInitData(initDataRaw),
      initDataRaw,
      version: '7.2',
      platform: 'tdesktop',
    });

    console.log('Mock Telegram environment initialized');
  }
};

// Initialize SDK
initializeTelegramSDK();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);