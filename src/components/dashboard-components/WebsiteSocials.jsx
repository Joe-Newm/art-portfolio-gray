import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default function WebsiteSettings() { 

  // website info
  const [name, setName] = useState("");
  const [instaLink, setInstaLink] = useState("");


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


  //update contact page info
  const updateWebsiteName = async (e) => {
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


  const updateWebsiteInsta = async (e) => {
    e.preventDefault();

      try {
          await update(ref(db, 'website/'), {
            instaLink: instaLink
          })
          alert("Updated the Website Successfully")
      } catch (error) {
        console.log("error editing home page image:", error);
      }
  }

    return (
        
          <div className="container mx-auto max-w-200 mt-10 mb-20">
          <h2 className="text-3xl border-b-2 mb-5">Website Socials</h2>
            <p>Website social links show up in the footer as icon links.</p>
            <form className="mt-10" onSubmit={updateWebsiteInsta}>
                <label>Instagram Profile Link (Make sure to include https://)</label>
              <input
                id="name"
                className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md"
                name="name"
                type="text"
                value={instaLink}
                maxLength="40" 
                required
                placeholder=""
                onChange={(e) => setInstaLink(e.target.value)}
              />
              <button className="btn2" type="submit">Submit</button>
            </form>
          </div>
    )
}