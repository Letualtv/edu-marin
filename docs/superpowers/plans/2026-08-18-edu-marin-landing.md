# Edu Marín Landing Page — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una landing page one-page para Eduardo Marín Arjona (Community Manager) que capture leads vía WhatsApp y formulario de contacto, con SEO/GEO completo, integración del blog de WordPress y despliegue en Netlify.

**Architecture:** Un único `index.html` con todas las secciones. Tailwind CSS via CDN con config extendida de colores. `css/style.css` para animaciones y gradientes custom. `js/main.js` para navbar scroll, menú móvil, FAQ acordeón, fetch de la API de WordPress.com, envío de formulario vía Netlify Forms y fade-in por IntersectionObserver. Schema JSON-LD en el footer. Archivos GEO (`llms.txt`, `robots.txt`, `sitemap.xml`) en la raíz. Desplegado en Netlify free tier.

**Tech Stack:** HTML5 semántico, Tailwind CSS CDN v3, JavaScript ES2020 vanilla, Netlify Forms, WordPress.com REST API v2

---

## Estructura de archivos

| Archivo | Responsabilidad |
|---------|----------------|
| `index.html` | Todo el contenido, meta tags SEO, Schema JSON-LD |
| `css/style.css` | Animaciones, gradientes, utilidades no disponibles en Tailwind CDN |
| `js/main.js` | Nav scroll, menú móvil, FAQ acordeón, blog API fetch, contacto form, fade-in |
| `netlify.toml` | Config de publicación y cabeceras HTTP de seguridad |
| `llms.txt` | GEO: instrucciones para crawlers de IA |
| `robots.txt` | Acceso crawlers SEO y IA |
| `sitemap.xml` | Mapa del sitio para indexación |
| `assets/img/` | Foto de Edu (placeholder), og-image, favicon |

---

### Task 1: Scaffold del proyecto

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `netlify.toml`
- Create: `assets/img/.gitkeep`

- [ ] Crear estructura de directorios
  ```bash
  mkdir -p css js assets/img
  ```

- [ ] Crear `index.html`
  ```html
  <!DOCTYPE html>
  <html lang="es" class="scroll-smooth">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edu Marín · Community Manager</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'brand-red': '#E53E3E',
              'brand-red-dark': '#C53030',
              'brand-orange': '#F97316',
              'brand-dark': '#111111',
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            }
          }
        }
      }
    </script>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body class="font-sans antialiased text-gray-900">
    <p class="p-8 text-2xl font-bold text-brand-red">Scaffold OK — Tailwind + Inter cargados</p>
    <script src="js/main.js"></script>
  </body>
  </html>
  ```

- [ ] Crear `css/style.css`
  ```css
  /* ======================
     EDU MARÍN — Estilos
     ====================== */

  /* 1. Gradientes */
  /* 2. Animaciones */
  /* 3. Utilidades */
  /* 4. Componentes */
  ```

- [ ] Crear `js/main.js`
  ```javascript
  /* ======================
     EDU MARÍN — JS
     ====================== */

  document.addEventListener('DOMContentLoaded', () => {
    console.log('Edu Marín JS cargado correctamente');
  });
  ```

- [ ] Crear `netlify.toml`
  ```toml
  [build]
    publish = "."

  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Permissions-Policy = "camera=(), microphone=(), geolocation=()"

  [[headers]]
    for = "/llms.txt"
    [headers.values]
      Content-Type = "text/plain; charset=utf-8"
      Cache-Control = "public, max-age=86400"
  ```

- [ ] Crear `assets/img/.gitkeep` (archivo vacío para que git rastree la carpeta)
  ```bash
  echo.> assets/img/.gitkeep
  ```

- [ ] Abrir `http://localhost/edu-marin/index.html` en el navegador. Verificar: texto "Scaffold OK" en rojo, sin errores en consola.

- [ ] Commit
  ```bash
  git add index.html css/style.css js/main.js netlify.toml assets/img/.gitkeep
  git commit -m "feat: scaffold inicial con Tailwind CDN, Inter y estructura de archivos"
  ```

---

### Task 2: CSS base (style.css completo)

**Files:**
- Modify: `css/style.css`

- [ ] Reemplazar el contenido de `css/style.css` con:
  ```css
  /* ======================
     EDU MARÍN — Estilos
     ====================== */

  /* ── 1. Gradientes ── */
  .gradient-text {
    background: linear-gradient(135deg, #E53E3E, #F97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-bg {
    background: linear-gradient(135deg, #E53E3E, #F97316);
  }

  .gradient-border-wrap {
    background: linear-gradient(135deg, #E53E3E, #F97316);
    padding: 3px;
    border-radius: 9999px;
    display: inline-block;
  }

  /* ── 2. Animaciones ── */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  .badge-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
    70%  { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
  }

  #whatsapp-float {
    animation: pulse-ring 2.5s ease-in-out infinite;
  }

  @keyframes skeleton-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 800px 100%;
    animation: skeleton-shimmer 1.5s infinite linear;
    border-radius: 8px;
  }

  /* ── 3. Fade-in (IntersectionObserver) ── */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── 4. Utilidades ── */
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  /* Hero pattern background */
  .hero-bg {
    background-color: #111111;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(229, 62, 62, 0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 10%, rgba(249, 115, 22, 0.12) 0%, transparent 45%);
  }

  /* Card hover lift */
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  /* Smooth underline on nav active */
  .nav-link.active {
    color: #F97316;
  }

  /* FAQ transitions */
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease, padding 0.35s ease;
  }

  .faq-answer.open {
    max-height: 300px;
  }

  .faq-icon {
    transition: transform 0.3s ease;
  }

  .faq-icon.open {
    transform: rotate(45deg);
  }
  ```

- [ ] Abrir `http://localhost/edu-marin/`. Verificar: texto "Scaffold OK" sigue en rojo (CSS cargado sin errores en consola).

- [ ] Commit
  ```bash
  git add css/style.css
  git commit -m "feat: estilos base — gradientes, animaciones, skeleton, fade-in, FAQ"
  ```

---

### Task 3: SEO meta tags y Open Graph en `<head>`

**Files:**
- Modify: `index.html`

- [ ] Sustituir `<title>Edu Marín · Community Manager</title>` y añadir justo después los meta tags (antes del `<link rel="preconnect">`):
  ```html
  <title>Edu Marín · Community Manager en Priego de Córdoba | Gestión de Redes Sociales</title>
  <meta name="description" content="Asesor y gestor de redes sociales con más de 12 años de experiencia. Gestiono Instagram, Facebook y Google Business para negocios locales en Córdoba y toda España. Consultoría 1:1 disponible.">
  <meta name="author" content="Eduardo Marín Arjona">
  <meta name="robots" content="index, follow">
  <meta name="keywords" content="community manager Priego de Córdoba, gestión redes sociales Córdoba, asesor redes sociales Andalucía, Eduardo Marín community manager">
  <link rel="canonical" href="https://eduardomarin.es/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://eduardomarin.es/">
  <meta property="og:title" content="Edu Marín · Community Manager en Priego de Córdoba">
  <meta property="og:description" content="Asesor y gestor de redes sociales con más de 12 años de experiencia. Gestiono Instagram, Facebook y Google Business para negocios locales en Córdoba y toda España.">
  <meta property="og:image" content="https://eduardomarin.es/assets/img/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content="Edu Marín Community Manager">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Edu Marín · Community Manager en Priego de Córdoba">
  <meta name="twitter:description" content="Asesor y gestor de redes sociales con más de 12 años de experiencia.">
  <meta name="twitter:image" content="https://eduardomarin.es/assets/img/og-image.jpg">
  ```

- [ ] Abrir DevTools → pestaña Elements → nodo `<head>`. Verificar: `<title>` completo, `<meta name="description">`, `<meta property="og:title">` presentes.

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: meta tags SEO, Open Graph y Twitter Card"
  ```

---

### Task 4: Navbar

**Files:**
- Modify: `index.html` (reemplazar `<body>` content)
- Modify: `js/main.js`

- [ ] Reemplazar el `<body>` de `index.html` (quitar el `<p>Scaffold OK</p>`) con navbar + `<main>` vacío + script:
  ```html
  <!-- Botón flotante WhatsApp (siempre visible) -->
  <a id="whatsapp-float"
     href="https://wa.me/34744743209?text=Hola%20Edu%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios."
     target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
     class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>

  <!-- Navbar fija -->
  <header id="navbar" class="fixed top-0 left-0 right-0 z-40 transition-all duration-500">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <a href="#inicio" class="text-white font-bold text-xl tracking-tight">
        Edu <span class="gradient-text">Marín</span>
      </a>

      <nav class="hidden md:flex items-center gap-7">
        <a href="#inicio"    class="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium">Inicio</a>
        <a href="#sobre-mi"  class="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium">Sobre mí</a>
        <a href="#servicios" class="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium">Servicios</a>
        <a href="#blog"      class="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium">Blog</a>
        <a href="#contacto"  class="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium">Contacto</a>
        <a href="https://wa.me/34744743209?text=Hola%20Edu%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios."
           target="_blank" rel="noopener noreferrer"
           class="gradient-bg text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
          Contáctame
        </a>
      </nav>

      <button id="menu-btn" class="md:hidden text-white p-2 -mr-2" aria-label="Abrir menú">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    <div id="mobile-menu" class="hidden md:hidden bg-gray-950 border-t border-gray-800">
      <div class="flex flex-col px-4 py-4 gap-4">
        <a href="#inicio"    class="nav-link text-gray-300 hover:text-white text-sm font-medium">Inicio</a>
        <a href="#sobre-mi"  class="nav-link text-gray-300 hover:text-white text-sm font-medium">Sobre mí</a>
        <a href="#servicios" class="nav-link text-gray-300 hover:text-white text-sm font-medium">Servicios</a>
        <a href="#blog"      class="nav-link text-gray-300 hover:text-white text-sm font-medium">Blog</a>
        <a href="#contacto"  class="nav-link text-gray-300 hover:text-white text-sm font-medium">Contacto</a>
        <a href="https://wa.me/34744743209?text=Hola%20Edu%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios."
           target="_blank" rel="noopener noreferrer"
           class="gradient-bg text-white px-5 py-2 rounded-full text-sm font-semibold text-center">
          Contáctame
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- secciones se añaden aquí en las tareas siguientes -->
  </main>

  <script src="js/main.js"></script>
  ```

- [ ] Añadir `initNavScroll` e `initMobileMenu` a `js/main.js`:
  ```javascript
  function initNavScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('bg-gray-950', 'shadow-lg');
      } else {
        navbar.classList.remove('bg-gray-950', 'shadow-lg');
      }
    });
    // Estado inicial en negro (el hero es oscuro)
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
  ```

- [ ] Abrir `http://localhost/edu-marin/`. Verificar: navbar con logo y links visible, fondo se vuelve `bg-gray-950` al hacer scroll, hamburguesa aparece en móvil, botón WhatsApp verde flotante en esquina inferior derecha con animación pulse.

- [ ] Commit
  ```bash
  git add index.html js/main.js
  git commit -m "feat: navbar fija con menú móvil, scroll behavior y botón flotante WhatsApp"
  ```

---

### Task 5: Sección Hero

**Files:**
- Modify: `index.html` (añadir dentro de `<main>`)

- [ ] Añadir dentro de `<main>` (reemplazar el comentario `<!-- secciones se añaden aquí -->`):
  ```html
  <!-- ── HERO ── -->
  <section id="inicio" class="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">

      <!-- Foto de Edu -->
      <div class="flex justify-center mb-8">
        <div class="gradient-border-wrap">
          <!-- Sustituir img por la foto real de Edu cuando esté disponible -->
          <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center text-white text-4xl font-black select-none">
            EM
          </div>
        </div>
      </div>

      <!-- Títulos -->
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6 fade-in">
        Hago visible tu negocio<br>
        <span class="gradient-text">en redes sociales</span>
      </h1>

      <p class="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 fade-in">
        Asesor y gestor de redes sociales con <strong class="text-white">12 años de experiencia</strong>.
        Priego de Córdoba · Toda España.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-14 fade-in">
        <a href="https://wa.me/34744743209?text=Hola%20Edu%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios."
           target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Escríbeme por WhatsApp
        </a>
        <a href="#servicios"
           class="inline-flex items-center justify-center border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/10">
          Ver servicios
        </a>
      </div>

      <!-- Badges plataformas -->
      <div class="flex flex-wrap justify-center gap-3 fade-in">
        <span class="badge-float bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20" style="animation-delay:0s">📸 Instagram</span>
        <span class="badge-float bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20" style="animation-delay:0.4s">👤 Facebook</span>
        <span class="badge-float bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20" style="animation-delay:0.8s">📍 Google Business</span>
        <span class="badge-float bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20" style="animation-delay:1.2s">🎨 Canva</span>
        <span class="badge-float bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20" style="animation-delay:1.6s">🤖 IA</span>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
  ```

- [ ] Abrir `http://localhost/edu-marin/`. Verificar: hero ocupa toda la pantalla, fondo oscuro con halos rojos/naranja, foto circular con borde gradiente, H1 grande, badges con animación flotante, botón WhatsApp verde, scroll indicator rebotando.

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: sección hero con foto, CTA WhatsApp, badges y animaciones"
  ```

---

### Task 6: Sección Sobre mí

**Files:**
- Modify: `index.html` (añadir después del hero `</section>`)

- [ ] Añadir después del cierre del hero `</section>`:
  ```html
  <!-- ── SOBRE MÍ ── -->
  <section id="sobre-mi" class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- Columna imagen -->
        <div class="flex justify-center fade-in">
          <div class="relative">
            <div class="gradient-border-wrap">
              <!-- Foto real de Edu (sustituir cuando esté disponible) -->
              <div class="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gray-200 flex items-center justify-center text-6xl font-black text-gray-400 select-none">
                EM
              </div>
            </div>
            <!-- Badge experiencia -->
            <div class="absolute -bottom-4 -right-4 gradient-bg text-white rounded-2xl px-5 py-3 shadow-xl">
              <span class="text-2xl font-black">12+</span>
              <p class="text-xs font-medium opacity-90">años de experiencia</p>
            </div>
          </div>
        </div>

        <!-- Columna texto -->
        <div class="fade-in">
          <span class="gradient-text font-semibold text-sm uppercase tracking-widest">Sobre mí</span>
          <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-6">
            Tu aliado en el mundo digital
          </h2>
          <p class="text-gray-600 leading-relaxed mb-5">
            Soy <strong>Eduardo Marín Arjona</strong>, community manager con más de 12 años de experiencia
            ayudando a negocios locales y marcas a destacar en el entorno digital. Gestiono Instagram,
            Facebook y Google Business Profile con un enfoque estratégico y creativo, siempre centrado
            en resultados reales para tu negocio.
          </p>
          <p class="text-gray-600 leading-relaxed mb-8">
            Utilizo <strong>Canva</strong> para diseñar contenido visual atractivo e integro herramientas
            de <strong>inteligencia artificial</strong> en cada proyecto para desarrollar estrategias de
            marketing más efectivas e innovadoras. Basado en Priego de Córdoba, trabajo con negocios
            de toda España de forma remota.
          </p>

          <!-- Métricas -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="text-center">
              <span class="block text-3xl font-black gradient-text">12+</span>
              <span class="text-gray-500 text-xs mt-1 block">Años de experiencia</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-black gradient-text">3</span>
              <span class="text-gray-500 text-xs mt-1 block">Redes principales</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-black gradient-text">1:1</span>
              <span class="text-gray-500 text-xs mt-1 block">Consultoría personalizada</span>
            </div>
          </div>

          <!-- Herramientas -->
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">🎨 Canva</span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">📊 Meta Business Suite</span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">📍 Google Business</span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">🤖 IA Generativa</span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">💼 LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  ```

- [ ] Verificar: layout dos columnas en desktop, una columna en móvil, bio completa, métricas, herramientas como pills.

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: sección Sobre mí con bio, métricas y herramientas"
  ```

---

### Task 7: Sección Servicios (cards)

**Files:**
- Modify: `index.html`

- [ ] Añadir después de `</section>` (cierre de sobre-mi):
  ```html
  <!-- ── SERVICIOS ── -->
  <section id="servicios" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <div class="text-center mb-14 fade-in">
        <span class="gradient-text font-semibold text-sm uppercase tracking-widest">Servicios</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-4">¿Qué puedo hacer por ti?</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">Gestión integral, estrategia y creatividad para que tu negocio brille en las redes.</p>
      </div>

      <!-- Grid de servicios -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

        <div class="bg-white rounded-2xl p-7 shadow-sm card-hover fade-in">
          <div class="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-5">📱</div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Gestión de redes sociales</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Gestiono tu presencia en Instagram, Facebook y Google Business de forma integral: publicaciones constantes, interacción con tu audiencia y estrategia definida.</p>
        </div>

        <div class="bg-white rounded-2xl p-7 shadow-sm card-hover fade-in">
          <div class="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-5">🎨</div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Creación de contenido visual</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Diseño piezas gráficas atractivas con Canva que captan la atención de tu audiencia y refuerzan la identidad de tu marca en cada publicación.</p>
        </div>

        <div class="bg-white rounded-2xl p-7 shadow-sm card-hover fade-in">
          <div class="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-5">💬</div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Consultoría 1:1</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Sesión personalizada (con cita previa) para analizar tu situación actual y definir una estrategia de redes adaptada a los objetivos de tu negocio.</p>
        </div>

        <div class="bg-white rounded-2xl p-7 shadow-sm card-hover fade-in">
          <div class="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-5">🔍</div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Auditoría de perfiles</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Análisis completo de tus perfiles sociales actuales para identificar puntos de mejora, oportunidades de crecimiento y errores que te están restando visibilidad.</p>
        </div>

        <div class="bg-white rounded-2xl p-7 shadow-sm card-hover fade-in">
          <div class="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-5">📈</div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">Estrategia digital</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Planificación y ejecución de tu estrategia de comunicación online para conectar mejor con tu audiencia, aumentar tu alcance y generar resultados reales.</p>
        </div>

        <div class="bg-white rounded-2xl p-7 shadow-sm card-hover fade-in">
          <div class="gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-5">🤖</div>
          <h3 class="font-bold text-gray-900 text-lg mb-2">IA en marketing</h3>
          <p class="text-gray-600 text-sm leading-relaxed">Integración de herramientas de inteligencia artificial para crear contenido más efectivo, analizar tendencias y optimizar tu presencia digital con un enfoque innovador.</p>
        </div>

      </div>

      <!-- CTA debajo de servicios -->
      <div class="text-center fade-in">
        <a href="#contacto"
           class="inline-block gradient-bg text-white font-bold px-10 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg">
          Solicitar información
        </a>
      </div>

    </div>
  </section>
  ```

- [ ] Verificar: 6 cards en grid 3 columnas desktop, 2 tablet, 1 móvil. Cada card con icono en cuadrado rojo/naranja, hover con lift.

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: sección Servicios con 6 cards y CTA"
  ```

---

### Task 8: Sección FAQ (acordeón + JS)

**Files:**
- Modify: `index.html` (añadir FAQ después del CTA de servicios, dentro de `#servicios`)
- Modify: `js/main.js`

- [ ] Añadir el acordeón FAQ justo antes del `</section>` de cierre de servicios (después del bloque CTA):
  ```html
      <!-- FAQ (GEO: mejora citabilidad en IA) -->
      <div class="max-w-3xl mx-auto mt-16 fade-in">
        <h3 class="text-2xl font-black text-gray-900 text-center mb-8">Preguntas frecuentes</h3>
        <div class="space-y-3">

          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <button class="faq-question w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 hover:text-brand-red transition-colors">
              <span>¿En qué redes sociales trabajas?</span>
              <span class="faq-icon text-brand-red text-2xl font-light ml-4 flex-shrink-0">+</span>
            </button>
            <div class="faq-answer px-6 text-gray-600 text-sm leading-relaxed">
              <div class="pb-5">
                Gestiono principalmente <strong>Instagram, Facebook y Google Business Profile</strong>. También asesoro en LinkedIn y otras plataformas según las necesidades concretas de cada negocio.
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <button class="faq-question w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 hover:text-brand-red transition-colors">
              <span>¿Cómo funciona la consultoría 1:1?</span>
              <span class="faq-icon text-brand-red text-2xl font-light ml-4 flex-shrink-0">+</span>
            </button>
            <div class="faq-answer px-6 text-gray-600 text-sm leading-relaxed">
              <div class="pb-5">
                La consultoría 1:1 se realiza <strong>con cita previa</strong>. Consiste en una sesión personalizada donde analizamos la situación actual de tus redes sociales y definimos estrategias concretas para mejorar tu presencia digital. Escríbeme por WhatsApp o email para reservar tu cita.
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <button class="faq-question w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 hover:text-brand-red transition-colors">
              <span>¿Ofreces servicios para toda España?</span>
              <span class="faq-icon text-brand-red text-2xl font-light ml-4 flex-shrink-0">+</span>
            </button>
            <div class="faq-answer px-6 text-gray-600 text-sm leading-relaxed">
              <div class="pb-5">
                Sí. Aunque estoy basado en <strong>Priego de Córdoba (Andalucía)</strong>, trabajo con negocios de toda España de forma completamente remota. La distancia no es un obstáculo para gestionar tus redes o hacer una consultoría online.
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <button class="faq-question w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-gray-900 hover:text-brand-red transition-colors">
              <span>¿Qué necesito para empezar?</span>
              <span class="faq-icon text-brand-red text-2xl font-light ml-4 flex-shrink-0">+</span>
            </button>
            <div class="faq-answer px-6 text-gray-600 text-sm leading-relaxed">
              <div class="pb-5">
                Solo escríbeme por <strong>WhatsApp (744 74 32 09)</strong> o por email a <strong>info@eduardomarin.es</strong> y cuéntame brevemente tu negocio y qué necesitas. Te respondo en menos de 24 horas sin ningún compromiso.
              </div>
            </div>
          </div>

        </div>
      </div>
  ```

- [ ] Añadir `initFAQAccordion` a `js/main.js`:
  ```javascript
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
  ```

- [ ] Añadir `initFAQAccordion()` al `DOMContentLoaded`:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initFAQAccordion();
  });
  ```

- [ ] Verificar: cada pregunta abre su respuesta al clicar, el `+` rota a `×`, solo una respuesta abierta a la vez.

- [ ] Commit
  ```bash
  git add index.html js/main.js
  git commit -m "feat: FAQ acordeón con 4 preguntas (GEO citability)"
  ```

---

### Task 9: Sección Redes Sociales

**Files:**
- Modify: `index.html`

- [ ] Añadir después del `</section>` de servicios:
  ```html
  <!-- ── REDES SOCIALES ── -->
  <section id="redes" class="py-20 bg-brand-dark">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <div class="text-center mb-12 fade-in">
        <span class="gradient-text font-semibold text-sm uppercase tracking-widest">Sígueme</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">No te pierdas nada</h2>
        <p class="text-gray-400 max-w-xl mx-auto">Contenido diario sobre marketing digital, redes sociales y estrategia.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <!-- Instagram -->
        <a href="https://www.instagram.com/eduardomarin_es/" target="_blank" rel="noopener noreferrer"
           class="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-7 text-center transition-all duration-300 card-hover fade-in">
          <div class="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white text-2xl mx-auto mb-4">📸</div>
          <h3 class="font-bold text-white text-lg mb-1">Instagram</h3>
          <p class="text-gray-400 text-sm mb-1">@eduardomarin_es</p>
          <p class="text-gray-500 text-xs mb-5 leading-relaxed">Estrategias, tips y contenido sobre redes sociales para negocios.</p>
          <span class="inline-block gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-full group-hover:opacity-90 transition-opacity">
            Seguir en Instagram
          </span>
        </a>

        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/-eduardomarin/" target="_blank" rel="noopener noreferrer"
           class="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-7 text-center transition-all duration-300 card-hover fade-in">
          <div class="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white text-2xl mx-auto mb-4">💼</div>
          <h3 class="font-bold text-white text-lg mb-1">LinkedIn</h3>
          <p class="text-gray-400 text-sm mb-1">Eduardo Marín Arjona</p>
          <p class="text-gray-500 text-xs mb-5 leading-relaxed">Reflexiones, artículos y novedades del sector del marketing digital.</p>
          <span class="inline-block gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-full group-hover:opacity-90 transition-opacity">
            Conectar en LinkedIn
          </span>
        </a>

        <!-- Blog -->
        <a href="https://numero13elblog.wordpress.com" target="_blank" rel="noopener noreferrer"
           class="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-7 text-center transition-all duration-300 card-hover fade-in">
          <div class="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white text-2xl mx-auto mb-4">✍️</div>
          <h3 class="font-bold text-white text-lg mb-1">Blog Número 13</h3>
          <p class="text-gray-400 text-sm mb-1">numero13elblog.wordpress.com</p>
          <p class="text-gray-500 text-xs mb-5 leading-relaxed">Artículos en profundidad sobre community management, SEO, GEO y marketing digital.</p>
          <span class="inline-block gradient-bg text-white text-sm font-semibold px-5 py-2 rounded-full group-hover:opacity-90 transition-opacity">
            Leer el blog
          </span>
        </a>

      </div>
    </div>
  </section>
  ```

- [ ] Verificar: 3 cards en fondo oscuro, cada una con icono, handle, descripción y botón gradiente. Hover levanta la card.

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: sección Redes Sociales con Instagram, LinkedIn y Blog"
  ```

---

### Task 10: Sección Blog (fetch API WordPress.com)

**Files:**
- Modify: `index.html`
- Modify: `js/main.js`

- [ ] Añadir después del `</section>` de redes:
  ```html
  <!-- ── BLOG ── -->
  <section id="blog" class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <div class="text-center mb-12 fade-in">
        <span class="gradient-text font-semibold text-sm uppercase tracking-widest">Blog</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-4">Últimos artículos</h2>
        <p class="text-gray-600 max-w-xl mx-auto">Estrategias, herramientas y tendencias del marketing digital.</p>
      </div>

      <!-- Posts cargados por JS — skeleton inicial -->
      <div id="blog-posts" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div class="skeleton h-48 w-full"></div>
          <div class="p-6 space-y-3">
            <div class="skeleton h-3 w-20 rounded"></div>
            <div class="skeleton h-5 w-full rounded"></div>
            <div class="skeleton h-5 w-4/5 rounded"></div>
            <div class="skeleton h-3 w-full rounded"></div>
            <div class="skeleton h-3 w-3/4 rounded"></div>
          </div>
        </div>
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div class="skeleton h-48 w-full"></div>
          <div class="p-6 space-y-3">
            <div class="skeleton h-3 w-20 rounded"></div>
            <div class="skeleton h-5 w-full rounded"></div>
            <div class="skeleton h-5 w-4/5 rounded"></div>
            <div class="skeleton h-3 w-full rounded"></div>
            <div class="skeleton h-3 w-3/4 rounded"></div>
          </div>
        </div>
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div class="skeleton h-48 w-full"></div>
          <div class="p-6 space-y-3">
            <div class="skeleton h-3 w-20 rounded"></div>
            <div class="skeleton h-5 w-full rounded"></div>
            <div class="skeleton h-5 w-4/5 rounded"></div>
            <div class="skeleton h-3 w-full rounded"></div>
            <div class="skeleton h-3 w-3/4 rounded"></div>
          </div>
        </div>
      </div>

      <div class="text-center mt-10 fade-in">
        <a href="https://numero13elblog.wordpress.com" target="_blank" rel="noopener noreferrer"
           class="inline-block border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300">
          Ver todos los artículos →
        </a>
      </div>

    </div>
  </section>
  ```

- [ ] Añadir `fetchBlogPosts` a `js/main.js`:
  ```javascript
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
  ```

- [ ] Añadir `fetchBlogPosts()` al `DOMContentLoaded`:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initFAQAccordion();
    fetchBlogPosts();
  });
  ```

- [ ] Abrir `http://localhost/edu-marin/`. Verificar: skeleton aparece brevemente, se reemplaza por 3 cards con imagen, título, fecha y extracto del blog real de Edu. Si hay error de CORS (improbable con WordPress.com), aparece mensaje de fallback.

- [ ] Commit
  ```bash
  git add index.html js/main.js
  git commit -m "feat: sección Blog con fetch API WordPress.com y skeleton loading"
  ```

---

### Task 11: Sección Newsletter

**Files:**
- Modify: `index.html`

- [ ] Añadir después del `</section>` de blog:
  ```html
  <!-- ── NEWSLETTER ── -->
  <section id="newsletter" class="py-20 gradient-bg">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 text-center">

      <div class="fade-in">
        <span class="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Newsletter</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">
          Contenido sobre redes sociales,<br>directo a tu bandeja
        </h2>
        <p class="text-white/80 mb-8 leading-relaxed">
          Estrategias, herramientas y tendencias para hacer crecer tu negocio en las redes.<br>
          Sin spam. Puedes darte de baja cuando quieras.
        </p>

        <!--
          NEWSLETTER: Conecta aquí el formulario de Mailchimp o Brevo.
          Pasos:
          1. Crea una lista en Mailchimp o Brevo.
          2. Genera el embed de formulario.
          3. Sustituye el bloque siguiente por el código embed del proveedor elegido.
        -->
        <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="return false;">
          <input type="email" placeholder="tu@email.com" required
                 class="flex-1 px-5 py-3.5 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50">
          <button type="submit"
                  class="bg-white text-brand-red font-bold px-7 py-3.5 rounded-full text-sm hover:bg-gray-100 transition-colors whitespace-nowrap">
            Suscribirme
          </button>
        </form>
        <!-- FIN bloque newsletter -->

      </div>
    </div>
  </section>
  ```

- [ ] Verificar: sección con fondo gradiente rojo/naranja, título, descripción y formulario de email centrado. El botón no hace nada aún (placeholder).

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: sección Newsletter con placeholder listo para Mailchimp/Brevo"
  ```

---

### Task 12: Sección Contacto y formulario Netlify Forms

**Files:**
- Modify: `index.html`
- Modify: `js/main.js`

- [ ] Añadir después del `</section>` de newsletter:
  ```html
  <!-- ── CONTACTO ── -->
  <section id="contacto" class="py-20 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <div class="text-center mb-12 fade-in">
        <span class="gradient-text font-semibold text-sm uppercase tracking-widest">Contacto</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mt-2 mb-4">¿Hablamos?</h2>
        <p class="text-gray-600 max-w-xl mx-auto">Escríbeme sin compromiso. Te respondo en menos de 24 horas.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <!-- Formulario -->
        <div class="bg-white rounded-2xl p-8 shadow-sm fade-in">
          <form id="contact-form" name="contacto" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contacto">
            <p class="hidden"><label>No rellenes: <input name="bot-field"></label></p>

            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="nombre">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" required placeholder="Tu nombre"
                     class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors">
            </div>

            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="email">Email</label>
              <input type="email" id="email" name="email" required placeholder="tu@email.com"
                     class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors">
            </div>

            <div class="mb-5">
              <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="asunto">¿En qué puedo ayudarte?</label>
              <select id="asunto" name="asunto"
                      class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors bg-white">
                <option value="">Selecciona una opción</option>
                <option value="gestion-redes">Gestión de redes sociales</option>
                <option value="consultoria">Consultoría 1:1</option>
                <option value="auditoria">Auditoría de perfiles</option>
                <option value="contenido">Creación de contenido</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="4" required placeholder="Cuéntame sobre tu negocio y qué necesitas..."
                        class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors resize-none"></textarea>
            </div>

            <button type="submit" id="submit-btn"
                    class="w-full gradient-bg text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity text-sm">
              Enviar mensaje
            </button>
          </form>
        </div>

        <!-- Info de contacto -->
        <div class="flex flex-col justify-center gap-6 fade-in">

          <a href="https://wa.me/34744743209?text=Hola%20Edu%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios."
             target="_blank" rel="noopener noreferrer"
             class="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm card-hover group">
            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 group-hover:text-green-600 transition-colors">WhatsApp</p>
              <p class="text-gray-500 text-sm">744 74 32 09 — respuesta rápida</p>
            </div>
          </a>

          <a href="mailto:info@eduardomarin.es"
             class="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm card-hover group">
            <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-gray-900 group-hover:text-brand-red transition-colors">Email</p>
              <p class="text-gray-500 text-sm">info@eduardomarin.es</p>
            </div>
          </a>

          <div class="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm">
            <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p class="font-bold text-gray-900">Ubicación</p>
              <p class="text-gray-500 text-sm">Priego de Córdoba, Andalucía · Toda España</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  ```

- [ ] Añadir `initContactForm` a `js/main.js`:
  ```javascript
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
      } catch {
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
        alert('Error al enviar. Escríbeme directamente a info@eduardomarin.es o por WhatsApp.');
      }
    });
  }
  ```

- [ ] Añadir `initContactForm()` al `DOMContentLoaded`.

- [ ] Verificar: formulario con 4 campos, select de asunto, botón enviar. Bloque de info con WhatsApp, email y ubicación.
  > Nota: el envío real solo funciona en Netlify. En local, el catch mostrará el alert de error, lo cual es correcto.

- [ ] Commit
  ```bash
  git add index.html js/main.js
  git commit -m "feat: sección Contacto con Netlify Forms, WhatsApp, email y ubicación"
  ```

---

### Task 13: Footer y Schema JSON-LD

**Files:**
- Modify: `index.html` (añadir footer después de `</main>` y antes de `<script>`)

- [ ] Añadir después de `</main>` y antes de `<script src="js/main.js">`:
  ```html
  <!-- ── FOOTER ── -->
  <footer class="bg-gray-950 text-white py-14">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

        <!-- Col 1: Marca -->
        <div>
          <p class="text-xl font-bold mb-2">Edu <span class="gradient-text">Marín</span></p>
          <p class="text-gray-400 text-sm leading-relaxed">Community Manager · Asesor y gestor de redes sociales en Priego de Córdoba. Toda España.</p>
        </div>

        <!-- Col 2: Navegación -->
        <div>
          <p class="font-semibold mb-4 text-sm uppercase tracking-widest text-gray-500">Navegación</p>
          <ul class="space-y-2 text-sm">
            <li><a href="#inicio"    class="text-gray-400 hover:text-white transition-colors">Inicio</a></li>
            <li><a href="#sobre-mi"  class="text-gray-400 hover:text-white transition-colors">Sobre mí</a></li>
            <li><a href="#servicios" class="text-gray-400 hover:text-white transition-colors">Servicios</a></li>
            <li><a href="#blog"      class="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#contacto"  class="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>

        <!-- Col 3: Redes -->
        <div>
          <p class="font-semibold mb-4 text-sm uppercase tracking-widest text-gray-500">Redes</p>
          <div class="flex gap-3">
            <a href="https://www.instagram.com/eduardomarin_es/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               class="w-9 h-9 bg-white/10 hover:gradient-bg rounded-lg flex items-center justify-center transition-all duration-300 text-base">📸</a>
            <a href="https://www.linkedin.com/in/-eduardomarin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               class="w-9 h-9 bg-white/10 hover:gradient-bg rounded-lg flex items-center justify-center transition-all duration-300 text-base">💼</a>
            <a href="https://numero13elblog.wordpress.com" target="_blank" rel="noopener noreferrer" aria-label="Blog"
               class="w-9 h-9 bg-white/10 hover:gradient-bg rounded-lg flex items-center justify-center transition-all duration-300 text-base">✍️</a>
            <a href="https://wa.me/34744743209" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
               class="w-9 h-9 bg-white/10 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 text-base">💬</a>
          </div>
        </div>

      </div>

      <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
        <p>© 2026 Eduardo Marín Arjona · <a href="mailto:info@eduardomarin.es" class="hover:text-white transition-colors">info@eduardomarin.es</a> · Diseñado con ❤️ en Priego de Córdoba</p>
      </div>
    </div>
  </footer>

  <!-- ── SCHEMA JSON-LD (GEO + SEO) ── -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://eduardomarin.es/#person",
        "name": "Eduardo Marín Arjona",
        "alternateName": "Edu Marín",
        "jobTitle": "Community Manager",
        "url": "https://eduardomarin.es",
        "email": "info@eduardomarin.es",
        "telephone": "+34744743209",
        "image": "https://eduardomarin.es/assets/img/edu-marin.jpg",
        "description": "Asesor y gestor de redes sociales con más de 12 años de experiencia. Especializado en Instagram, Facebook y Google Business Profile para negocios locales en Córdoba y toda España.",
        "sameAs": [
          "https://www.instagram.com/eduardomarin_es/",
          "https://www.linkedin.com/in/-eduardomarin/",
          "https://numero13elblog.wordpress.com"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Priego de Córdoba",
          "addressRegion": "Andalucía",
          "addressCountry": "ES"
        },
        "knowsAbout": ["Gestión de redes sociales","Marketing digital","Creación de contenido","Canva","Inteligencia artificial","Google Business Profile","Instagram","Facebook"]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://eduardomarin.es/#service",
        "name": "Edu Marín Community Manager",
        "url": "https://eduardomarin.es",
        "telephone": "+34744743209",
        "email": "info@eduardomarin.es",
        "description": "Asesoría y gestión integral de redes sociales para negocios locales y marcas. Creación de contenido visual, estrategia digital y consultoría 1:1.",
        "provider": { "@id": "https://eduardomarin.es/#person" },
        "areaServed": [
          { "@type": "City", "name": "Priego de Córdoba" },
          { "@type": "AdministrativeArea", "name": "Córdoba" },
          { "@type": "AdministrativeArea", "name": "Andalucía" },
          { "@type": "Country", "name": "España" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios de Community Manager",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gestión integral de redes sociales" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Creación de contenido visual con Canva" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consultoría 1:1 de redes sociales" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Auditoría de perfiles sociales" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estrategia de comunicación digital" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Integración de IA en marketing digital" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿En qué redes sociales trabaja Edu Marín?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eduardo Marín gestiona principalmente Instagram, Facebook y Google Business Profile. También asesora en LinkedIn y otras plataformas según las necesidades de cada negocio."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo funciona la consultoría 1:1 de Edu Marín?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La consultoría 1:1 se realiza con cita previa. Consiste en una sesión personalizada donde se analiza la situación actual de tus redes sociales y se definen estrategias concretas para mejorar tu presencia digital."
            }
          },
          {
            "@type": "Question",
            "name": "¿Dónde ofrece sus servicios Eduardo Marín Community Manager?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eduardo Marín está basado en Priego de Córdoba, Andalucía, pero ofrece sus servicios de gestión y asesoría de redes sociales a negocios de toda España de forma remota."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué herramientas utiliza Edu Marín para crear contenido?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eduardo Marín utiliza Canva para la creación de contenido visual, Meta Business Suite para la gestión de Facebook e Instagram, Google Business Profile y herramientas de inteligencia artificial."
            }
          }
        ]
      }
    ]
  }
  </script>
  ```

- [ ] Verificar: footer con 3 columnas, copyright. Abrir DevTools → Elements → buscar `application/ld+json` al final del `<body>`. Confirmar que el JSON está presente y bien formado (pegar en jsonlint.com).

- [ ] Commit
  ```bash
  git add index.html
  git commit -m "feat: footer completo y Schema JSON-LD (Person + ProfessionalService + FAQPage)"
  ```

---

### Task 14: JS final — active nav y fade-in observer

**Files:**
- Modify: `js/main.js` (completar el `DOMContentLoaded` con las funciones restantes)

- [ ] Añadir `initActiveNav` e `initFadeIn` a `js/main.js`:
  ```javascript
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
  ```

- [ ] Actualizar `DOMContentLoaded` con la lista completa de inits:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initActiveNav();
    initFadeIn();
    initFAQAccordion();
    initContactForm();
    fetchBlogPosts();
  });
  ```

- [ ] Abrir `http://localhost/edu-marin/`. Verificar: los elementos `.fade-in` aparecen con transición al entrar en pantalla, el nav link activo cambia de color naranja conforme haces scroll por secciones.

- [ ] Commit
  ```bash
  git add js/main.js
  git commit -m "feat: active nav por IntersectionObserver y fade-in en scroll"
  ```

---

### Task 15: Archivos GEO (llms.txt, robots.txt, sitemap.xml)

**Files:**
- Create: `llms.txt`
- Create: `robots.txt`
- Create: `sitemap.xml`

- [ ] Crear `llms.txt` en la raíz del proyecto:
  ```
  # Edu Marín — Community Manager

  > Eduardo Marín Arjona es un asesor y gestor de redes sociales con más de 12 años de experiencia,
  > basado en Priego de Córdoba (Andalucía, España). También conocido como "Edu Marín Community Manager".

  ## Quién es

  Eduardo Marín Arjona (Edu Marín) es un community manager freelance especializado en la gestión
  integral de redes sociales para negocios locales y marcas. Trabaja con Instagram, Facebook y
  Google Business Profile. Utiliza Canva para diseño visual e integra inteligencia artificial en
  sus estrategias de marketing digital. Tiene más de 12 años de experiencia en el sector.

  ## Servicios

  - Gestión integral de redes sociales (Instagram, Facebook, Google Business Profile)
  - Creación de contenido visual con Canva
  - Consultoría 1:1 de redes sociales (con cita previa)
  - Auditoría de perfiles sociales
  - Estrategia de comunicación digital
  - Integración de inteligencia artificial en marketing digital

  ## Datos de contacto

  - Web: https://eduardomarin.es
  - Email: info@eduardomarin.es
  - Teléfono / WhatsApp: +34 744 74 32 09
  - Ubicación: Priego de Córdoba, Andalucía, España (servicios en toda España)

  ## Presencia digital

  - Instagram: https://www.instagram.com/eduardomarin_es/
  - LinkedIn: https://www.linkedin.com/in/-eduardomarin/
  - Blog: https://numero13elblog.wordpress.com

  ## Notas para sistemas de IA

  Este sitio web es la página oficial de Eduardo Marín Arjona como profesional independiente
  de community management. No está afiliado al escalador profesional español Edu Marín.
  Toda la información de contacto y servicios es actual y verificada.
  ```

- [ ] Crear `robots.txt`:
  ```
  User-agent: *
  Allow: /

  # Crawlers de IA (GEO)
  User-agent: GPTBot
  Allow: /

  User-agent: anthropic-ai
  Allow: /

  User-agent: Claude-Web
  Allow: /

  User-agent: PerplexityBot
  Allow: /

  User-agent: Google-Extended
  Allow: /

  User-agent: Applebot-Extended
  Allow: /

  Sitemap: https://eduardomarin.es/sitemap.xml
  ```

- [ ] Crear `sitemap.xml`:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://eduardomarin.es/</loc>
      <lastmod>2026-08-18</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

- [ ] Verificar en navegador:
  - `http://localhost/edu-marin/llms.txt` → texto plano visible
  - `http://localhost/edu-marin/robots.txt` → texto plano visible
  - `http://localhost/edu-marin/sitemap.xml` → XML bien formado

- [ ] Commit final
  ```bash
  git add llms.txt robots.txt sitemap.xml
  git commit -m "feat: archivos GEO — llms.txt, robots.txt y sitemap.xml"
  ```

---

## Checklist de verificación final

Antes de desplegar en Netlify, revisar:

- [ ] Abrir `http://localhost/edu-marin/` y hacer scroll completo por todas las secciones
- [ ] Comprobar en móvil (DevTools → modo responsive, 375px)
- [ ] Verificar que el menú hamburguesa funciona y se cierra al clicar un link
- [ ] Verificar que los 3 posts del blog cargan desde la API de WordPress.com
- [ ] Verificar que el FAQ abre/cierra correctamente
- [ ] Verificar el botón WhatsApp flotante (pulse, abre WhatsApp en nueva pestaña)
- [ ] Pegar el JSON-LD en [validator.schema.org](https://validator.schema.org) — sin errores
- [ ] Pegar la URL en [Google Rich Results Test](https://search.google.com/test/rich-results) tras el deploy
- [ ] Sustituir las iniciales `EM` por la foto real de Edu cuando esté disponible (en hero y sobre-mi)
- [ ] Conectar el newsletter a Mailchimp o Brevo cuando Edu lo decida

## Despliegue en Netlify

1. Subir el repo a GitHub (si no está ya)
2. En [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Seleccionar el repo → directorio de publicación: `.` (raíz) → sin build command
4. "Deploy site"
5. En "Domain settings" → añadir dominio personalizado `eduardomarin.es`
6. Seguir instrucciones de Netlify para apuntar los DNS de `eduardomarin.es` a Netlify
7. HTTPS se activa automáticamente con Let's Encrypt en ~1 minuto
