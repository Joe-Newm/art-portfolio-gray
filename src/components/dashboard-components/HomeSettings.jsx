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

export default function HomeSettings() { 
  // home page info
  const [homeImage, setHomeImage] = useState(null);
  const [homePreview, setHomePreview] = useState(null);



// set home page image and display after upload
const homeHandleFileChange = (e) => {
  const file = e.target.files[0];
  if (file.size > 5 * 1024 * 1024) {
    alert("file is too large! Max file size is 5 mb.") 
    return
  }
  setHomeImage(file)

  if (file) {
    setHomePreview(URL.createObjectURL(file));
  }
}


  //fetch home page
  useEffect(() => {
    const homeRef = ref(db, 'home');

    onValue(homeRef, (screenshot) => {
      const homeData = screenshot.val();
      setHomePreview(homeData.imageURL);
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    })
  }, []);



  //update home page image
  const updateHomePage = async (e) => {
    e.preventDefault();

    const fileRef = storageRef(storage, `website-images/homePageImage`);

      try {
        if (homeImage != null) {
          const snapshot = await uploadBytes(fileRef, homeImage);
          const downloadURL = await getDownloadURL(snapshot.ref);

          await update(ref(db, 'home/'), {
            imageURL: downloadURL
          })
          alert("Updated the Home page Image Successfully")
        } else {
            alert("Nothing to update. Please upload a new Home Pagee Image")
        }
      } catch (error) {
        console.log("error editing home page image:", error);
      }
  }

    return (
        
          <div className="container mx-auto max-w-200 mt-10 mb-20">
          <h2 className="text-3xl border-b-2 mb-5">Home Page</h2>
          <form onSubmit={updateHomePage} className="flex flex-col">

            <div className="flex flex-col gap-6 md:flex-row mb-10">
            {homePreview && (
              <div>
              <label>Current Home Page Image</label>
              <img src={homePreview} className=" max-w-96"/>
              </div>
            )}
            <div className="flex flex-col">
            <label>Upload Home Page Image</label>
              <label htmlFor="home-upload" className="upload-button">
                <UploadFileIcon sx={{ fontSize: 40, color: "white" }} className=""/>
                <p className="text-white">Upload Image</p>
            </label>
            <input id="home-upload" type="file" className="hidden" onChange={homeHandleFileChange}/>
            </div>
            </div>

            <button type="submit" className="w-30 btn2">Update</button>
          </form>
          </div>
    )
}