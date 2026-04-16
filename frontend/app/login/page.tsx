"use client";

import { auth, provider } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import './login.css';

export default function LoginPage() {

  const router = useRouter();
  const loginWithGoogle = async () => {
    var authenticatedResult = false;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      authenticatedResult = true;
      //console.log("User:", user.email);
      //console.log("Token:", token);
      //alert(`Logged in as ${user.email}`);

    } catch (error) {
      console.error("Login failed:", error);
    }

    if (authenticatedResult) {
      // Redirect to the home page after successful login
      router.push("/"); // go back to main page
    }
  };

  //Do not include html and body tags, as they are already defined in layout.tsx
  //form tags will create this error
  //ChatGPT claimed: "When you add a <form> tag, the browser changes behavior in a subtle but important way.""
  return (
    <div className="login-container">
      <h1>Login</h1>
      <label><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email"/>
      {/* How to add email link authentication */}
      <div className="button-container">
        <button className="login">Login</button>
        <p>---or---</p>
        <button className="login-With-Google" onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}