import { Suspense, useMemo, useState } from 'react'
import './Passwords.css'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { allPasswordsAtom, focusPasswordAtom } from '@renderer/store/atom/atoms'

export function PasswordsRoot() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='passwordsRoot'>
                <Passwords />
            </div>
        </Suspense>
    )
}

function Passwords() {
    let passwords = useRecoilValue(allPasswordsAtom)
    return (
        <div className='passwords'>
            {Array.isArray(passwords) ? (
                passwords.map((password, index) => (
                    <PasswordPreview key={index} title={password.title} id={index} />
                ))
            ) : (
                <div>
                    {passwords}!!
                    <br/>
                    Please Relaunch the Application to Configure the Key
                </div>
            )}
        </div>
    )
}

export function SelectedPassword() {
    let passwords = useRecoilValue(allPasswordsAtom)
    let inFocus = useRecoilValue(focusPasswordAtom)
    return (
        <div className='passwords'>
            {Array.isArray(passwords) ? (
                <PasswordInFocus title={passwords[inFocus-1].title} password={passwords[inFocus-1].password} />
            ) : (
                <div>{passwords}</div>
            )}
        </div>
    )
}


function PasswordPreview({title, id}){
    const setInFocus = useSetRecoilState(focusPasswordAtom)
    return(
        <div className='preview' onClick={() => {
            setInFocus(id+1)
        }}>
            <h4 style={{flex:1}}>{title}</h4> <h4>{'>'}</h4>
        </div>
    )
}


function PasswordInFocus({title, password}) {

    type textOrPassword = 'text' | 'password'

    function TimeOut(to: string, from: string, setFrom: Function, time:number = 2000) {
        setFrom(to)
        setTimeout(() => {
            setFrom(from)
        },time)
    }

    const copyButtonText = 'copy'
    const [show, setShow] = useState(false)
    const [copyText, setCopyText] = useState(copyButtonText)
    let toShowType: textOrPassword = useMemo(
        () => show? 'text':'password'
    ,[show])
    return (
        <>

            <div className='passwordRoot'>
                <h3 className='passwordTitle' style={{height:"3.5vh"}}><u>{title}</u></h3>
                
                <input type={toShowType} name="" className="password" value={password} readOnly></input>
                <br/>

                <button style={{cursor:"pointer"}} onClick={() => {
                    setShow(s => !s)}}>
                    {show?"hide":"show"}
                </button>

                <button style={{cursor:"pointer"}} onClick={() => {
                    navigator.clipboard.writeText(password)
                    .then(() => {TimeOut("✔", copyButtonText, setCopyText)})
                    .catch(err => {console.error('Failed to copy text: ', err);})
                }}>
                    {copyText}
                </button>
            </div>
        </>
    )
}