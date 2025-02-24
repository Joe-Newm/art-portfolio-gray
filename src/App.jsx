import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Nav from "./components/Nav.jsx"
import About from "./pages/About.jsx"
import Admin from "./pages/Admin.jsx"
import Contact from "./pages/Contact.jsx"
import Footer from "./components/Footer.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="flex flex-col min-h-screen">
      <Router>
        <Nav />
        <main class="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
