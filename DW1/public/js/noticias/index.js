import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyD2OxHi-B-HQ3pr7whuQdAUVJZf37k_d-c",
  authDomain: "viralata-viracasa-11b4d.firebaseapp.com",
  projectId: "viralata-viracasa-11b4d",
  storageBucket: "viralata-viracasa-11b4d.firebasestorage.app",
  messagingSenderId: "954083893298",
  appId: "1:954083893298:web:b74b976e3dbd6746cf9c2b"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);





const toggleBtn = document.getElementById('toggleForm');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

toggleBtn.addEventListener('click', () => {
  modal.style.display = 'flex';  // mostra o modal
  document.body.classList.add('modal-open'); // bloqueia scroll body
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';  // esconde o modal
  document.body.classList.remove('modal-open'); // libera scroll body
});

// Fecha modal se clicar fora do card
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // libera scroll body
  }
});

const form = document.getElementById('formNoticia');





form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;

  const novaNoticia = {
    titulo,
    data,
    descricao
    // Se quiser salvar imagens, precisará subir no Firebase Storage
  };

  await push(ref(db, 'noticias'), novaNoticia);

  form.reset();
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});







const main = document.getElementById('conteudoNoticias');
const placeholder = document.getElementById('placeholderNoticias');

onValue(ref(db, 'noticias'), (snapshot) => {
  main.innerHTML = ''; // Limpa tudo antes de renderizar

  if (snapshot.exists()) {
    placeholder.style.display = 'none';

    snapshot.forEach(child => {
      const noticia = child.val();
      const key = child.key;

      const div = document.createElement('div');
      div.className = 'noticia';

      const h2 = document.createElement('h2');
      h2.textContent = noticia.titulo;

      const dataObj = new Date(noticia.data);
      const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
      const dataFormatada = dataObj.toLocaleDateString('pt-BR', opcoes);

      const pData = document.createElement('p');
      pData.textContent = `Valinhos, ${dataFormatada}`;

      const pDesc = document.createElement('p');
      pDesc.textContent = noticia.descricao;

      const btnExcluir = document.createElement('button');
      btnExcluir.className = 'excluir-noticia';
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', async () => {
        await remove(ref(db, `noticias/${key}`));
      });

      div.appendChild(btnExcluir);
      div.appendChild(h2);
      div.appendChild(pData);
      div.appendChild(pDesc);

      main.appendChild(div);
    });

  } else {
    placeholder.style.display = 'block';
  }
});



















// mostra o botao de adicionar noticia de tiver o email = admin@admin.com
document.addEventListener("DOMContentLoaded", () => {
  const botaoAdicionar = document.getElementById("toggleForm");

  onAuthStateChanged(auth, (user) => {
    if (user && user.email === "admin@admin.com") {
      botaoAdicionar.style.display = "inline-block";
    } else {
      botaoAdicionar.style.display = "none";
    }
  });
});
