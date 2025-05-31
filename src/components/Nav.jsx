import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Nav() {


  return (
    <nav className="align-center items-center">
      <div className="container mx-auto flex justify-between h-full items-center">
        <div className="">
          <Link to="/" className="text-[35px] md:text-[45px] font-serif whitespace-nowrap">Gray Risinger</Link>
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
