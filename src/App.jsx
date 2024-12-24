import style from './App.module.css'
import Navbar from './components/Navbar/Navbar'
function App() {
  return (
    <>
    <Navbar/>
      <div className={style.App}>  
        <h1>For now type "/login" in the domain to see to get started</h1>
      </div>
    </>
  )
}

export default App
