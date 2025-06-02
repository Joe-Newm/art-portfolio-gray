import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import {useState, useEffect} from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { initFlowbite } from 'flowbite';


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


useEffect(() => {
  initFlowbite();
}, []);


  return (
    <nav className="align-center items-center">
      {/* <div className="container mx-auto flex justify-between h-full items-center">
        <div className="">
          <Link to="/" className="text-[35px] md:text-[45px] font-serif whitespace-nowrap max-w-">{name}</Link>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/" className="">Work</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
          {auth.currentUser ?
            <Link
              to="/Dashboard"
              className="btn">
              Dashboard
            </Link>
            : null
          }
        </div>
      </div> */}



  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
    {/* <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a> */}

        <div className="">
          <Link to="/" className="text-[35px] md:text-[45px] font-serif whitespace-nowrap max-w-">{name}</Link>
        </div>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm !text-gray-500 rounded-lg md:hidden hover:!bg-gray-100 focus:!outline-none focus:ring-2 focus:!ring-gray-200 dark:!text-gray-400 !dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto z-50" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-transparent  dark:border-gray-700">
        <li>
          <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Work</Link>
        </li>
        <li>
          <Link to="/About" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
        </li>
        <li>
          <Link to="/Contact" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
        </li>
        <li>
          {
          auth.currentUser ?
            <Link
              to="/Dashboard"
              className="btn">
              Dashboard
            </Link>
            : null
          }
        </li>
      </ul>
    </div>
  </div>
    </nav>
  );
}
