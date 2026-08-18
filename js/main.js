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

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
});
