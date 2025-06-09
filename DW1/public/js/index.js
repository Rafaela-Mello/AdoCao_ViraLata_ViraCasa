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
        if (loggedIn) loggedIn.style.display = 'flex';
        if (loggedOut) loggedOut.style.display = 'none';
        if (welcomeMessage) {
          const nome = user.email || "Usuário";
          welcomeMessage.textContent = `Bem-vindo(a), ${nome}!`;
        }
      } else {
        if (loggedIn) loggedIn.style.display = 'none';
        if (loggedOut) loggedOut.style.display = 'flex';
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


















