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
const main = document.getElementById('conteudoNoticias');


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;
  const imagem = document.getElementById('imagem').files[0];

  const div = document.createElement('div');
  div.className = 'noticia';

  const h2 = document.createElement('h2');
  h2.textContent = titulo;

  const pData = document.createElement('p');
  const dataObj = new Date(data);
  const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
  const dataFormatada = dataObj.toLocaleDateString('pt-BR', opcoes);

  // Coloca "Valinhos, 17 de Outubro de 2023"
  pData.textContent = `Valinhos, ${dataFormatada}`;

  const pDesc = document.createElement('p');
  pDesc.textContent = descricao;

  // Botão de excluir
  const btnExcluir = document.createElement('button');
  btnExcluir.className = 'excluir-noticia';
  btnExcluir.textContent = 'Excluir';
  btnExcluir.addEventListener('click', () => {
    div.remove();

    // Verifica se não há mais notícias dentro do container 'main'
    if (main.children.length === 0) {
      const placeholder = document.getElementById('placeholderNoticias');
      if (placeholder) {
        placeholder.style.display = 'block'; // mostra o placeholder novamente
      }
    }
  });

  div.appendChild(btnExcluir);
  div.appendChild(h2);
  div.appendChild(pData);
  div.appendChild(pDesc);

  if (imagem) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imagem);
    img.alt = 'Imagem do evento';
    div.appendChild(img);
  }

  // Oculta o placeholder se existir
  const placeholder = document.getElementById('placeholderNoticias');
  if (placeholder) {
    placeholder.style.display = 'none';
  }

  main.appendChild(div);
  form.reset();

  modal.style.display = 'none'; // fecha modal ao enviar
  document.body.classList.remove('modal-open'); // libera scroll body
});


















// mostra o botao de adicionar noticia de tiver o email = admin@admin.com
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const botaoAdicionar = document.getElementById("toggleForm");

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (user.email === "admin@admin.com") {
        botaoAdicionar.style.display = "inline-block";
      } else {
        botaoAdicionar.style.display = "none";
      }
    } else {
      botaoAdicionar.style.display = "none";
    }
  });
});