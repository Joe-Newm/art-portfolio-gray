import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";


export default function Contact() {
  const [apiKey, setApiKey] = useState("");



  //fetch contact page info
  useEffect(() => {
    const homeRef = ref(db, 'web3form');

    onValue(homeRef, (screenshot) => {
      const contactData = screenshot.val();
      setApiKey(contactData.apiKey);
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    })
  }, []);

  return (
    <div className="container mx-auto mt-10 max-w-200 pl-4 pr-4">
      <div className="justify-center w-auto">
        <h1 className=" border-b-2  mt-20 mb-10"> Contact </h1>
        <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col">

          <input type="hidden" name="access_key" value={`${apiKey}`}></input>

          <label>Name</label>
          <input type="text" name="name" required className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md"></input>

          <label>Email</label>
          <input type="email" name="email" className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md" required></input>

          <label>Message</label>
          <textarea name="message" required className="border-2 w-full h-40 p-4 bg-white mb-5 rounded-md resize-none"></textarea>

          <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}}></input>

          <button type="submit" className="w-30 btn2">Submit</button>

        </form>



        
      </div>
    </div>
  );
}
