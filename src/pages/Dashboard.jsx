import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
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

  return (
    <div className="container mx-auto">
      <div className="flex flex-col container mx-auto mt-10 justify-center items-center gap-10">
        <p>Dashboard you are now logged in</p>
        <button onClick={signout}> sign out </button>
        <hr className="border-2 w-lvw mb-10" />
      </div>
      <div>
        <p>hello</p>
      </div>
    </div>
  )
}

