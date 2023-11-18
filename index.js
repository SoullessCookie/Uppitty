const notifier = require('node-notifier');
const { Client, GatewayIntentBits, WebhookClient } = require('discord.js');
const { botId, webhook, webhookNotifications, localNotifications  } = require('./config.json');

const { app, BrowserWindow, shell } = require('electron')

const mainWindow = () => {
    
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Monitoring- ${botId})`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
  })

  win.loadFile('index.html')
  win.setMenu(null)

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  
}
app.whenReady().then(() => {
    mainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow()
    }
  })
})

function monitor() {
  // Add your monitor functionality
}

function settings() {
  // Add your settings functionality
}

function help() {
  // Add your help functionality
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})