import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/"  element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
      <ToastContainer
      autoClose={1800} />
    </>
  )
}

export default App
