import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import {useState, useEffect} from "react";
import { ref, push, onValue, remove, update } from "firebase/database";

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


  return (
    <nav className="align-center items-center">
      <div className="container mx-auto flex justify-between h-full items-center">
        <div className="">
          <Link to="/" className="text-[35px] md:text-[45px] font-serif whitespace-nowrap max-w-32">{name}</Link>
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
      </div>
    </nav>
  );
}
