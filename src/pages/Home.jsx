import headerImage from "../assets/gray.jpg";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [homeImage, setHomeImage] = useState(null);



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


  useEffect(() => {
    const homeRef = ref(db, 'home');

    onValue(homeRef, (screenshot) => {
      const homeData = screenshot.val();
      setHomeImage(homeData.imageURL);
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    })
    
  }, []);

  return (
    <>
      <img src={homeImage} className="headerImage" loading="lazy"/>
      <div className="container mx-auto mt-10 pl-4 pr-4">
        <h1 className="mb-10 text-center border-b-2"> Work </h1>
        <div className="mosaic-container columns-1 sm:columns-2 md:columns-3 gap-4 mb-10">
          {posts.map((post, id) => (
            <Link
              to="/MoreInfo"
              state={{ post }}
              key={id}>
              <img src={post.imageURL} alt="painting" className="mosaic-item mb-4" />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
