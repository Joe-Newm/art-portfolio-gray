import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Nav() {


  return (
    <nav className="align-center items-center">
      <div className="container mx-auto flex justify-between h-full">
        <div>
          <Link to="/" className="text-[45px]">Gray Risinger</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/">Work</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
          {auth.currentUser ?
            <Link
              to="/Dashboard"
              className="bg-white p-3 rounded-md !text-[#06373a] hover:bg-transparent hover:!text-white hover:outline hover:outline-1 hover:outline-white">
              Dashboard
            </Link>
            : null
          }
        </div>
      </div>
    </nav>
  );
}
