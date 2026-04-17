"use client";

import { auth, provider } from "../../lib/firebase";
import { signInWithPopup, sendSignInLinkToEmail } from "firebase/auth";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import './login.css';

export default function LoginPage() {

  const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_FIREBASE_EMAIL_LINK_SIGN_IN_URL || "http://localhost:3000", // Fallback to current origin if environment variable is not set
      handleCodeInApp: true,
    };

  const router = useRouter();

  useEffect(() => {

    // Prevent SSR issues
    if (typeof window === "undefined") return;

    // Check if the URL contains a sign-in link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        alert("No email found for sign-in. Please enter your email address.");
        return;
      }

      // Sign in the user with the email link
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear the email from local storage
          localStorage.removeItem("emailForSignIn");
          // Redirect to the home page after successful login
          router.push("/"); // go back to main page
        })
        .catch((error) => {
          console.error("Error signing in with email link:", error);
          alert("Failed to sign in with email link. Please try again.");
        });
    }
  }, [router]);

  async function login() {
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement | null; //
    if (!emailInput) {
      alert("Email input not found.");
      return;
    }
    
    const email = emailInput.value;
    if (email.trim() === "" || !email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      alert("Check your email for the login link! Check your spam folder if you don't see it.");
    } catch (error: any) {
      console.error("Firebase error:", error);
      alert(error.message);
    }
  };

  const loginWithGoogle = async () => {
    var authenticatedResult = false;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      authenticatedResult = true;

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
        <button className="login" onClick={login}>Sign in with email link</button>
        <p>---or---</p>
        <button className="login-With-Google" onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <p>Note: There may be an error with sign-in email link authentication since it may exceed daily quota.</p>
    </div>
  );
}