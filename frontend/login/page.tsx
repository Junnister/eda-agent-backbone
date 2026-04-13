"use client";

import { auth, provider } from "../lib/firebase";
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

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <button onClick={loginWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}