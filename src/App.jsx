import style from './App.module.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './pages/Loginpage/Login.jsx'
function App() {
  return (
    <>
      <div className={style.App}>
        <Navbar />
        <Login />
      </div>
    </>
  )
}

export default App
