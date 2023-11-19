const notifier = require('node-notifier');
const { Client, GatewayIntentBits, WebhookClient } = require('discord.js');
const { botId, webhook, webhookNotifications, localNotifications  } = require('./config.json');

const { app, BrowserWindow, shell, ipcRenderer, ipcMain } = require('electron');


function createMonitorWindow() {
  monitorWin = new BrowserWindow({
    parent: mainWindow,
    width: 500,
    height: 400,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Monitoring- ${botId})`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
  });

  monitorWin.loadFile('html/monitor.html');
  monitorWin.setMenu(null);

  try {
    ipcRenderer.send('log', 'Creating Monitor Window');
  } catch (error) {
    ipcRenderer.send('log', 'Error creating Monitor Window:', error);
  }

  monitorWin.on('closed', () => {
    monitorWin = null;
  });
};

function createSettingsWindow() {
  settingsWin = new BrowserWindow({
    parent: mainWindow,
    width: 500,
    height: 400,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Settings)`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
  });

  settingsWin.loadFile('html/settings.html');
  settingsWin.setMenu(null);

  settingsWin.on('closed', () => {
    settingsWin = null;
  });
};

function createHelpWindow() {
  helpWin = new BrowserWindow({
    parent: mainWindow,
    width: 500,
    height: 400,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Help)`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
  });

  helpWin.loadFile('html/help.html');
  helpWin.setMenu(null);

  helpWin.on('closed', () => {
    helpWin = null;
  });
};

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Watching- ${botId})`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
  });

  mainWindow.loadFile('index.html');
  

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

ipcMain.on('log', (event, message) => {
  console.log(message);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});