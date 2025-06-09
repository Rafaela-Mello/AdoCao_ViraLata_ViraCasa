// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2OxHi-B-HQ3pr7whuQdAUVJZf37k_d-c",
  authDomain: "viralata-viracasa-11b4d.firebaseapp.com",
  projectId: "viralata-viracasa-11b4d",
  storageBucket: "viralata-viracasa-11b4d.firebasestorage.app",
  messagingSenderId: "954083893298",
  appId: "1:954083893298:web:b74b976e3dbd6746cf9c2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);







// login.js

const authEmailPassButton = document.getElementById('authEmailPassButton');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

if (authEmailPassButton) {
  authEmailPassButton.addEventListener('click', () => {
    firebase.auth()
      .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(() => {
        alert('Autenticado ' + emailInput.value);
        window.location.href = "../../../index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}