// voltar para o topo
const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  scrollTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };














// Função para ativar animação quando a seção entrar na viewport
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
      entry.target.classList.remove('section-hidden');
    } else {
      entry.target.classList.remove('section-visible');
      entry.target.classList.add('section-hidden');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));










// trocar imagens patas link - home
const links = document.querySelectorAll('.saiba-mais-layout-1');
links.forEach(link => {
  const img = link.querySelector('.paw-icon');

  link.addEventListener('mouseenter', () => {
    img.src = '../images/home/paw-white.png';
  });

  link.addEventListener('mouseleave', () => {
    img.src = '../images/home/paw-red.png';
  });
});







// Verificação de Auth (menssagem + sair)
document.addEventListener("DOMContentLoaded", () => {

  firebase
    .auth()
    .onAuthStateChanged((user) => {
      const loggedIn = document.getElementById('auth-logged-in');
      const loggedOut = document.getElementById('auth-logged-out');
      const welcomeMessage = document.getElementById("welcomeMessage");

      console.log("user", user)

      if (user) {
      loggedIn.style.display = 'flex';
      loggedOut.style.display = 'none';
      welcomeMessage.textContent = `Bem-vindo(a), ${user.email || "Usuário"}!`;
    } else {
      loggedIn.style.display = 'none';
      loggedOut.style.display = 'flex';
    }
  });

  const logOutButton = document.getElementById("logOutButton");
  if (logOutButton) {
    logOutButton.addEventListener('click', () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Você se deslogou');
          window.location.href = "../../index.html";
        })
        .catch((error) => console.error(error));
    });
  }
});






















// Acessibilidade
const btn = document.getElementById("acessibilidadeBtn");
const menu = document.getElementById("acessibilidadeMenu");

// Alterna o menu ao clicar no botão
btn.addEventListener("click", (event) => {
  event.stopPropagation();
  menu.classList.toggle("oculto");
});

// Abre o menu ao passar o mouse no botão principal
btn.addEventListener("mouseenter", () => {
  menu.classList.remove("oculto");
});

// Fecha o menu ao tirar o mouse do menu e do botão
const fecharSeMouseFora = (event) => {
  const isMouseInside = menu.contains(event.relatedTarget) || btn.contains(event.relatedTarget);
  if (!isMouseInside) {
    menu.classList.add("oculto");
  }
};

// Fecha o menu ao tirar o mouse do botão
btn.addEventListener("mouseleave", fecharSeMouseFora);

// Fecha o menu ao tirar o mouse do menu
menu.addEventListener("mouseleave", fecharSeMouseFora);

// Fecha o menu ao clicar fora
document.addEventListener("click", (event) => {
  const isClickInside = menu.contains(event.target) || btn.contains(event.target);
  if (!isClickInside) {
    menu.classList.add("oculto");
  }
});


function alterarFonte(tamanho) {
  document.body.style.fontSize = tamanho + "px";
  localStorage.setItem("tamanhoFonte", tamanho); // salva a preferência
}
window.alterarFonte = alterarFonte; // Torna a função global

function alternarNegrito() {
  document.body.classList.toggle("texto-negrito");
  const isNegrito = document.body.classList.contains("texto-negrito");
  localStorage.setItem("negritoAtivado", isNegrito); // salva true ou false
}
window.alternarNegrito = alternarNegrito; // Torna a função global



// Aplica as configurações salvas
const tamanhoSalvo = localStorage.getItem("tamanhoFonte");
if (tamanhoSalvo) {
  document.body.style.fontSize = tamanhoSalvo + "px";
}

const negritoSalvo = localStorage.getItem("negritoAtivado");
if (negritoSalvo === "true") {
  document.body.classList.add("texto-negrito");
}
