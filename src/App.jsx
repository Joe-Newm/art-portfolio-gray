import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Nav from "./components/Nav.jsx"
import About from "./pages/About.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Contact from "./pages/Contact.jsx"
import Footer from "./components/Footer.jsx"
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="flex flex-col min-h-screen">
      <Router>
        <Nav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
