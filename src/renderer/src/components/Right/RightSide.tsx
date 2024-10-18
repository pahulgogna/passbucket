import { allPasswordsAtom, focusPasswordAtom, key } from "@renderer/store/atom/atoms"
import { Suspense } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { SelectedPassword } from "../passwords/Passwords"
import DeleteIconSVG from "../passwords/DeleteIcon"


function RightSide() {



  const [InFocus, setInFocus ]= useRecoilState(focusPasswordAtom)
  const passkey: string = useRecoilValue(key)
  const setAllPasswords = useSetRecoilState(allPasswordsAtom)

  function DeletePassword() {
    setAllPasswords(window.context.deletePassword(InFocus - 1, passkey))
    setInFocus(0)
  }

  return (
    <div style={{ backgroundColor:"rgba(55, 55, 55, 0.75)", flex:11, textAlign:"center", alignContent:"center"}}>
      {InFocus
      ?<Suspense fallback={<h5>Loading...</h5>}>
        <div style={{
                cursor:"pointer", 
                position:"absolute",
                right:"5px",
                top:"35px",
            }} onClick={() => {DeletePassword()}}>
                <DeleteIconSVG />
          </div>
          <SelectedPassword/>
      </Suspense>
      :<h5 style={{color:"rgba(200,200,200,.95)"}}>
        Focus
      </h5>}
    </div>
  )
}

export default RightSide
