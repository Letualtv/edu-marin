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

async function fetchBlogPosts() {
  const container = document.getElementById('blog-posts');
  if (!container) return;

  const API = 'https://public-api.wordpress.com/wp/v2/sites/numero13elblog.wordpress.com/posts'
            + '?per_page=3&_fields=id,title,excerpt,date,link,jetpack_featured_media_url';

  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();

    container.innerHTML = posts.map(post => {
      const date    = new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim().slice(0, 130) + '…';
      const img     = post.jetpack_featured_media_url || 'assets/img/blog-placeholder.jpg';
      const title   = post.title.rendered.replace(/<[^>]+>/g, '');

      return `
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group">
          <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="block">
            <div class="overflow-hidden h-48 bg-gray-100">
              <img src="${img}" alt="${title}" loading="lazy"
                   class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="p-6">
              <p class="text-xs text-gray-400 mb-2">${date}</p>
              <h3 class="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2">${title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">${excerpt}</p>
              <span class="inline-block mt-4 gradient-text font-semibold text-sm hover:underline">Leer más →</span>
            </div>
          </a>
        </article>`;
    }).join('');

  } catch {
    container.innerHTML = `
      <div class="col-span-3 text-center py-10">
        <p class="text-gray-500 mb-3">No se pudieron cargar los artículos en este momento.</p>
        <a href="https://numero13elblog.wordpress.com" target="_blank" rel="noopener noreferrer"
           class="text-brand-red font-semibold hover:underline">Visitar el blog directamente →</a>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initFAQAccordion();
  fetchBlogPosts();
});
