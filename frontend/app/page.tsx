"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

//import { getAuth, onAuthStateChanged } from "firebase/auth"; log out

export default function Home() {
  const [email, setEmail] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status on 
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email); //maybe a better way to store user info???
        setAuthenticated(true);
      } else {
        router.push("/login");
      }
    });

    return () => authState(); //return () => ...👉 “React, here is what to do when cleaning up”
    //Mental note for cleanup function vs effect function:
    //Effect = start something
    //Cleanup = stop that thing
  }, [router]);
  
//If you use something inside useEffect, list it as dependency like [router] to avoid warning, 
// but in this case, router is not changing, so it won't cause infinite loop. 
// If you use something that changes inside useEffect without listing it as dependency, 
// it can cause infinite loop because the effect will run again and again whenever that thing changes.
//React = state + lifecycle
//Next.js = routing + rendering model

  //Log out function
  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  //If not authenticated, redirect to login page, otherwise show the main page
  if (!authenticated) { 
    return <p>Redirecting to login page...</p>;
  }
  return (
    <div>
      <h1>EDA agent: Backbone</h1>
      {email && <p>Welcome: {email}</p>}
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
