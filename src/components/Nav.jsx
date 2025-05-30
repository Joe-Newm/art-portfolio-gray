import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Nav() {


  return (
    <nav className="align-center items-center">
      <div className="container mx-auto flex justify-between h-full">
<<<<<<< HEAD
        <div className="pt-1">
          <Link to="/" className="text-[45px] font-serif">Gray Risinger</Link>
=======
        <div>
          <Link to="/" className="text-[45px] font-serif ">Gray Risinger</Link>
>>>>>>> af10845 (add not found page)
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/" className="">Work</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
          {auth.currentUser ?
            <Link
              to="/Dashboard"
              className="btn">
              Dashboard
            </Link>
            : null
          }
        </div>
      </div>
    </nav>
  );
}
