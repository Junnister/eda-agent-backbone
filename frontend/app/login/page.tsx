"use client";

import { auth, provider } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const token = await user.getIdToken();

      console.log("User:", user.email);
      console.log("Token:", token);

      alert(`Logged in as ${user.email}`);

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  //Do not include html and body tags, as they are already defined in layout.tsx
  return (
    <form style={{padding: 40,
                  border: '5px solid black',
                  borderRadius: 20,
                  width: 400,
                  height: 600,
                  margin: '50px auto',
                  backgroundColor: '#f0f0f0' }}>
      <b><h1 style= {{
                   textAlign: 'center', 
                   fontSize: 36,
                    }}>Login</h1></b>
      <div>
      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required style={{display: 'block'}}/>
      {/* Add a login button  */}
      <button onClick={loginWithGoogle} style={{marginTop: 20,
                   padding: 10,
                   border: '5px solid black',
                  borderRadius: 20,
                  width: 200,
                  height: 50,}}>
        Sign in with Google
      </button>
      </div>
    </form>  
  );
}