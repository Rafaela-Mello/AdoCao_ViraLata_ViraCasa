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

  const div = document.createElement('div');
  div.className = 'card-animal';

  const h2 = document.createElement('h2');
  h2.textContent = nome;

  const pIdade = document.createElement('p');
  pIdade.innerHTML = `<span style="color: #8b0000; font-weight: bold;">Idade:</span> ${idadeTexto}`;

  const pSexo = document.createElement('p');
  pSexo.innerHTML = `<span style="color: #8b0000; font-weight: bold;">Sexo:</span> ${sexo === 'macho' ? 'Macho' : 'Fêmea'}`;

  const pPorte = document.createElement('p');
  pPorte.innerHTML = `<span style="color: #8b0000; font-weight: bold;">Porte:</span> ${porte.charAt(0).toUpperCase() + porte.slice(1)}`;

  const btnExcluir = document.createElement('button');
  btnExcluir.className = 'excluir-card-animal';
  btnExcluir.textContent = 'Excluir';

  btnExcluir.addEventListener('click', (event) => {
    event.stopPropagation();
    const index = animais.indexOf(animal);
    if (index !== -1) {
      animais.splice(index, 1);
    }
    if (main.children.length === 0) {
      const placeholder = document.getElementById('placeholder');
      if (placeholder) {
        placeholder.style.display = 'block';
      }
    }
    renderizarCards(animais);
  });

  div.appendChild(btnExcluir);
  div.appendChild(h2);
  div.appendChild(pIdade);
  div.appendChild(pSexo);
  div.appendChild(pPorte);

  if (imagem) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imagem);
    img.alt = `Imagem de ${nome}`;
    div.appendChild(img);
  }


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
    imagem: imagem ? URL.createObjectURL(imagem) : '',
  };

  animais.push(animal);
  renderizarCards(animais);

  form.reset();
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});













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

      // Remove o animal do array principal comparando pelo nome
      const index = animais.findIndex(a => a.nome === animal.nome);
      if (index !== -1) {
        animais.splice(index, 1);
      }

      filtrarAnimais();
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

