import { contextBridge, ipcRenderer } from 'electron'
import { passwordInputFormat } from '../main/lib/constants'

if (!process.contextIsolated) {
  throw new Error('cotextIsolation must be eneabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    getPasswords: (passkey:string) => ipcRenderer.invoke('getPasswords', passkey),
    checkMaster: (password: string) =>  ipcRenderer.invoke('checkMaster', password),
    configMaster: (password: string) => ipcRenderer.invoke('configMaster', password),
    masterPasswordExists: () => ipcRenderer.invoke('masterPasswordExists'),
    appendPassword: (toStore: passwordInputFormat, passkey: string) => ipcRenderer.invoke('appendPassword', toStore, passkey),
    deletePassword: (index:number, passkey: string) => ipcRenderer.invoke('deletePassword', index, passkey)
  })
} catch (error) {
  console.error(error)
}
