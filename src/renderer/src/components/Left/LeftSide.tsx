import AddPassword from "../Create/AddPassword"
import {PasswordsRoot} from "../passwords/Passwords"

function LeftSide() {
  return (
    <div style={{backgroundColor:"rgba(70, 70, 70, 0.75)", flex:4, justifyItems:"center", borderRight:"1px solid rgba(43, 43, 43, 1)"}}>
        <AddPassword/>
        <PasswordsRoot/>
    </div>
  )
}

export default LeftSide
