import headerImage from "../assets/gray.jpg";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";



export default function Home() {
  const [posts, setPosts] = useState([]);



  useEffect(() => {
    const postsRef = ref(db, 'posts');

    const unsubscribe = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (Array.isArray(data)) {
          setPosts(data.reverse());
        } else {
          const postsArray = Object.values(data);
          setPosts(postsArray.reverse());
        }
      } else {
        console.log("error fetching data");
      }
    })
    return () => unsubscribe();
  }, []);

  return (
    <>
      <img src={headerImage} className="headerImage" />
      <div className="container mx-auto mt-10">
        <h1 className="mb-10 text-center"> Work </h1>
        <div className="mosaic-container columns-1 sm:columns-2 md:columns-3 gap-4 mb-10">
          {posts.map((post, id) => (
            <img key={id} src={post.imageURL} alt="painting" className="mosaic-item mb-4" />
          ))}
        </div>
      </div>
    </>
  )
}
