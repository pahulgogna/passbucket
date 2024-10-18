import { atom, selector } from "recoil";


export const key = atom({
    key:"key",
    default: ""
})

export const allPasswordsAtom = atom({
    key:"passwords",
    default: selector({
        key:"passwordSelector",
        get: async ({get}) => {
            let passkey:string = get(key)
            if (passkey){
                return await window.context.getPasswords(passkey)
            }
            else{
                return "Key not found"
            }
        }
    })
})

export const focusPasswordAtom = atom({
    key:"InFocus",
    default: 0
})