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

const createUserButton = document.getElementById('createUserButton');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const confirmarSenhaInput = document.getElementById('confirmarSenha');

if (createUserButton) {
  createUserButton.addEventListener('click', () => {
    // Validação simples das senhas
    if (passwordInput.value !== confirmarSenhaInput.value) {
      alert('As senhas não coincidem!');
      return;
    }
    firebase.auth()
      .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = "../../../html/sign-in/login/index.html";
      })
      .catch((error) => {
        alert('Falha ao cadastrar: ' + error.message);
      });
  });
}