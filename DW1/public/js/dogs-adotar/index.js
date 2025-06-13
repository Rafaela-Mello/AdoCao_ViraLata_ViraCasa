const toggleBtn = document.getElementById('toggleForm');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const form = document.getElementById('formAnimal');
const main = document.getElementById('conteudoAnimais');

toggleBtn.addEventListener('click', () => {
  modal.style.display = 'flex'; // mostra o modal
  document.body.classList.add('modal-open'); // bloqueia scroll body
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';  // esconde o modal
  document.body.classList.remove('modal-open'); // libera scroll body
  form.reset(); // limpa todos os campos do formulário, incluindo os radios
});

// Fecha modal se clicar fora do card
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // libera scroll body
    form.reset(); // limpa todos os campos do formulário
  }
});




const animais = [];




















const db = firebase.database();



form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Captura os valores aqui dentro, no momento do submit:
  const nome = document.getElementById('nome').value;

  const idadeSelect = document.getElementById('idadeCadastro');
  const idadeTexto = idadeSelect.selectedOptions[0].text; // acessa o texto visível da opção selecionada
  const idadeValor = idadeSelect.value; // o valor para comparar no filtro

  const sexo = form.querySelector('input[name="sexo"]:checked')?.value || '';
  const porte = document.getElementById('tipo-porte').value;
  const raca = document.getElementById('raca').value;
  const cor = document.getElementById('cor').value;
  const temperamento = document.getElementById('temperamento').value;
  const vacinado = form.querySelector('input[name="vacinado"]:checked')?.value || '';
  const vermifugado = form.querySelector('input[name="vermifugado"]:checked')?.value || '';
  const castrado = form.querySelector('input[name="castrado"]:checked')?.value || '';
  const estadoSaude = document.getElementById('estadoSaude').value;
  const historia = document.getElementById('historia').value;
  const imagem = document.getElementById('imagem').files[0];



  const animal = {
    nome,
    idadeValor,
    idadeTexto,
    sexo: sexo === 'macho' ? 'Macho' : 'Fêmea',
    porte: porte.charAt(0).toUpperCase() + porte.slice(1),
    raca,
    cor,
    temperamento,
    vacinado: vacinado === 'sim' ? 'Sim' : 'Não',
    vermifugado: vermifugado === 'sim' ? 'Sim' : 'Não',
    castrado: castrado === 'sim' ? 'Sim' : 'Não',
    estadoSaude,
    historia,
    imagem: '',  // Por enquanto vazio, vamos tratar imagem depois
  };


  const storageRef = firebase.storage().ref();

  if (imagem) {
    const uploadTask = storageRef.child('animais/' + imagem.name).put(imagem);

    uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
      .then(downloadURL => {
        animal.imagem = downloadURL;

        // Salva no Firestore com o URL da imagem
        const novoAnimalRef = db.ref('animais').push();
        return novoAnimalRef.set(animal).then(() => {
          animal.id = novoAnimalRef.key; // salva o id gerado no objeto local
        });
      })
      .then(() => {
        console.log('Animal com imagem salvo no Firestore');
        animais.push(animal);
        renderizarCards(animais);
        form.reset();
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      })
      .catch((error) => {
        console.error('Erro ao salvar animal com imagem:', error);
      });
  } else {
    // Sem imagem, salva direto
      const novoAnimalRef = db.ref('animais').push();
      novoAnimalRef.set(animal).then(() => {
        animal.id = novoAnimalRef.key;
        console.log('Animal salvo no Firestore com sucesso!');
        animais.push(animal);
        renderizarCards(animais);
        form.reset();
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      })
      .catch((error) => {
        console.error('Erro ao salvar no Firestore:', error);
      });
  }
});












document.addEventListener('DOMContentLoaded', () => {
  // 1. Carrega dados do JSON e coloca no array animais
  fetch('dogs.json')
    .then(response => response.json())
    .then(data => {
      animais.length = 0;
      data.forEach(item => {
        animais.push({
          ...item,
          idadeValor: item.idadeCadastro,  // valor para filtro (string)
          idadeTexto: item.idadeCadastro   // texto para exibição (mesmo valor)
        });
      });
      renderizarCards(animais); // renderiza os cards do JSON
      // 2. Depois carrega dados do Firebase e adiciona ao array
      carregarAnimaisDoFirebase();
    })
    .catch(error => {
      console.error('Erro ao carregar o JSON:', error);
      // mesmo que JSON falhe, tenta carregar do Firebase
      carregarAnimaisDoFirebase();
    });
});

// Função separada para carregar do Firebase e juntar ao array
function carregarAnimaisDoFirebase() {
  db.ref('animais').once('value')
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const animalData = childSnapshot.val();
        animalData.id = childSnapshot.key;
        // Evita duplicar se o mesmo id já existir (caso haja dados iguais)
        if (!animais.some(a => a.id === animalData.id)) {
          animais.push(animalData);
        }
      });
      renderizarCards(animais); // atualiza com dados combinados
    })
    .catch(error => {
      console.error('Erro ao carregar animais do Firebase:', error);
    });
}

















function renderizarCards(animaisFiltrados) {
  main.innerHTML = ''; // limpa os cards

  const placeholder = document.getElementById('placeholder');
  if (animaisFiltrados.length === 0) {
    if (placeholder) placeholder.style.display = 'block';
    return;
  } else {
    if (placeholder) placeholder.style.display = 'none';
  }

  animaisFiltrados.forEach(animal => {
    const div = document.createElement('div');
    div.className = 'card-animal';

    const h2 = document.createElement('h2');
    h2.textContent = animal.nome;

    const pIdade = document.createElement('p');
    pIdade.innerHTML = `<span style="color: #8b0000; font-weight: bold;">Idade:</span> ${animal.idadeTexto}`;

    const pSexo = document.createElement('p');
    pSexo.innerHTML = `<span style="color: #8b0000; font-weight: bold;">Sexo:</span> ${animal.sexo}`;

    const pPorte = document.createElement('p');
    pPorte.innerHTML = `<span style="color: #8b0000; font-weight: bold;">Porte:</span> ${animal.porte}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'excluir-card-animal';
    btnExcluir.textContent = 'Excluir';

    btnExcluir.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = animais.findIndex(a => a.id === animal.id);
      if (index !== -1) {
        // Remove no Firestore
        db.ref('animais/' + animais[index].id).remove()
          .then(() => {
            animais.splice(index, 1);
            filtrarAnimais();
          })
          .catch(error => {
            console.error('Erro ao excluir animal:', error);
          });
      }
    });

    div.appendChild(btnExcluir);
    div.appendChild(h2);
    div.appendChild(pIdade);
    div.appendChild(pSexo);
    div.appendChild(pPorte);

    if (animal.imagem) {
      const img = document.createElement('img');
      img.src = animal.imagem;
      img.alt = `Imagem de ${animal.nome}`;
      div.appendChild(img);
    }

    div.addEventListener('click', () => {
      exibirDetalhes(animal);
    });

    main.appendChild(div);
  });
}









  // CARD DETALHES DE CADA CACHORRO
  const modalDetalhes = document.getElementById('modalDetalhes');
  const closeDetalhes = document.getElementById('closeDetalhes');

  const detalheNome = document.getElementById('detalheNome');
  const detalheIdade = document.getElementById('detalheIdade');
  const detalheSexo = document.getElementById('detalheSexo');
  const detalhePorte = document.getElementById('detalhePorte');
  const detalheRaca = document.getElementById('detalheRaca');
  const detalheCor = document.getElementById('detalheCor');
  const detalheTemperamento = document.getElementById('detalheTemperamento');
  const detalheVacinado = document.getElementById('detalheVacinado');
  const detalheVermifugado = document.getElementById('detalheVermifugado');
  const detalheCastrado = document.getElementById('detalheCastrado');
  const detalheSaude = document.getElementById('detalheEstadoSaude');
  const detalheHistoria = document.getElementById('detalheHistoria');
  const detalheImagem = document.getElementById('detalheImagem');

function exibirDetalhes(animal) {
  detalheNome.textContent = animal.nome;
  detalheIdade.textContent = animal.idadeTexto;
  detalheSexo.textContent = animal.sexo;
  detalhePorte.textContent = animal.porte;
  detalheRaca.textContent = animal.raca;
  detalheCor.textContent = animal.cor;
  detalheTemperamento.textContent = animal.temperamento;
  detalheVacinado.textContent = animal.vacinado;
  detalheVermifugado.textContent = animal.vermifugado;
  detalheCastrado.textContent = animal.castrado;
  detalheSaude.textContent = animal.estadoSaude;
  detalheHistoria.textContent = animal.historia;
  detalheImagem.src = animal.imagem;
  detalheImagem.alt = `Imagem de ${animal.nome}`;

  modalDetalhes.style.display = 'flex';
  document.body.classList.add('modal-open');
}

closeDetalhes.addEventListener('click', () => {
  modalDetalhes.style.display = 'none';
  document.body.classList.remove('modal-open');
});

modalDetalhes.addEventListener('click', (e) => {
  if (e.target === modalDetalhes) {
    modalDetalhes.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});














// FILTROS PARA ACHAR O CACHORRO
const selectSexo = document.getElementById('sexo');
const selectIdade = document.getElementById('idadeFiltro');
const selectPorte = document.getElementById('tamanho');

function filtrarAnimais() {
  const sexo = selectSexo.value;
  const idade = selectIdade.value;
  const porte = selectPorte.value;

  const resultado = animais.filter(animal => {
    const condSexo = sexo === 'todos' || animal.sexo.toLowerCase() === (sexo === 'macho' ? 'macho' : 'fêmea');
    const condPorte = porte === 'todos' || animal.porte.toLowerCase() === porte;
    const condIdade = idade === 'todos' || animal.idadeValor === idade;
    return condSexo && condPorte && condIdade;
  });

  renderizarCards(resultado);
}

selectSexo.addEventListener('change', filtrarAnimais);
selectIdade.addEventListener('change', filtrarAnimais);
selectPorte.addEventListener('change', filtrarAnimais);

document.querySelector('.button-reset-filters').addEventListener('click', () => {
  selectSexo.value = 'todos';
  selectIdade.value = 'todos';
  selectPorte.value = 'todos';
  renderizarCards(animais);
});























// mostra o botao de adicionar animal de tiver o email = admin@admin.com
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























// Aguarda o Firebase estar inicializado e usa onAuthStateChanged
let userLogado = false; // flag para saber se usuário está logado

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userLogado = true;
      document.getElementById('aviso-login').style.display = 'none';
    } else {
      userLogado = false;
      document.getElementById('aviso-login').style.display = 'block';
    }
  });

  document.getElementById('link-adocao').addEventListener('click', function(event) {
    event.preventDefault(); // impede o comportamento padrão do link
    
    if (userLogado) {
      // Se logado, abre o formulário do Google Forms em nova aba
      window.open('https://forms.gle/yxBGPHt9bemZxmpn8', '_blank');
    } else {
      // Se não logado, redireciona para a página de login
      window.location.href = '../html/sign-in/login/index.html';
    }
  });