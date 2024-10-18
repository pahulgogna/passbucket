export const AppDirectoryName = ".passbucket"

export const StorageSchema = {
            "master": "",
            "passwords":""
        }

export interface passwordInputFormat {
    title: string,
    password: string 
}

export interface fullData {
    master: string,
    passwords: string
}