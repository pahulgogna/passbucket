import { ElectronAPI } from '@electron-toolkit/preload'

interface passwordInputFormat {
  title: string,
  password: string 
}
type getPassType = (key:string) => Promise<passwordInputFormat[]>


declare global {
  interface Window {
    context: {
      getPasswords: getPassType,
      checkMaster: checkMasterPasswordType,
      configMaster: configMasterPasswordType,
      masterPasswordExists: masterPasswordExistsType,
      appendPassword: appendPasswordType,
      deletePassword: deletePasswordType
    }
  }
}
