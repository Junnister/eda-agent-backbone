"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import './main.css';

// Get backend URL from environment variable, with a fallback to localhost for development
const webLink = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

// Async wrapper function to fetch protected data after authentication
const fetchProtectedData = async (user: any) => {
  try {
    const token = await user.getIdToken(); // Force refresh to get the latest token
    const res = await fetch(webLink + "/protected", {
      headers: {
    Authorization: `Bearer ${token}`,
    },
    
    })
    
    const data = await res.json();
    let accessEnabled = data.accessEnabled ?? false; 
    let email = data.email ?? "unknown";
    let role = data.role ?? "unknown";
    return {"accessEnabled": accessEnabled, "email": email, "role": role};
  } catch (error) {
    console.error("Error fetching protected data:", error);
    return null;
  }
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch(webLink + "/upload_csv", {
      method: "POST",
      body: formData,
    });

    //Debug this
    if (!res.ok) {
      throw new Error("File upload failed");
    }

    const data = await res.json();
    let columns = data.columns ?? [];
    let head = data.head ?? {};
    return {"columns": columns, "head": head};
  } catch (error) {
    //Debug this
    console.error("Error uploading file:", error);
    return null;
  }
  };


export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [protectedData, setProtectedData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dataHead, setDataHead] = useState<any>(null);

  //const [email, setEmail] = useState(null); cannot use this because of the warning: "Type 'null' is not assignable to type 'string'.ts(2322)"
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const openSettings = () => {
    setShowPopup(prev => !prev);
  };

  const handleFileUpload = async (file: File) => {
    const result = await uploadFile(file);
    if (result) {
      setFileName(file.name);
      setDataHead(result.head);
    }
  };

  


  // Check authentication status on 
  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName); //null warning???
        setEmail(user.email);
        setAuthenticated(true);

        //Start of async wrapper
        const fetchAuthData = async () => {
          var protectedData = await fetchProtectedData(user);
          setProtectedData(protectedData);
          if (!protectedData || !protectedData.accessEnabled) {
            alert("Access denied"); //I dont like the fact that it shows main page
            router.push("/login");
            return;
          }

          setRole(protectedData.role);
        }
        //End of async wrapper

        fetchAuthData();
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
    return <p>Redirecting...</p>;
  }

  //If authenticated but protected data is not loaded yet, show loading message
  if (authenticated && !protectedData) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      {/* start of heading */}
      <div className= "heading">
        <h1 className="h1-heading">Backbone</h1>
        <div className="settings" onClick={openSettings}>
          <img src="/settings.svg" alt="Settings" />
          {showPopup && (
            <div className="settings-popup">
              <p>{name}</p>
              <p>{email}</p>
              <button className="logout" onClick={logout}>
                Log Out
              </button>
            </div>
            )}
        </div>
      </div>
      {/* end of heading*/}

      {/* start of upload section */}
      <div className="upload-content">
          <h2>Step 1: Upload data</h2>
          <label id="upload-file-label" htmlFor="upload-file">Upload file</label>
          <input type="file" id="upload-file" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}/>
      
        
        {fileName ? (
              <p id="file-upload-result">File uploaded: {fileName}</p>
          ) : (
              <p id="file-upload-result"></p>
          )}
        {dataHead ? (
              <div>
                <h3 id="data-preview-label">Data preview (first 10 rows):</h3>
                <div className="data-preview">
                <table className="data-preview-table">
                  <thead>
                    {/* Learn displaying tables in React */}
                    <tr>
                      {Object.keys(dataHead[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataHead.slice(0, 10).map((row: any, index: number) => (
                      <tr key={index}>
                        {Object.values(row).map((value: any, i: number) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
              <p></p>
          )}
        </div>
      {/* end of upload section */}
    </div>
    
  );
}
