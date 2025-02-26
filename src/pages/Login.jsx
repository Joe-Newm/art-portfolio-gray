import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(""); // State to store login errors



  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in 
        const user = userCredential.user;
        console.log("user logged in:", user);
        navigate("/Dashboard")
      })
      .catch((error) => {
        setError("Invalid login credentials")
        console.log(error.code, error.message);
      })
  }


  return (
    <main>
      <section>
        <form className="container mx-auto flex flex-col justify-center items-center min-h-screen gap-5" onSubmit={onLogin}>
          <div className="flex flex-col">
            <label htmlFor="email-address">
              Email Address
            </label>
            <input
              id="email-address"
              className="border-2 w-100 h-10 pl-2 bg-white"
              name="email"
              type="email"
              required
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="border-2 w-100 h-10 pl-2 bg-white"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
