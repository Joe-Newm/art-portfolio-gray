import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { auth, db } from "../firebaseConfig";
import {useState, useEffect} from "react";
import { ref, push, onValue, remove, update } from "firebase/database";

export default function Footer() {

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

  //update contact page info
  const updateWebsite = async (e) => {
    e.preventDefault();

      try {
          await update(ref(db, 'website/'), {
            name: name
          })
          alert("Updated the Website Successfully")
      } catch (error) {
        console.log("error editing home page image:", error);
      }
  }


  return (
    <footer className="bg-[#06373a] h-32 bottom-0 flex flex-col items-center justify-center pb-6 pt-4">
      <Link to="/" className="text-[45px] font-serif text-white">{name}</Link>
      <div className="flex gap-4">
      <InstagramIcon sx={{fontSize: 34 ,color: "white"}} />
      <MailOutlineIcon sx={{fontSize: 34 ,color: "white"}} />
      </div>
    </footer>
  )
}
