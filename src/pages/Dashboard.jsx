import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtPosts from "../components/dashboard-components/ArtPosts"
import AboutSettings from "../components/dashboard-components/AboutSettings"
import HomeSettings from "../components/dashboard-components/HomeSettings"
import ContactSettings from "../components/dashboard-components/ContactSettings"
import WebsiteSettings from "../components/dashboard-components/WebsiteSettings"

//css file
import './dashboard.css';

export default function Dashboard() {
  
  const [activeTab, setActiveTab] = useState('tab1')
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


  return (
    <div className="  md:pr-0 dashboard-page flex flex-row w-lvw">
      <div className="bg-white md:w-1/5 h-100% hidden md:block border-2 border-gray-200">
          <div className=" h-full flex flex-col w-full   mt-4">

            <a className={(activeTab === 'tab1' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => setActiveTab('tab1')}
            >Art Post Settings</a>

            <a className={(activeTab === 'tab2' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => setActiveTab('tab2')}
            >About Page Settings</a>

            <a className={(activeTab === 'tab3' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => setActiveTab('tab3')}
            >Home Page Settings</a>

            <a className={(activeTab === 'tab4' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => setActiveTab('tab4')}
            >Contact Page Settings</a>

            <a className={(activeTab === 'tab5' ? `left-nav-tab-selected` : `left-nav-tab`)}
             onClick={() => setActiveTab('tab5')}
            >Website Settings</a>

          </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-4/5 ">
      <div className="bg-gray-300 w-full flex flex-col items-center">
        <h1 className="mt-6">Dashboard</h1>
        <h2 className="text-3xl text-center">you are now logged in</h2>
        <button onClick={signout} className="mt-10 mb-10 btn2"> sign out </button>
      </div>
        <div className="h-20 bg-gray-300 w-full mb-10">
          <div className="container mx-auto max-w-200 h-full flex gap-2 font-size !text-xs">

            <a className={(activeTab === 'tab1' ? `tab-selected` : `tab`)}
             onClick={() => setActiveTab('tab1')}
            >Art Post Settings</a>

            <a className={(activeTab === 'tab2' ? `tab-selected` : `tab`)}
             onClick={() => setActiveTab('tab2')}
            >About Page Settings</a>

            <a className={(activeTab === 'tab3' ? `tab-selected`: `tab`)}
             onClick={() => setActiveTab('tab3')}
            >Home Page Settings</a>

            <a className={(activeTab === 'tab4' ? `tab-selected` : `tab`)}
             onClick={() => setActiveTab('tab4')}
            >Contact Page Settings</a>

            <a className={(activeTab === 'tab5' ? `tab-selected` : `tab`)}
             onClick={() => setActiveTab('tab5')}
            >Website Settings</a>

          </div>
        </div>
        <div className="w-full pl-4 pr-4">
      {tabComponents[activeTab]}
        </div>
      </div>
      </div>

  )
}

