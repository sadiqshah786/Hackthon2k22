import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";




const firebaseConfig = {
  apiKey: "AIzaSyB6NZc1nW0csYkZ1lH2py4q0kP0bLh_bEg",
  authDomain: "smit-attendance-system.firebaseapp.com",
  projectId: "smit-attendance-system",
  storageBucket: "smit-attendance-system.appspot.com",
  messagingSenderId: "559130752013",
  appId: "1:559130752013:web:d563c4cbc5891682175144",
  measurementId: "G-6SJZLG2FEP"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


// login details 
let signInEmail = document.getElementById('signInEmail');
let signInPassword = document.getElementById('signInPassword');
let loginBtn = document.getElementById('loginBtn');
let emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let errors = document.getElementById('error');
let redirect = false;


if (loginBtn) {
    loginBtn.addEventListener("click", () => {

        signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
            .then(async (userCredential) => {
                let spinner = document.querySelector('.spinner-border');
                spinner.classList.add('spinnerShow');    
                const user = userCredential.user;
                setTimeout(()=>{
                    spinner.classList.remove("spinnerShow")
                    errors.innerHTML = "Successfully Login";
                    toastSuccess();
                },2000)
                 setTimeout(() => {
                    window.location = 'dashboard.html';
                }, 4000)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (signInEmail.value.trim() === "") {
                    toastShow();
                    errors.innerHTML = "Empty Email feild";
                }
                else if (!emailRegx.test(signInEmail.value)) {
                    toastShow();
                    errors.innerHTML = "Invalid Email";
                }
                else if (signInPassword.value.trim() === "") {
                    toastShow();
                    errors.innerHTML = "Empty Password feild";
                }
                else if (signInPassword.value.length < 6) {
                    toastShow();
                    errors.innerHTML = "Password Should be at least 6";
                }
                else {
                    signupToast();
                    errors.innerHTML = errorMessage;
                    console.log(errorMessage)
                }


            });
    })

}



let credentials = document.getElementById('credentials');
if(credentials){credentials.addEventListener("click",()=>{
    swal("Admin : admin@smit.edu.pk\n Password : imadmin");

})} 







