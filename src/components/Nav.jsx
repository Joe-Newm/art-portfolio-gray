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
            <Link to="/Dashboard">Dashboard</Link>
            : null
          }
        </div>
      </div>
    </nav>
  );
}
