const notifier = require('node-notifier');
const { Client, GatewayIntentBits, WebhookClient } = require('discord.js');
const { botId, webhook, webhookNotifications, localNotifications  } = require('./config.json');

const { app, BrowserWindow } = require('electron')

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
}

app.whenReady().then(() => {
    mainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})