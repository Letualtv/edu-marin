/* ======================
   EDU MARÍN — JS
   ====================== */

function initNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('bg-gray-950', 'shadow-lg');
    } else {
      navbar.classList.remove('bg-gray-950', 'shadow-lg');
    }
  });
  navbar.classList.add('bg-transparent');
}

function initMobileMenu() {
  const btn  = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => menu.classList.add('hidden'))
  );
}

function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const icon   = button.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      // Cerrar todos
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));

      // Abrir el pulsado si estaba cerrado
      if (!isOpen) {
        answer.classList.add('open');
        icon.classList.add('open');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initFAQAccordion();
});
