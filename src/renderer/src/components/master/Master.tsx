import { createAlert } from '@renderer/App'
import { key } from '@renderer/store/atom/atoms'
import { useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import './Master.css'

function Master() {

    const [masterExists, setMasterExists] = useState(false)

    useEffect(() => {
        window.context.masterPasswordExists().then((res: boolean) => {
            setMasterExists(res)
    })},[])

    return (
        <div id='masterPasswordsContainer'>
            {masterExists? <CheckMaster/> : <ConfigMaster/>}
        </div>
    )

}

function CheckMaster() {
    type textOrPassword = 'text' | 'password'

    const setInputPassword = useSetRecoilState(key)

    const [tempPass, setTempPass] = useState('')

    const [show, setShow] = useState(false)
    let toShowType: textOrPassword = useMemo(
        () => show? 'text':'password'
    ,[show])

    return (
        <div>
            <h2>Enter master password</h2>
            <input type={toShowType} onChange={(e) => {
                setTempPass(e.target.value)
            }} onKeyDown={(e) => {
                if(e.key == "Enter"){
                    let submitBtn = document.getElementById('submitBtn')
                    if(submitBtn){
                        submitBtn.click()
                }}
            }}/>
            <button style={{}} onClick={() => {
                            setShow(s => !s)}}>{show?"hide":"show"}</button>

            <button id="submitBtn" onClick={async () => {
                if(tempPass === ""){
                    createAlert("Empty Password")
                    return
                }
                let verified = await window.context.checkMaster(tempPass)
                if(verified){
                    setInputPassword(tempPass)
                    return
                }
                else{
                    createAlert("Incorrect Password")
                    return
                }}}>
                    Submit
                </button>
        </div>
    )
}

function ConfigMaster() {
    type textOrPassword = 'text' | 'password'

    const setInputPassword = useSetRecoilState(key)

    const [tempPass, setTempPass] = useState('')

    const [show, setShow] = useState(false)
    let toShowType: textOrPassword = useMemo(
        () => show? 'text':'password'
    ,[show])

    return (
        <div>
            <h2>Enter new master password</h2>
            <input type={toShowType} onChange={(e) => {
                setTempPass(e.target.value)
            }}/>
            <button style={{width:"5vw",textAlign:"center",cursor:"pointer", height:"3.5vh"}} onClick={() => {
                            setShow(s => !s)}}>{show?"hide":"show"}</button>

            <button onClick={async () => {
                if(tempPass === ""){
                    createAlert("Empty Password")
                    return
                }
                let updated = await window.context.configMaster(tempPass)
                if(updated){
                    setInputPassword(tempPass)
                    createAlert("Master Password Created Successfully")
                    return
                }
                else{
                    createAlert("Failed to Create The Master Password")
                    return
                }
            }}>Submit</button>
        </div>
    )
}

export default Master