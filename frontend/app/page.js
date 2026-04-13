"use client";

import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Home() {

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User:", user.email);

      const token = await user.getIdToken();
      console.log("Token:", token);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>EDA Agent Login</h1>
      <button onClick={login}>
        Login with Google
      </button>
    </div>
  );
}