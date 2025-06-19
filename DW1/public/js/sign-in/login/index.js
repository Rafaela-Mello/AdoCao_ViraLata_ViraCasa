import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2OxHi-B-HQ3pr7whuQdAUVJZf37k_d-c",
  authDomain: "viralata-viracasa-11b4d.firebaseapp.com",
  projectId: "viralata-viracasa-11b4d",
  storageBucket: "viralata-viracasa-11b4d.firebasestorage.app",
  messagingSenderId: "954083893298",
  appId: "1:954083893298:web:b74b976e3dbd6746cf9c2b"
};

const app = initializeApp(firebaseConfig);

const authEmailPassButton = document.getElementById('authEmailPassButton');
const authGoogleButton = document.getElementById('authGoogleButton');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// Autenticar com E-mail e Senha
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

// Autenticar com Google
authGoogleButton.addEventListener('click', function () {
    // Providers
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
     .auth()
     .signInWithPopup(provider)
     .then(function (result) {
            alert('Autenticado ' + emailInput.value);
            window.location.href = "../../../index.html";
        }).catch(function (error) {
            console.log(error);
            alert('Falha na autenticação');
        });
});