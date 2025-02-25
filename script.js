document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1200,
    once: true,
    offset: 150,
    easing: 'ease-out-cubic'
  });

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
      navLinks.classList.remove('active');
    });
  });

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

  const form = document.querySelector('.contato-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const button = form.querySelector('button');
      const originalText = button.innerHTML;

      const nome = form.querySelector('[name="nome"]').value;
      const email = form.querySelector('[name="email"]').value;
      const mensagem = form.querySelector('[name="mensagem"]').value;

      const telefoneDestino = '5582981804464'; 
      const texto = `Olá! Tenho interesse:\n\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`;
      
      const urlWhatsapp = `https://wa.me/${telefoneDestino}?text=${encodeURIComponent(texto)}`;

      button.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
      button.style.opacity = '0.7';
      button.disabled = true;

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setTimeout(() => {
        if (isMobile) {
          window.location.href = urlWhatsapp; 
        } else {
          window.open(urlWhatsapp, '_blank'); 
        }
        button.innerHTML = originalText;
        button.style.opacity = '1';
        button.disabled = false;
        form.reset();
      }, 1000); 
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
});
