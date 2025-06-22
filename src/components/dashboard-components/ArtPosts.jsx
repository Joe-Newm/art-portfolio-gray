import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, push, onValue, remove, update, get } from "firebase/database";
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






const submitPost = async (e) => {
    e.preventDefault();
    console.log('post')

    console.log(title, desc, available)



    const fileRef = storageRef(storage, `images/${Date.now()}_${image.name}`);

    try {

      const snapshot = await uploadBytes(fileRef, image);

      const downloadURL = await getDownloadURL(snapshot.ref);

      //limit amount of posts
      const postLimit = 100;
      const snapshot2 = await get(ref(db, "posts"));

if (snapshot2.exists() && Object.keys(snapshot2.val()).length >= postLimit) {
  alert("Post limit reached. You can't add more posts.");
  return;
}

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





    return (
            <div className="flex flex-col w-full">



      <div className="flex w-full justify-center container mx-auto pl-4 pr-4">

        <div className="h-20 mb-10 ">
        <div className="flex flex-col max-w-200 mt-10  mb-20">

          <h2 className="text-3xl border-b-2 mb-5">New Art Post</h2>


          <form onSubmit={submitPost} className="flex gap-10 flex-col md:flex-row">

            <div className="relative flex flex-col">
            <label>Upload Art</label>
              <label htmlFor="file-upload" className="upload-button ">
                <UploadFileIcon sx={{ fontSize: 40, color: "white" }} className=""/>
                <p className="text-white">Upload Image</p>
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
                className="border-2 w-full h-10 p-4 bg-white mb-5 rounded-md border-gray-400"
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
              <button type="submit" className="w-30 btn2">
                Submit
              </button>
            </div>
          </form>



        </div>

        </div>
      </div > 
      </div>
    )
};