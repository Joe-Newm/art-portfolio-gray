import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const signout = async () => {
    try {
      signOut(auth);
      console.log('you signed out successfully');
      navigate('/login');
    } catch (error) {
      console.log('error signing out:', error);
    }
  }



  //fetch images from database
  useEffect(() => {
    const postsRef = ref(db, 'posts');

    const unsubscribe = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          const postsArray = Object.values(data);
          setPosts(postsArray);
        }
      } else {
        console.log("error fetching data");
      }
    })
    return () => unsubscribe();
  }, []);



  const submitPost = async (e) => {
    e.preventDefault();
    console.log('post')

    console.log(title, desc)


    const fileRef = storageRef(storage, `images/${Date.now()}_${image.name}`);

    try {
      const snapshot = await uploadBytes(fileRef, image);

      const downloadURL = await getDownloadURL(snapshot.ref);


      await push(ref(db, 'posts'), {
        imageURL: downloadURL,
        name: title,
        description: desc
      })
      console.log('posted image successfully')

      // clear forms 
      setTitle('');
      setDesc('');
      setImage(null);
      document.getElementById('fileInput').value = '';

    } catch (error) {
      console.log('error posting image: ', error);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col container mx-auto mt-10 justify-center items-center gap-10">
        <p>Dashboard you are now logged in</p>
        <button onClick={signout}> sign out </button>
        <hr className="border-2 w-lvw mb-10" />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-10 w-200 mb-20">
          <h2 className="text-2xl border-b-2 mb-5">New Art Post</h2>
          <form onSubmit={submitPost} className="flex gap-10">
            <input type="file" className="w-60 h-60 bg-gray-600 items-center text-white" id="fileInput" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} />
            <div>
              <label htmlFor="title">Art Title</label>
              <input
                id="title"
                className="border-2 w-full h-10 pl-2 bg-white mb-5"
                name="title"
                type="text"
                value={title}
                required
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="desc">Art Description</label>
              <input
                id="desc"
                className="border-2 w-full h-10 pl-2 bg-white h-20 mb-5"
                name="desc"
                type="text"
                value={desc}
                required
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
              />
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
          <div className="border-black border-b-2 mb-5 mt-5 w-full"></div>
          <div className="container mx-auto mt-10">
            <h1 className="mb-10 text-center"> Work </h1>
            <div className="mosaic-container columns-1 sm:columns-2 md:columns-3 gap-4 mb-10">
              {posts.map((post, id) => (
                <img key={id} src={post.imageURL} alt="painting" className="mosaic-item mb-4" />
              ))}
            </div>
          </div>

        </div>
      </div >
    </div >
  )
}

