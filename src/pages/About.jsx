import portrait from "../assets/gray-small.jpg"
import {useState, useEffect} from 'react';
import { ref, push, onValue, remove } from "firebase/database";
import { auth, db, storage } from "../firebaseConfig";


export default function About() {
    const [header, setHeader] = useState('');
    const [message, setMessage] = useState('');
    const [aboutImage, setAboutImage] = useState(null);

    //fetch about page info
    useEffect(() => {
      const aboutRef = ref(db, 'about');

      onValue(aboutRef, (snapshot) => {
        console.log(snapshot.val());
        const data = snapshot.val();
        setHeader(data.header);
        setMessage(data.message);
        setAboutImage(data.imageURL);
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      }); 
  
    }, []);


  return (
    <div className="container mx-auto mt-10 max-w-200 pl-4 pr-4">
      <div className="justify-center w-auto">
        <h1 className=" border-b-2  mt-20 mb-10"> About </h1>
      </div>
      <div className="flex flex-col mb-24 gap-6 md:flex-row">
        <img src={aboutImage} alt="portrait of Gray Risinger" className="w-60"></img>
        
      <div>
        <h2 className="mb-6">{header}</h2>
        <p>{message}</p>
      </div>

      </div>
    </div>
  );
}
