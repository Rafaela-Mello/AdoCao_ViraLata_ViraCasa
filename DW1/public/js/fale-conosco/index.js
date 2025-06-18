import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2OxHi-B-HQ3pr7whuQdAUVJZf37k_d-c",
  authDomain: "viralata-viracasa-11b4d.firebaseapp.com",
  projectId: "viralata-viracasa-11b4d",
  storageBucket: "viralata-viracasa-11b4d.firebasestorage.app",
  messagingSenderId: "954083893298",
  appId: "1:954083893298:web:b74b976e3dbd6746cf9c2b"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const form = document.getElementById("contato-form");
const status = document.getElementById("status-envio");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      showStatus("Preencha todos os campos.", "red");
      return;
    }

    onAuthStateChanged(auth, (user) => {
      const userId = user ? user.uid : "anonimo";
      const mensagensRef = ref(database, `contatos/${userId}`);

      push(mensagensRef, {
        nome,
        email,
        mensagem,
        data: new Date().toISOString()
      })
        .then(() => {
          showStatus("Mensagem enviada com sucesso!", "green");
          form.reset();
        })
        .catch((error) => {
          console.error(error);
          showStatus("Erro ao enviar a mensagem.", "red");
        });
    });
  });
}

function showStatus(msg, color) {
  status.textContent = msg;
  status.style.color = color;
  status.style.opacity = "1";

  setTimeout(() => {
    status.style.opacity = "0";
    setTimeout(() => {
      status.textContent = "";
    }, 300);
  }, 1000);
}