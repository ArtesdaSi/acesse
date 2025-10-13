/* ===== ARTES DA SI - MAIN JAVASCRIPT ===== */

(function() {
  'use strict';
  
  // ========== MENU MOBILE ==========
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Fechar menu ao clicar em link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // ========== HEADER SCROLL ==========
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
  });
  
  // ========== SCROLL SUAVE ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== ANIMAÇÕES DE SCROLL ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Adicionar classe para animação
  document.querySelectorAll('.category-card, .shop-card, .processo__step, .depoimento-card').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });
  
  // CSS para animações
  const style = document.createElement('style');
  style.textContent = `
    .scroll-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .scroll-animate.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // ========== VÍDEO HERO ==========
  const heroVideo = document.querySelector('.hero__video');
  
  if (heroVideo) {
    // Garantir que o vídeo toque em mobile
    heroVideo.play().catch(err => {
      console.log('Autoplay bloqueado:', err);
    });
    
    // Pausar vídeo quando não estiver visível (performance)
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroVideo.play();
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.5 });
    
    videoObserver.observe(heroVideo);
  }
  
  // ========== PREFERS REDUCED MOTION ==========
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.scroll-animate').forEach(el => {
      el.classList.add('animate');
    });
  }
  
  console.log('✨ Artes da Si - Site carregado com sucesso!');
})();

