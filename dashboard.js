import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBt68qDIjM9fBMu1FWNSHVQxgEfcDfp6fI",
    authDomain: "chat-app786.firebaseapp.com",
    projectId: "chat-app786",
    storageBucket: "chat-app786.appspot.com",
    messagingSenderId: "1095003338480",
    appId: "1:1095003338480:web:939d70ad30b9102babf435",
    measurementId: "G-4TE7NXLBPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();



window.onload = function () {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        window.location.replace('index.html')
      }
    });
  }





let data = ()=>{
  let loginName = document.querySelector('loginName');
}








  
  let signout = document.getElementById('signout');
  console.log(signout)
  signout.addEventListener("click",()=>{
    signOut(auth).then(() => {
        window.location.replace('index.html')
      }).catch((error) => {
        // An error happened.
      });
  })
