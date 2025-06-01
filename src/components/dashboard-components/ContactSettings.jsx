
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../../components/EditModal';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function ContactSettings() { 
  // home page info
  const [apiKey, setApiKey] = useState(null);



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



  //update contact page info
  const updateContactPage = async (e) => {
    e.preventDefault();

      try {
          await update(ref(db, 'web3form/'), {
            apiKey: apiKey
          })
          alert("Updated the Contact page Successfully")
      } catch (error) {
        console.log("error editing home page image:", error);
      }
  }

    return (
        
          <div className="container mx-auto max-w-200 mt-10 mb-20">
          <h2 className="text-3xl border-b-2 mb-5">Contact Page</h2>
          <p className="mb-10">This website uses Web3Form for email notifications. Please follow the link below and submit your email address to recieve a public api key from Web3Forms. Then paste the key in the form below to be notified by email when someone uses the contact form on the contact page.</p>
          <a  target="_blank" className="border-b text-green-700 font-bold" href="https://web3forms.com/">Web3Forms Link</a>
            <form className="mt-10" onSubmit={updateContactPage}>
                <label>Public Api Key</label>
              <input
                id="apiKey"
                className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md"
                name="apiKey"
                type="text"
                value={apiKey}
                required
                placeholder=""
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
    )
}