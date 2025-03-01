import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
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

  const submitPost = async (e) => {
    e.preventDefault();
    console.log('post')

    const db = getDatabase();

    try {
      await push(ref(db, 'posts'), {
        image: image,
        name: title,
        description: desc
      })
    } catch (error) {
      console.log('error: ', error);
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
            <input type="file" className="w-60 h-60 bg-gray-600 items-center text-white" id="fileInput" accept="image/*" required />
            <div>
              <label htmlFor="title">Art Title</label>
              <input
                id="title"
                className="border-2 w-full h-10 pl-2 bg-white mb-5"
                name="title"
                type="text"
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
                required
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
              />
              <button type="submit">
                Submit
              </button>
            </div>
          </form>

        </div>
      </div >
    </div >
  )
}

