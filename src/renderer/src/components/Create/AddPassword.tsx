import { useState } from "react"
import "./index.css"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { allPasswordsAtom, key } from "@renderer/store/atom/atoms"
import { createAlert } from "@renderer/App"

function AddPassword() {
    const masterPass = useRecoilValue(key)
    
    const [title, setTitle] = useState('')
    const setPasswordsAtom = useSetRecoilState(allPasswordsAtom)
    const [password, setPassword] = useState('')

    return (
        <div>
        <table style={{padding:"5px"}} id="add-table">
                <tr>
                    <td>Title: </td>
                    <td><input type="text" value={title} onChange={(event) => {
                        setTitle(event.target.value)
                    }}/></td>
                </tr>
                <tr>
                    <td>Password: </td>
                    <td><input type="text" value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}/></td>
                </tr>
                <tr style={{textAlign:"center"}}>
                    <td colSpan={2}>
                        <button style={{padding:"3px"}} onClick={async () => {

                            if(title === '' || password === ''){
                                createAlert('Please fill all fields')
                                return
                            }
                            let NewPasswords = await window.context.appendPassword({title, password}, masterPass)
                            setPasswordsAtom(NewPasswords)
                            setPassword('')
                            setTitle('')
                        }}>Add</button>
                    </td>
                </tr>
        </table>
        </div>
    )
}

export default AddPassword
