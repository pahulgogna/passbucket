import { homedir } from "os";
import { AppDirectoryName, fullData, passwordInputFormat, StorageSchema } from "./constants";
import { ensureDir } from "fs-extra";
import CryptoJS from "crypto-js"
import { readFile, writeFile } from "fs/promises";
import crypto from "crypto"


const encryptWithAES = (text: string, passphrase: string): string => {
    return CryptoJS.AES.encrypt(text, passphrase).toString()
}
  
const decryptWithAES = (ciphertext :string, passphrase: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
}

function createPasswordHash(inputString:string):string {
    const hash = crypto.createHash('sha256')
    hash.update(`${inputString}`)
    return hash.digest('hex')
}

export function getRootDir():string {
    return `${homedir()}/${AppDirectoryName}`
}

export async function writePasswordData(data: fullData): Promise<void> {
    const rootDir = getRootDir()
    await ensureDir(rootDir)
    await writeFile(rootDir + '/passbucket.json', JSON.stringify(data)).catch((err) => {console.error(err)})    
}

export async function appendPassword(toStore: passwordInputFormat, passkey:string): Promise<passwordInputFormat[]> {
    let data: fullData = await getFullData()
    let passwords: passwordInputFormat[] = []

    if (data.passwords) {
        passwords = JSON.parse(decryptWithAES(data.passwords, passkey));
    }

    passwords.push(toStore);

    data.passwords = encryptWithAES(JSON.stringify(passwords), passkey)
    await writePasswordData(data)

    return passwords
}

export async function getFullData(): Promise<fullData> {
    const rootDir:string = getRootDir()
    await ensureDir(rootDir)
    let content = await readFile(rootDir + '/passbucket.json', 'utf8')
        .then(async (data) => {
            return await JSON.parse(data)
            })
        .catch(async () => {
        await writeFile(rootDir + '/passbucket.json', JSON.stringify(StorageSchema))
        return StorageSchema
        })
    return content
}

export async function checkMasterPassword(password:string):Promise<boolean> {
    let data = await getFullData()
    let hashedPassword = createPasswordHash(password)
    if(hashedPassword === data.master){
        return true
    }
    else{
        return false
    }
}

export async function configMasterPassword(password:string): Promise<boolean> {
    try{
        await writePasswordData({"master":createPasswordHash(password), "passwords":""})
        return true
    }
    catch{
        return false
    }
}

export async function getPasswords(passkey:string): Promise<passwordInputFormat[]> {
    let data: fullData = await getFullData()
    let passwords: passwordInputFormat[] = []
    if(data.passwords !== "") {
    passwords = JSON.parse(decryptWithAES(data.passwords, passkey));
    }
    return passwords;
}

export async function masterPasswordExists(): Promise<boolean> {
    let data = await getFullData()
    if(data.master){
        return true
    }
    else{
        return false
    }
}

export async function deletePassword (index: number, passkey: string): Promise<passwordInputFormat[]> {
    let data: fullData = await getFullData()
    let passwords: passwordInputFormat[] = JSON.parse(decryptWithAES(data.passwords, passkey));
    passwords.splice(index, 1);
    data.passwords = encryptWithAES(JSON.stringify(passwords), passkey);
    await writePasswordData(data);
    return passwords;
}