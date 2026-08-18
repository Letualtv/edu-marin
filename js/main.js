/* ======================
   EDU MARÍN — JS
   ====================== */

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
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
  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
}

function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const icon   = button.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      // Cerrar todos
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));

      // Abrir el pulsado si estaba cerrado
      if (!isOpen) {
        answer.classList.add('open');
        icon.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function extractFirstImageUrl(post) {
  const featured = post._embedded?.['wp:featuredmedia'];
  if (Array.isArray(featured) && featured[0]?.source_url) return featured[0].source_url;
  const match = (post.content?.rendered || '').match(/<img[^>]+src="(https:\/\/[^"?]+[^"]*?)"/i);
  return match ? match[1] : '';
}

async function fetchBlogPosts() {
  const container = document.getElementById('blog-posts');
  if (!container) return;

  const API = 'https://public-api.wordpress.com/wp/v2/sites/numero13elblog.wordpress.com/posts'
            + '?per_page=3&_embed=wp:featuredmedia';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(API, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();

    container.innerHTML = posts.map(post => {
      const date    = new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const rawExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim().slice(0, 130) + '…';
      const excerpt = escapeHTML(rawExcerpt);
      const imgRaw  = extractFirstImageUrl(post);
      const safeImg = imgRaw.startsWith('https://') ? escapeHTML(imgRaw) : '';
      const title   = escapeHTML(post.title.rendered.replace(/<[^>]+>/g, ''));
      const safeLink = post.link.startsWith('https://') ? escapeHTML(post.link) : '#';

      return `
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group">
          <a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="block">
            <div class="overflow-hidden h-48 ${safeImg ? 'bg-gray-100' : 'gradient-bg'}">
              ${safeImg
                ? `<img src="${safeImg}" alt="${title}" loading="lazy"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">`
                : '<div class="w-full h-full flex items-center justify-center"><span class="text-white text-5xl font-black opacity-25">EM</span></div>'}
            </div>
            <div class="p-6">
              <p class="text-xs text-gray-500 mb-2">${escapeHTML(date)}</p>
              <h3 class="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2">${title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed line-clamp-3">${excerpt}</p>
              <span class="inline-block mt-4 gradient-text font-semibold text-sm hover:underline">Leer más →</span>
            </div>
          </a>
        </article>`;
    }).join('');

  } catch (e) {
    clearTimeout(timeout);
    console.error('fetchBlogPosts error:', e);
    container.innerHTML = `
      <div class="col-span-3 text-center py-10">
        <p class="text-gray-500 mb-3">No se pudieron cargar los artículos en este momento.</p>
        <a href="https://numero13elblog.wordpress.com" target="_blank" rel="noopener noreferrer"
           class="text-brand-red font-semibold hover:underline">Visitar el blog directamente →</a>
      </div>`;
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      if (res.ok) {
        form.innerHTML = `
          <div class="text-center py-12">
            <div class="text-5xl mb-4">🎉</div>
            <p class="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</p>
            <p class="text-gray-500">Te respondo en menos de 24 horas.</p>
          </div>`;
      } else {
        throw new Error('Error en Netlify Forms');
      }
    } catch (e) {
      console.error('initContactForm error:', e);
      btn.textContent = 'Enviar mensaje';
      btn.disabled = false;
      alert('Error al enviar. Escríbeme directamente a info@eduardomarin.es o por WhatsApp.');
    }
  });
}

function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

function initFadeIn() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initActiveNav();
  initFadeIn();
  initFAQAccordion();
  initContactForm();
  fetchBlogPosts();
});
