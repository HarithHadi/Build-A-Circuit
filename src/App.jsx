import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './Components/Navbar'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'

function App() {
  return (
    <>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </>
  )
}

export default App
