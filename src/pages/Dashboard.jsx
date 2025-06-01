import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../components/EditModal';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function Dashboard() {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [postName, setPostName] = useState(null);
  const [postDesc, setPostDesc] = useState(null);
  const [preview, setPreview] = useState(null);

  const [activeTab, setActiveTab] = useState('tab1')
  const navigate = useNavigate();

  // about page info
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [aboutImage, setAboutImage] = useState(null);
  const [aboutPreview, setAboutPreview] = useState(null);

  // home page info
  const [homeImage, setHomeImage] = useState(null);
  const [homePreview, setHomePreview] = useState(null);

  const signout = async () => {
    try {
      signOut(auth);
      console.log('you signed out successfully');
      navigate('/login');
    } catch (error) {
      console.log('error signing out:', error);
    }
  }

  const Popup = (post) => {
    setPost(post);
    setIsOpen(true);
  }

  //set image post display image after upload
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file.size > 5 * 1024 * 1024) {
    alert('file is too large! Max file size is 5 mb.')
    return
  }
  setImage(file);

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
}

// set about page image and display after upload
const aboutHandleFileChange = (e) => {
  const file = e.target.files[0];
  if (file.size > 5 * 1024 * 1024) {
    alert("file is too large! Max file size is 5 mb.") 
    return
  }
  setAboutImage(e.target.files[0])

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
  setHomeImage(e.target.files[0])

  if (file) {
    setHomePreview(URL.createObjectURL(file));
  }
}

  //fetch images from database
  useEffect(() => {
    const postsRef = ref(db, 'posts');

    const unsubscribe = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedPosts = Object.keys(data).map((key) => ({
          id: key, // Firebase-generated key
          ...data[key]
        }));
        if (Array.isArray(loadedPosts)) {
          setPosts(loadedPosts.reverse());
        } else {
          const postsArray = Object.values(loadedPosts);
          setPosts(postsArray.reverse());
        }
      } else {
        console.log("error fetching data");
      }
    })
    return () => unsubscribe();
  }, []);


  // delete post 
  const onDelete = async (postid, image) => {
    console.log(image)
    if (!postid) return;

    try {
      const decodedURL = decodeURIComponent(image);
      const path = decodedURL.split('/o/')[1].split('?')[0];

      await remove(ref(db, `posts/${postid}`));
      await deleteObject(storageRef(storage, path));
      console.log(`post ${postid} has been deleted`);
    } catch (error) {
      console.log("error deleting post: ", error);
    }
  }



  const submitPost = async (e) => {
    e.preventDefault();
    console.log('post')

    console.log(title, desc, available)



    const fileRef = storageRef(storage, `images/${Date.now()}_${image.name}`);

    try {

      const snapshot = await uploadBytes(fileRef, image);

      const downloadURL = await getDownloadURL(snapshot.ref);


      await push(ref(db, 'posts'), {
        imageURL: downloadURL,
        name: title,
        description: desc,
        availability: available
      })
      console.log('posted image successfully')

      // clear forms 
      setTitle('');
      setDesc('');
      setImage(null);
      setPreview(null);
      setAvailable(true);
      //document.getElementById('fileInput').value = '';

    } catch (error) {
      console.log('error posting image: ', error);
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

           alert("updated the About Page Successfully")
   
           // clear forms
         } catch (error) {
           console.log("error editing about:", error);
         } 
  }

  //update home page image
  const updateHomePage = async (e) => {
    console.log("update");
  }


  return (
    <div className="container mx-auto pl-4 pr-4">
      <div className="flex flex-col container mx-auto mt-10 justify-center items-center ">
        <h1 className="mt-6">Dashboard </h1>
        <h2 className="text-3xl   text-center">you are now logged in</h2>
        <button onClick={signout} className="mt-10 mb-10"> sign out </button>
        <div className="h-20 bg-[#06373a] w-lvw mb-10">
          <div className="container mx-auto max-w-200 h-full flex">

            <a className={(activeTab === 'tab1' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer` : `select-none w-24 h-full font-bold flex justify-center items-center text-white border-l-2 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab1')}
            >Art Posts</a>

            <a className={(activeTab === 'tab2' ? `select-none bg-[#fff5df] border-t-2 w-24 h-full font-bold flex justify-center items-center cursor-pointer text-center` : `select-none w-24 h-full font-bold flex justify-center items-center text-white border-r-2 border-[#fff5df] text-center cursor-pointer`)}
             onClick={() => setActiveTab('tab2')}
            >Website Settings</a>

          </div>
        </div>
      </div>

      {activeTab === 'tab1' ? (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-10 w-200 mb-20">
          <h2 className="text-3xl border-b-2 mb-5">New Art Post</h2>


          <form onSubmit={submitPost} className="flex gap-10 flex-col md:flex-row">
            <div className="relative flex flex-col">
            <label>Upload Art</label>
          <label htmlFor="file-upload" className="cursor-pointer inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 w-42 h-42 border-2 text-center">
            <UploadFileIcon sx={{ fontSize: 80, color: "white" }} className="mt-6"/>
        </label>

        <input id="file-upload" type="file" className="hidden" required onChange={handleFileChange}/>

        {preview && (
          <img src={preview} className="mt-4 w-42"/>
        )}
      </div>
            <div>
              <label htmlFor="title">Art Title</label>
              <input
                id="title"
                className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md"
                name="title"
                type="text"
                value={title}
                required
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="desc">Art Description (optional)</label>
              <textarea
                id="desc"
                className="border-2 w-full h-60 p-4 bg-white mb-5 resize-none rounded-md"
                name="desc"
                type="text"
                value={desc}
                placeholder="write your description here..."
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Still Available?</label>
  <div className="flex gap-4 mb-6">
  <label>
  <input type="radio" name="stillAvailable" value="true" checked={available === true} onChange={() => setAvailable(true)} />
  Yes
</label>
<label>
  <input type="radio" name="stillAvailable" value="false" checked={available === false} onChange={() => setAvailable(false)}/>
  No
</label>
</div>
              <button type="submit" className="w-30">
                Submit
              </button>
            </div>
          </form>
          <div className="container mx-auto mt-10">
            <h2 className="text-3xl border-b-2 mb-5 mt-20 mb-10 text-center"> Work </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {posts.map((post) => (
                <div key={post.id} className="bg-white shadow-lg border-gray-200 border-1 mb-4 p-4 rounded-md">
                  <img src={post.imageURL} alt="painting" className="mosaic-item h-60 object-cover w-full" />
                  <div className="flex gap-4">
                    <button onClick={() => onDelete(post.id, post.imageURL)} className="flex mt-4 !w-10 justify-center">< DeleteIcon /></button>
                    <button className="flex mt-4 !w-10 justify-center" onClick={() => Popup(post)}><EditIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {isOpen && (
              <EditModal post={post} isOpen={isOpen} setIsOpen={setIsOpen} />
            )}

          </div>

        </div>
      </div > )
      : (
        /* ################################################################## Tab 2 ################################################################## */
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
          <form onSubmit={updateHomePage} class="flex">

            <div className="flex flex-col gap-6 md:flex-row mb-10">
            {homePreview && (
              <div>
              <label>Current Home Page Image</label>
              <img src={homePreview} className="min-w-50 max-w-150 max-h-100"/>
              </div>
            )}
            <div className="flex flex-col">
            <label>Upload Home Page Image</label>
              <label htmlFor="about-upload" className="cursor-pointer inline-block px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 w-42 h-42 border-2 text-center">
                <UploadFileIcon sx={{ fontSize: 80, color: "white" }} className="mt-6"/>
            </label>
            <input id="about-upload" type="file" className="hidden" onChange={homeHandleFileChange}/>
            </div>
            </div>
          </form>
      </div>
      )}
    </div >
  )
}

