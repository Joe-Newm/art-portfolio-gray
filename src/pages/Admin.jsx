import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');


  const onLogin = () => {
    console.log('click')
  }


  return (
    <main>
      <section>
        <form class="container mx-auto flex flex-col justify-center items-center min-h-screen gap-5">
          <div class="flex flex-col">
            <label htmlFor="email-address">
              Email Address
            </label>
            <input
              id="email-address"
              class="border-2 w-100 h-10 pl-2 bg-white"
              name="email"
              type="email"
              required
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="flex flex-col">
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              class="border-2 w-100 h-10 pl-2 bg-white"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button onClick={onLogin}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
