"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import './main.css';

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  //const [email, setEmail] = useState(null); cannot use this because of the warning: "Type 'null' is not assignable to type 'string'.ts(2322)"
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status on 
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName); //null warning???
        setEmail(user.email);
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

  // else if (authenticated && email !== "limjunguan06@gmail.com") {
  //   return (
  //   <div>
  //     <h1>Access Denied</h1>
  //     <p>You do not have permission to access this page.</p>
  //     <button onClick={logout}>Log Out</button>
  //   </div>
  // );
  // } 
  return (
    <div>
      <h1>Website heading</h1>
      {name && <p>User: {name}</p>}  
      {email && <p>Email: {email}</p>}
      <button onClick={logout}>Log Out</button>
      <p><b>Description:</b> This is a scaffold of my personal website. It is just the beginning.</p>
    </div>
  );
}
