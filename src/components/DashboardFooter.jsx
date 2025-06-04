import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { auth, db } from "../firebaseConfig";
import {useState, useEffect} from "react";
import { ref, push, onValue, remove, update } from "firebase/database";

export default function DashboardFooter() {

  // website info
  const [name, setName] = useState(null);
  const [instaLink, setInstaLink] = useState(null);

  //fetch contact page info
  useEffect(() => {
    const webRef = ref(db, 'website');

    onValue(webRef, (screenshot) => {
      const webData = screenshot.val();
      setName(webData.name);
      setInstaLink(webData.instaLink)
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    })
  }, []);



  return (
    <footer className="fixed bottom-0 w-full bg-cyan-950 h-6 flex flex-col items-center justify-center pb-4 pt-4">
      <div className="flex gap-4">
        <p className="text-white">Created by Joseph Newman. Follow my work at <a href="https://joseph-newman.com" target="_blank" className="underline">joseph-newman.com</a></p>
      </div>
    </footer>
  )
}
