import "./ToolBar.css"

export default function ToolBar() {
  return (
    <div className='titlebar'>
        <div id='bar'>passbucket</div>
      <button onClick={() => {
        window.close()
      }}>x</button>
    </div>
  )
}