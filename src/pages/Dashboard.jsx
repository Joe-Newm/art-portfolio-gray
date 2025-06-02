import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtPosts from "../components/dashboard-components/ArtPosts"
import AboutSettings from "../components/dashboard-components/AboutSettings"
import HomeSettings from "../components/dashboard-components/HomeSettings"
import ContactSettings from "../components/dashboard-components/ContactSettings"
import WebsiteSettings from "../components/dashboard-components/WebsiteSettings"

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

  // tab pages
  const tabComponents = {
    tab1: <ArtPosts />,
    tab2: <AboutSettings />,
    tab3: <HomeSettings />,
    tab4: <ContactSettings />,
    tab5: <WebsiteSettings />
  }


  return (
    <div className="container mx-auto pl-4 pr-4">
      <div className="flex flex-col container mx-auto mt-10 justify-center items-center ">
        <h1 className="mt-6">Dashboard </h1>
        <h2 className="text-3xl   text-center">you are now logged in</h2>
        <button onClick={signout} className="mt-10 mb-10 btn2"> sign out </button>
        <div className="h-20 bg-[#06373a] w-lvw mb-10">
          <div className="container mx-auto max-w-200 h-full flex gap-4">

            <a className={(activeTab === 'tab1' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer text-center text-sm` : `text-sm select-none w-24 h-full font-bold flex justify-center items-center text-white bg-emerald-800 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab1')}
            >Art Post Settings</a>

            <a className={(activeTab === 'tab2' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer text-center text-sm` : `text-sm select-none w-24 h-full font-bold flex justify-center items-center text-white bg-emerald-800 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab2')}
            >About Page Settings</a>

            <a className={(activeTab === 'tab3' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer text-center text-sm` : `text-sm select-none w-24 h-full font-bold flex justify-center items-center text-white bg-emerald-800 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab3')}
            >Home Page Settings</a>

            <a className={(activeTab === 'tab4' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer text-center text-sm` : `text-sm select-none w-24 h-full font-bold flex justify-center items-center text-white bg-emerald-800 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab4')}
            >Contact Page Settings</a>

            <a className={(activeTab === 'tab5' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer text-center text-sm` : `text-sm select-none w-24 h-full font-bold flex justify-center items-center text-white bg-emerald-800 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab5')}
            >Website Settings</a>

          </div>
        </div>
      </div>
      {tabComponents[activeTab]}
      </div>

  )
}

