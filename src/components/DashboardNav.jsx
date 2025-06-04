import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import {useState, useEffect} from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { initFlowbite } from 'flowbite';
  import logo from '../assets/logo.svg';
import './DashboardNav.css';
import '../pages/dashboard.css';
import { signOut } from "firebase/auth";


export default function Nav() {

  // website info
  const [name, setName] = useState(null);

  //fetch contact page info
  useEffect(() => {
    const webRef = ref(db, 'website');

    onValue(webRef, (screenshot) => {
      const webData = screenshot.val();
      setName(webData.name);
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    })
  }, []);

    const signout = async () => {
      try {
        signOut(auth);
        console.log('you signed out successfully');
        navigate('/login');
      } catch (error) {
        console.log('error signing out:', error);
      }
    }

useEffect(() => {
  initFlowbite();
}, []);


  return (
    <nav className="dashboard-nav">
  <div className="w-full flex flex-wrap items-center justify-between mx-auto h-full pl-4 pr-4">

        <div >
        <Link to="/" className="text-[35px] md:text-[45px] whitespace-nowrap ">
            <img src={logo} alt="Logo" className="w-10  invert" />
        </Link>
        </div>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm !text-gray-500 rounded-lg md:hidden  focus:!outline-none focus:ring-2 focus:!ring-gray-200 bg-transparent !dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto z-50" id="navbar-default">
      <ul className="font-medium gap-4 md:gap-0 flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-transparent  dark:border-gray-700">
        <li>
          {
          auth.currentUser ?
            <Link
              to="/"
              className="btn ">
              Preview Website
            </Link>
            : null
          }
        </li>
        <li>
        <button onClick={signout} className="btn h-12"> sign out </button>
        </li>
      </ul>
    </div>
  </div>
    </nav>
  );
}
