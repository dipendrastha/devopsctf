// make window loading index.html
const { app, BrowserWindow, ipcMain, Menu} = require('electron')
const path = require('path')

const createWindow = () => {
     Menu.setApplicationMenu(null) // 💥 removes top menu
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
        devtools: false,
        nodeIntegration: 0,
        sandbox: 0,
        contextIsolation:0
    }
  })
  
  win.webContents.on('before-input-event', (event, input) => {
  if (
    input.key === 'F12' ||
    (input.control && input.shift && input.key.toLowerCase() === 'i') ||
    (input.meta && input.alt && input.key.toLowerCase() === 'i')
  ) {
    event.preventDefault()
  }
})

  win.loadFile('./game/index.html')
}


app.whenReady().then(()=>{
    
    createWindow()
    ipcMain.handle('ping', () => 'I am called from renderer')
})


