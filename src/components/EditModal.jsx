import { db } from "../firebaseConfig";
import { ref, update } from "firebase/database";
import {useState} from 'react';

export default function EditModal({ post, isOpen, setIsOpen }) {
      const [title, setTitle ] = useState(post.name);
      const [desc, setDesc ] = useState(post.description);
      const [available, setAvailable] = useState(post.availability);

  async function onSubmit(e) {
      e.preventDefault();

      try {
        await update(ref(db, 'posts/' + post.id), {
          description: desc,
          name: title,
          availability: available
        })

        // clear forms
        setTitle('');
        setDesc('');
        setIsOpen(false);
      } catch (error) {
        console.log("error editing post:", error);
      }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center w-xl h-auto">

        <form onSubmit={onSubmit} className="flex flex-col items-center">

          <label>Art Title</label>
        <input type="text" name="title" className="border-2  w-full h-10 pl-2 bg-white mb-5 rounded-md"  value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <label>Art Description</label>
        <textarea type="text" name="desc" className="border-2 w-full pl-2 bg-white mb-5 h-76 resize-none rounded-md" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>



              <label>Still Available?</label>
  <div className="flex gap-4 mb-6">
  <label>
  <input type="radio" name="stillAvailable" value={available} checked={available === true} onChange={() => setAvailable(true)} />
  Yes
</label>
<label>
  <input type="radio" name="stillAvailable" value={available} checked={available === false} onChange={() => setAvailable(false)}/>
  No
</label>
</div>


        <button type="submit" className="mt-4 px-4 py-2 text-white rounded-md w-40">Submit</button>
        </form>

        {/* close window button */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-40"
        >Close</button>
      </div>
    </div>

  )
}
