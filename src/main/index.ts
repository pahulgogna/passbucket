import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { appendPassword, checkMasterPassword, configMasterPassword, deletePassword, getPasswords, masterPasswordExists } from './lib'
import { appendPasswordType, checkMasterPasswordType, configMasterPasswordType, deletePasswordType, getPasswordsType } from './types'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    title: 'passbucket',
    frame: false,
    transparent: true,
    center: true,
    resizable: false,
    focusable: true,
    visualEffectState: 'active',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      devTools: !app.isPackaged,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.key.toLowerCase() === 'r') {
          event.preventDefault()
      }
    })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('getPasswords', (_, ...args: Parameters<getPasswordsType>) => getPasswords(...args))
  ipcMain.handle('checkMaster', (_, ...args: Parameters<checkMasterPasswordType>) => checkMasterPassword(...args))
  ipcMain.handle('configMaster', (_, ...args: Parameters<configMasterPasswordType>) => configMasterPassword(...args))
  ipcMain.handle('masterPasswordExists', () => masterPasswordExists())
  ipcMain.handle('appendPassword', (_, ...args: Parameters<appendPasswordType>) => appendPassword(...args))
  ipcMain.handle('deletePassword', (_, ...args: Parameters<deletePasswordType>) => deletePassword(...args))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})