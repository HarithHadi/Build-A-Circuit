import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './Components/Navbar'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'

function App() {
  return (
    <>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
        {/* add other pages here */}
      </Routes>
    </>
  )
}

export default App
