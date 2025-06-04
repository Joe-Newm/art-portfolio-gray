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

export default function ArtPosts() {
const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');



  const Popup = (post) => {
    setPost(post);
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

    return (
    <div className="flex flex-col w-full">



      <div className="flex flex-col w-full justify-center container mx-auto pl-4 pr-4 max-w-200">

            <h2 className="text-3xl border-b-2 mt-10  mb-10 "> Art Work </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {posts.map((post) => (
                <div key={post.id} className="bg-white shadow-lg border-gray-200 border-1 mb-4 p-4 rounded-md">
                  <img src={post.imageURL} alt="painting" className="mosaic-item h-60 object-cover w-full" />
                  <div className="flex gap-4">
                    <button onClick={() => onDelete(post.id, post.imageURL)} className="flex mt-4   justify-center btn2">< DeleteIcon /></button>
                    <button className="flex mt-4  justify-center btn2" onClick={() => Popup(post)}><EditIcon /></button>
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

    )
};