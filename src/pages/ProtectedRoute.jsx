import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Import Firebase auth

export default function ProtectedRoute({ children }) {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}
