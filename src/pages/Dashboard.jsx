import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from '../components/EditModal';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [postName, setPostName] = useState(null);
  const [postDesc, setPostDesc] = useState(null);
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

  const Popup = (postid, postName, postDesc) => {
    setPost(postid);
    setPostName(postName);
    setPostDesc(postDesc);
    setIsOpen(true);
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
        <h1>Dashboard, you are now logged in</h1>
        <button onClick={signout}> sign out </button>
        <hr className="border-2 w-lvw mb-10" />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center mt-10 w-200 mb-20">
          <h2 className="text-3xl border-b-2 mb-5">New Art Post</h2>
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
              <label htmlFor="desc">Art Description (optional)</label>
              <textarea
                id="desc"
                className="border-2 w-full h-60 pl-2 bg-white mb-5 resize-none"
                name="desc"
                type="text"
                value={desc}
                placeholder="write your description here..."
                onChange={(e) => setDesc(e.target.value)}
              />
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
          <div className="container mx-auto mt-10">
            <h2 className="text-3xl border-b-2 mb-5 mt-20 mb-10 text-center"> Work </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border-2 mb-4 p-4 rounded-md">
                  <img src={post.imageURL} alt="painting" className="mosaic-item h-60" />
                  <div className="flex gap-4">
                    <button onClick={() => onDelete(post.id, post.imageURL)} className="flex mt-4 !w-10 justify-center">< DeleteIcon /></button>
                    <button className="flex mt-4 !w-10 justify-center" onClick={() => Popup(post.id, post.name, post.description)}><EditIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {isOpen && (
              <EditModal postid={post} postName={postName} postDesc={postDesc} isOpen={isOpen} setIsOpen={setIsOpen} />
            )}

          </div>

        </div>
      </div >
    </div >
  )
}

