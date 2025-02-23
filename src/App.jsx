import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Nav from "./components/Nav.jsx"
import About from "./pages/About.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />

      </Routes>

    </Router>
  )
}

export default App
