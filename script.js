document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1200,
    once: true,
    offset: 150,
    easing: 'ease-out-cubic'
  });

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Toggle do menu móvel ao clicar no botão
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Fechar o menu móvel ao clicar em qualquer link da nav bar
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Rolagem suave para links com href começando com '#'
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Formulário de contato ajustado
const form = document.querySelector('.contato-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const button = form.querySelector('button');
    const originalText = button.innerHTML;

    // Capturar os campos do formulário
    const nome = form.querySelector('[name="nome"]').value;
    const email = form.querySelector('[name="email"]').value;
    const mensagem = form.querySelector('[name="mensagem"]').value;

    // Montar mensagem para o WhatsApp
    const telefoneDestino = '558281804464'; // Número no formato internacional
    const texto = `Olá! Tenho interesse:\n\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`;
    
    // URL ajustada para WhatsApp
    const urlWhatsapp = `https://wa.me/${telefoneDestino}?text=${encodeURIComponent(texto)}`;

    // Feedback visual
    button.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    button.style.opacity = '0.7';
    button.disabled = true;

    // Detectar se é mobile e abrir o WhatsApp de forma direta
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setTimeout(() => {
      if (isMobile) {
        // Forçar abertura direta no app em dispositivos móveis
        window.location.href = urlWhatsapp; // Substitui window.open
      } else {
        window.open(urlWhatsapp, '_blank'); // Desktop: abre em nova aba
      }
      button.innerHTML = originalText;
      button.style.opacity = '1';
      button.disabled = false;
      form.reset();
    }, 1000); // Reduzi para 1000ms para feedback mais rápido
  });
}

  // Efeito de rolagem na navegação
  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

// Efeito 3D nos cards com transição suave e sem delay
const sensitivity = 30; // Velocidade do efeito 3D (igual para todos os cards)

document.querySelectorAll('.area-card').forEach(card => {
  // Definir a transição suave uma única vez no início
  card.style.transition = 'transform 0.1s ease-out'; // Transição rápida e suave
  card.style.transform = 'translateY(-15px)'; // Estado inicial

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2; // Centro horizontal
    const centerY = rect.top + rect.height / 2; // Centro vertical
    const mouseX = e.clientX - centerX;         // Distância X do mouse
    const mouseY = e.clientY - centerY;         // Distância Y do mouse

    // Cálculo da rotação
    const rotateX = (mouseY / rect.height) * sensitivity;  // Rotação vertical
    const rotateY = (mouseX / rect.width) * -sensitivity;  // Rotação horizontal

    // Aplicar transformação com transição suave
    card.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Resetar ao sair do card com transição suave
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(-15px)';
  });

  // Garantir estado inicial ao entrar, sem "salto"
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-15px)';
  });
});
});
