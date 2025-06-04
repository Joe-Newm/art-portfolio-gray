import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Nav from "./components/Nav.jsx"
import About from "./pages/About.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import MoreInfo from "./pages/MoreInfo.jsx"
import Contact from "./pages/Contact.jsx"
import Footer from "./components/Footer.jsx"
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/NotFound"
import './App.css'
import AppRoutes from "./components/AppRoutes"

import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);




  if (loading) return <div className="flex justify-center items-center min-h-screen"><p> Loading... </p></div>

  return (

    <div className="flex flex-col min-h-screen">
      <Router>
        <ScrollToTop />
        <main className="flex-grow">
        <AppRoutes />
        </main>
      </Router>
    </div>
  )
}

export default App
