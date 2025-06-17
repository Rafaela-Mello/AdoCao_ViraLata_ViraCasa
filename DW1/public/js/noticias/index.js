

const auth = firebase.auth();
const db = firebase.database();


let noticias = []; // array que vai juntar JSON + Firebase
let usuarioAdmin = false;



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





const noticiasRef = db.ref('noticias');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;

  const novaNoticia = { titulo, data, descricao };

  await noticiasRef.push(novaNoticia); // compat usa assim

  form.reset();
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});







const main = document.getElementById('conteudoNoticias');
const placeholder = document.getElementById('placeholderNoticias');

// Função para renderizar notícias na tela
function renderizarCards(noticiasArray) {
  main.innerHTML = ''; // limpa
  if (noticiasArray.length === 0) {
    placeholder.style.display = 'block';
    return;
  }
  placeholder.style.display = 'none';

  noticiasArray.forEach(noticia => {
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
    pDesc.innerText = noticia.descricao;

    // para excluir tando do json (momentaneo) se clicar no botão quanto do firebase
    if (usuarioAdmin) {
      const btnExcluir = document.createElement('button');
      btnExcluir.className = 'excluir-noticia';
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', (event) => {
        event.stopPropagation(); // evita cliques indesejados no card

        const index = noticias.findIndex(n => n.id === noticia.id);
        if (index !== -1) {
          // Remove no Firebase
          db.ref('noticias/' + noticias[index].id).remove()
            .then(() => {
              noticias.splice(index, 1); // remove do array local
              renderizarCards(noticias); // re-renderiza os cards
            })
            .catch(error => {
              console.error('Erro ao excluir notícia:', error);
            });
        }
      });

      div.appendChild(btnExcluir);
    }


    div.appendChild(h2);
    div.appendChild(pData);
    div.appendChild(pDesc);

    if (noticia.imagem) {
      const img = document.createElement('img');
      img.src = noticia.imagem;
      img.alt = `Imagem da notícia ${noticia.titulo}`;
      img.className = 'imagem-noticia'; // adicione uma classe se quiser estilizar
      div.appendChild(img);
    }

    main.appendChild(div);
  });
}




// Função para carregar notícias do Firebase
function carregarNoticiasDoFirebase() {
  noticiasRef.once('value')
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const noticia = childSnapshot.val();
        noticia.id = childSnapshot.key;
        if (!noticias.some(n => n.id === noticia.id)) {
          noticias.push(noticia);
        }
      });
      renderizarCards(noticias);
    })
    .catch(error => {
      console.error('Erro ao carregar notícias:', error);
      renderizarCards(noticias);
    });
}


// Ao carregar o DOM, buscar notícias do JSON e depois do Firebase
document.addEventListener('DOMContentLoaded', () => {
  fetch('noticias.json')
    .then(response => response.json())
    .then(data => {
      console.log('Notícias do JSON:', data);

      noticias = data; // já é array, atribui direto
      renderizarCards(noticias);
      carregarNoticiasDoFirebase();
    })
    .catch(error => {
      console.error('Erro ao carregar JSON:', error);
      carregarNoticiasDoFirebase();
    });
});









// mostra o botao de adicionar noticia de tiver o email = admin@admin.com


document.addEventListener("DOMContentLoaded", () => {
  const botaoAdicionar = document.getElementById("toggleForm");

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (user.email === "admin@admin.com") {
        botaoAdicionar.style.display = "inline-block";
        usuarioAdmin = true;
      } else {
        botaoAdicionar.style.display = "none";
        usuarioAdmin = false;
      }
    } else {
      botaoAdicionar.style.display = "none";
      usuarioAdmin = false;
    }
  });
});


