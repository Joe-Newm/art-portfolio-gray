import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MoreInfo from "../pages/MoreInfo.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../components/NotFound.jsx";
import ProtectedRoute from "../pages/ProtectedRoute.jsx";
import DashboardNav from "./DashboardNav.jsx"
import DashboardFooter from "./DashboardFooter.jsx"

import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function AppRoutes() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><p> Loading... </p></div>;

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname == "/Dashboard" ? <DashboardNav/>:<Nav />}
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/MoreInfo" element={<MoreInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {location.pathname == "/Dashboard" ? <DashboardFooter/>:<Footer />}
    </div>
  );
}
