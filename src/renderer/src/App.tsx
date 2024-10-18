import { RecoilRoot, useRecoilValue } from 'recoil'
import ToolBar from './components/ToolBar/ToolBar'
import LeftSide from './components/Left/LeftSide'
import RightSide from './components/Right/RightSide'
import Master from './components/master/Master'
import { useEffect } from 'react'
import { key } from './store/atom/atoms'

function App(): JSX.Element {

  return (
    <>
      <ToolBar/>
      <Alert/>
      <RecoilRoot>
        
        <MainApp/>
        
      </RecoilRoot>
    </>
  )
}

export function createAlert(message: string){
  let alert = document.getElementById('alert')
  if(alert){
    alert.innerHTML = message
    alert.parentElement!.style.display = 'block'
    setTimeout(() => {
      alert.parentElement!.style.display = 'none'
    }, 3000);
  }
}

function MainApp(){
  let pass = useRecoilValue(key)

  useEffect(() => {
    if(pass){
      let mainApp = document.getElementById('mainAppContainer')
      if(mainApp){
        mainApp.style.display = 'flex'
        }
      }
    }
  ,[pass])

  return pass === "" ? <Master/> : (
    <div id='mainAppContainer'
    style={
      {
        display:'none',
      }
    }
    >
      
      <LeftSide/>
      <RightSide/>
    </div>
  )
  
}


function Alert(){
  return (
    <div style={{
      position:'absolute',
      borderRadius:"7px",
      paddingRight:"10px",
      paddingLeft:"10px",
      top:"35px", 
      right:"5px",
      backgroundColor:'rgba(255, 3, 3, 0.53)',
      display:'none'
      }}>
      <h3 style={{color:"white"}} id='alert'></h3>
    </div>
  )
}

export default App
