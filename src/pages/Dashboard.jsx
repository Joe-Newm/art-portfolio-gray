import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtPosts from "../components/dashboard-components/ArtPosts"
import AboutSettings from "../components/dashboard-components/AboutSettings"
import HomeSettings from "../components/dashboard-components/HomeSettings"
import ContactSettings from "../components/dashboard-components/ContactSettings"
import WebsiteSettings from "../components/dashboard-components/WebsiteSettings";
import Tabs from "../components/Tabs";
import ArtWork from "../components/dashboard-components/ArtWork"
import AboutContent from "../components/dashboard-components/AboutContent"
import WebsiteSocials from "../components/dashboard-components/WebsiteSocials"

//css file
import './dashboard.css';

export default function Dashboard() {
  
  const [activeTab, setActiveTab] = useState('tab1')
  const [activeSection, setActiveSection] = useState('art')
  const navigate = useNavigate();


  const signout = async () => {
    try {
      signOut(auth);
      console.log('you signed out successfully');
      navigate('/login');
    } catch (error) {
      console.log('error signing out:', error);
    }
  }

  //change styling for just the dashboard page
  useEffect(() => {
    // Set body background when Dashboard mounts
    document.body.style.backgroundColor = '#F1F5F6'; // Tailwind's bg-gray-800
    //document.body.style.color = 'white';

    // Cleanup when leaving Dashboard
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  // tab pages
  const tabComponents = {
    tab1: <ArtPosts />,
    tab2: <AboutSettings />,
    tab3: <HomeSettings />,
    tab4: <ContactSettings />,
    tab5: <WebsiteSettings />
  }

  //tabs
const sectionTabs = {
  art: [
    { id: 'tab1', label: 'New Post', page: <ArtPosts />,},
    { id: 'tab2', label: 'Artwork', page: <ArtWork />},
  ],
  about: [
    { id: 'tab1', label: 'About Image', page: <AboutSettings /> },
    { id: 'tab2', label: 'Content', page: <AboutContent />},
  ],
  home: [
    { id: 'tab1', label: 'Home Image', page: <HomeSettings />},
  ],
  contact: [
    { id: 'tab1', label: 'Web3Forms', page: <ContactSettings />},
  ],
  website: [
    { id: 'tab1', label: 'Name', page: <WebsiteSettings /> },
    { id: 'tab2', label: 'Socials', page: <WebsiteSocials /> }
  ]
};





  return (
    <div className="  md:pr-0 dashboard-page flex flex-row w-full h-screen">
      <div className="bg-white md:w-1/5 h-full hidden md:block border-2 border-gray-200">
          <div className=" h-full flex flex-col   mt-4">

            <a className={(activeSection === 'art' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => {
              setActiveSection('art');
              setActiveTab('tab1');
             }}
            >Art Posts</a>

            <a className={(activeSection === 'about' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => {
              setActiveSection('about');
              setActiveTab('tab1');
             }}
            >About Page</a>

            <a className={(activeSection === 'home' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => {
              setActiveSection('home');
              setActiveTab('tab1');
             }}
            >Home Page</a>

            <a className={(activeSection === 'contact' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => {
              setActiveSection('contact');
              setActiveTab('tab1');
             }}
            >Contact Page</a>

            <a className={(activeSection === 'website' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => {
              setActiveSection('website');
              setActiveTab('tab1');
             }}
            >Website Settings</a>

          </div>
      </div>
      <div className="flex flex-col overflow-hidden  w-full md:w-4/5 h-full overflow-y-auto">
      <div className="bg-gray-300 w-full flex items-center pl-4 gap-4">
        <h1 className="mt-4 mb-4">Dashboard</h1>
      </div>
        <div className="w-full flex flex-col">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={sectionTabs[activeSection]}/>
      <div className="pl-4 pr-4">
      {sectionTabs[activeSection].find(tab => tab.id === activeTab)?.page}
      </div>
        </div>
      </div>
      </div>

  )
}

