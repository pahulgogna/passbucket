import { fullData, passwordInputFormat } from "./lib/constants"

export type checkMasterPasswordType = (password: string) => Promise<boolean>

export type configMasterPasswordType = (password: string) => Promise<boolean>

export type appendPasswordType = (toStore: passwordInputFormat, passkey: string) => Promise<passwordInputFormat[]>

export type getFullDataType = () => Promise<fullData>

export type getPasswordsType = (passkey: string) => Promise<passwordInputFormat[]>

export type masterPasswordExistsType = () => Promise<boolean>

export type deletePasswordType = (index:number, passkey: string) => Promise<passwordInputFormat[]>