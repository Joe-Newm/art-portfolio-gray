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






export default function AboutSettings() {

  // about page info
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [aboutImage, setAboutImage] = useState(null);
  const [aboutPreview, setAboutPreview] = useState(null);



// set about page image and display after upload
const aboutHandleFileChange = (e) => {
  const file = e.target.files[0];
  if (file.size > 5 * 1024 * 1024) {
    alert("file is too large! Max file size is 5 mb.") 
    return
  }
  setAboutImage(file)

  if (file) {
    setAboutPreview(URL.createObjectURL(file));
  }
}

  

  // fetch about page
  useEffect(() => {
    const aboutRef = ref(db, 'about');

    onValue(aboutRef, (screenshot) => {
      const aboutData = screenshot.val();
      setHeader(aboutData.header);
      setMessage(aboutData.message);
      setAboutPreview(aboutData.imageURL);
      setAboutImage(aboutData.imageURL);
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      }); 
  }, []);


  // update about page
  const updateAboutPage = async (e) => {
    e.preventDefault();

    const fileRef = storageRef(storage, `website-images/aboutPageImage`);

         try {
          if (aboutImage != aboutPreview) {
            const snapshot = await uploadBytes(fileRef, aboutImage);
            const downloadURL = await getDownloadURL(snapshot.ref);

           await update(ref(db, 'about/'), {
            header: header,
            message: message,
            imageURL: downloadURL
           })
          } else {
            await update(ref(db, 'about/'), {
              header: header,
              message: message
            })
          }

           alert("Updated the About Page Successfully")
   
           // clear forms
         } catch (error) {
           console.log("error editing about:", error);
         } 
  }




    return (
        
      <div className="container mx-auto max-w-200 mt-10 mb-20">
          <h2 className="text-3xl border-b-2 mb-5">About Page</h2>

          <form onSubmit={updateAboutPage} className="flex flex-col">
            <div className="flex flex-col gap-6 md:flex-row mb-10">
            {aboutPreview && (
              <div>
              <label>Current About Page Image</label>
              <img src={aboutPreview} className=" w-50"/>
              </div>
            )}
            <div className="flex flex-col">
            <label>Upload About Page Image</label>
              <label htmlFor="about-upload" className="upload-button">
                <UploadFileIcon sx={{ fontSize: 40, color: "white" }} className=""/>
                <p className="text-white">Upload Image</p>
            </label>
            <input id="about-upload" type="file" className="hidden" onChange={aboutHandleFileChange}/>
            </div>
            </div>
            <button type="submit" className="w-30 btn2">Update</button>
          </form>
      </div>
      
    )
};