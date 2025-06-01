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

  // home page info
  const [homeImage, setHomeImage] = useState(null);
  const [homePreview, setHomePreview] = useState(null);



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

  //fetch home page
  useEffect(() => {
    const homeRef = ref(db, 'home');

    onValue(homeRef, (screenshot) => {
      const homeData = screenshot.val();
      setHomePreview(homeData.imageURL);
      setHomeImage(homeData.imageURL);
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    })
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

  //update home page image
  const updateHomePage = async (e) => {
    e.preventDefault();

    const fileRef = storageRef(storage, `website-images/homePageImage`);

      try {
          const snapshot = await uploadBytes(fileRef, homeImage);
          const downloadURL = await getDownloadURL(snapshot.ref);

          await update(ref(db, 'home/'), {
            imageURL: downloadURL
          })
          alert("Updated the Home page Image Successfully")
      } catch (error) {
        console.log("error editing home page image:", error);
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
              <label htmlFor="about-upload" className="cursor-pointer inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 w-42 h-42 border-2 text-center">
                <UploadFileIcon sx={{ fontSize: 80, color: "white" }} className="mt-6"/>
            </label>
            <input id="about-upload" type="file" className="hidden" onChange={aboutHandleFileChange}/>
            </div>
            </div>

            <label>Heading</label>
            <input id="header" name="header" className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md" value={header} onChange={(e) => setHeader(e.target.value)}></input>

            <label>Message</label>
            <textarea className="border-2 w-full h-60 p-4 bg-white mb-5 rounded-md resize-none" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

            <button type="submit" className="w-30">Update</button>
          </form>


          {/* Home Page Update */}
          <h2 className="text-3xl border-b-2 mb-5 mt-20">Home Page</h2>
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
              <label htmlFor="home-upload" className="cursor-pointer inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 w-42 h-42 border-2 text-center">
                <UploadFileIcon sx={{ fontSize: 80, color: "white" }} className="mt-6"/>
            </label>
            <input id="home-upload" type="file" className="hidden" onChange={homeHandleFileChange}/>
            </div>
            </div>

            <button type="submit" className="w-30">Update</button>
          </form>
      </div>
      
    )
};