const notifier = require('node-notifier');
const { Client, GatewayIntentBits, WebhookClient } = require('discord.js');
const { botId, webhook, webhookNotifications, localNotifications  } = require('./config.json');

const { app, BrowserWindow, shell } = require('electron')

const mainWindow = () => {
    
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Watching- ${botId})`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
  })

  win.loadFile('index.html')
  win.setMenu(null)

  const monitorWin = new BrowserWindow({ 
    parent: win,
    width: 500,
    height: 400,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Monitoring- ${botId})`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
   })
  monitorWin.loadFile('html/monitor.html')
  monitorWin.setMenu(null)

  const settingsWin = new BrowserWindow({ 
    parent: win,
    width: 500,
    height: 400,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Settings)`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
   })
   settingsWin.loadFile('html/settings.html')
   settingsWin.setMenu(null)

  const helpWin = new BrowserWindow({ 
    parent: win,
    width: 500,
    height: 400,
    icon: 'graphics/icon_crop.png',
    title: `Uppity (Help)`,
    frame: true,
    darkTheme: true,
    devtools: false,
    menuBarVisible: false,
    backgroundColor: '#1e2124'
   })
   helpWin.loadFile('html/help.html')
   helpWin.setMenu(null)

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})