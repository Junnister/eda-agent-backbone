import { auth, provider } from "../../lib/firebase.js";
import { signInWithPopup } from "firebase/auth";

document.getElementById("loginButton").addEventListener("click", async () => { //learn about async/await
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const token = await user.getIdToken();

    console.log("User:", user.email);
    console.log("Token:", token);

  } catch (err) {
    console.error(err);
  }
});


// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
