import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  query,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";



 const firebaseConfig = {
   apiKey: "AIzaSyApGhqkOVaXxf1uD-8KEaf6-DsPjPQIuKE",
   authDomain: "test-89681.firebaseapp.com",
   projectId: "test-89681",
   storageBucket: "test-89681.appspot.com",
   messagingSenderId: "239747243291",
   appId: "1:239747243291:web:f1c203f2386c6ce02887be",
   measurementId: "G-YHHDJT4W79"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
const db = getFirestore();

// window.onload = function () {
// }
// onAuthStateChanged(auth,(user) => {
//   if (!user) {
//     window.location = 'index.html';
//   }
// });










let rollNumberAtt = document.getElementById('rollNumberAtt');
let AttendanceBtn = document.getElementById('AttendanceBtn');
AttendanceBtn.addEventListener("click", () => {
  if (rollNumberAtt.value.trim() == "") {
    swal("Please Enter a Roll Number");
  }
  else {
    swal({
      title: `Attendance Marked`,
      icon: "success",
      button: "Okay",
    });

  }
})


// data base 




let count = 0;
let obj = {};

  let getClassValue = async () => {

    let dropdown1 = document.getElementById("timing")
    let result1 = dropdown1.options[dropdown1.selectedIndex].value;

    let dropdown2 = document.getElementById("schedule")
    let result2 = dropdown2.options[dropdown2.selectedIndex].value;

    let dropdown3 = document.getElementById("teacher")
    let result3 = dropdown3.options[dropdown3.selectedIndex].value;

    let dropdown4 = document.getElementById("section")
    let result4 = dropdown4.options[dropdown4.selectedIndex].value;

    let dropdown5 = document.getElementById("course")
    let result5 = dropdown5.options[dropdown5.selectedIndex].value;
    console.log(result5)
    // console.log(result4)

    let dropdown6 = document.getElementById("batch")
    let result6 = dropdown6.options[dropdown6.selectedIndex].value;
    // console.log(result5)

    if (result1 != 0 && result2 != 0 && result3 != 0 && result4 != 0 && result5 != 0) {
      //  && dropdown2 != "0" && dropdown3 != "0" && dropdown4 != "0" && dropdown5 != "0") {
      console.log("hi")
      const docRef = await addDoc(collection(db, "classList"), {
        timing: result1,
        schedule: result2,
        current_teacher: result3,
        section: result4,
        course: result5,
        batch: result6
      });
      swal(`Class Added Successfully`)
    }

  }

  const colRef = collection(db, "classList");
let classData = document.getElementById('classData');
console.log(classData)
  getDocs(colRef)
  .then(async(value)=>{
      await value.docs.forEach((docsValue)=>{
          console.log(docsValue.data())
          classData.innerHTML+=`<option>
             ${docsValue.data().batch}
            ${docsValue.data().timing}
             ${docsValue.data().section}
            ${docsValue.data().current_teacher}
            ${docsValue.data().schedule}
          
          </option>`
      })
  })
  

  window.getClassValue = getClassValue;


// student Data 
let addStudent = async () => {
  let studentData = document.querySelectorAll("#v-pills-tabContent input")
  // console.log(studentData)
  let courses = document.getElementById("classData")
  console.log(courses.value);

  for (let i = 0; i < studentData.length; i++) {
      console.log(studentData[i].value)
      if (studentData[i].value.trim() == "") {
          studentData[i].style.border = "1px solid red"
      }
      else {
          obj = {
              studentName: document.getElementById("studentName").value,
              fatherName: document.getElementById("fatherName").value,
              rollNum: document.getElementById("rollNum").value,
              contactNo: document.getElementById("contact").value,
              CNIC: document.getElementById("cnic").value,
              course: courses.options[courses.selectedIndex].value,
              url: ""
          }
          setTimeout(() => {
              studentData[i].style.border = "1px solid black"
          }, 2000)
          break
      }
  }

  let file = document.querySelector("#studentPic").files[0]
  console.log(file)
  let url = await uploadFiles(file);
  obj.url = url;
  console.log(obj)
  console.log(url)

  const docRef = await addDoc(collection(db, "studentData"), obj);
  swal(`Student Added Successfully`)
  console.log("Document written with ID: ", docRef.id);
  event.preventDefault()
}

const uploadFiles = (file) => {
  event.preventDefault();
  return new Promise((resolve, reject) => {
      const storage = getStorage();

      const storageRef = ref(storage, `student/${obj.CNIC}.png`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                  case "paused":
                      console.log("Upload is paused");
                      break;
                  case "running":
                      console.log("Upload is running");
                      break;
              }
          },
          (error) => {
              reject(error);
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
              });
          }
      );
  });
};
let showPreview = () => {
  const q = query(collection(db, "studentData"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
      document.getElementById("tableStudent").innerHTML = `
      <tr>
      <th>S.No</th>
      <th>Roll No</th>
      <th>Student Name</th>
      <th>Father Name</th>
      <th>Contact No</th>
      <th>CNIC No</th>
      <th>Course</th>
      <th>Delete</th>
      <th>Edit</th>
      </tr>
`
      count = 0
      querySnapshot.forEach((doc) => {
          document.getElementById("tableStudent").innerHTML += `
           <tr>
              <td>${++count}</td>
              <td>${doc.data().rollNum}</td>
              <td>${doc.data().studentName}</td>
              <td>${doc.data().fatherName}</td>
              <td>${doc.data().contactNo}</td>
              <td>${doc.data().CNIC}</td>
              <td>${doc.data().course}</td>
              <td><button onclick="deleteStudent('${doc.id}')">Delete</button></td>
              <td><button onclick="editStudent('${doc.id}','${doc.data().studentName}','${doc.data().fatherName}','${doc.data().rollNum}','${doc.data().contactNo}','{doc.data().CNIC}','${doc.data().course}')" class="btn-close" data-bs-dismiss="modal" aria-label="Close">>Edit</button></td>
          </tr>
          `
          console.log(doc.id)
      });
  });
}
showPreview()

let deleteStudent = async (document) => {
  await deleteDoc(doc(db, "studentData", document));
  console.log(document)
}

let signout = document.getElementById('signout');
// console.log(signout)
signout.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log(signOut)
    window.location.replace('index.html')
  }).catch((error) => {
    // An error happened.
  });
})

// window.editStudent = editStudent
window.addStudent = addStudent;
window.deleteStudent = deleteStudent
