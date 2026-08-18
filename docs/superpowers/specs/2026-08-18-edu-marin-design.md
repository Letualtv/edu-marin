# Especificación de diseño — Landing Edu Marín

**Fecha:** 2026-08-18
**Proyecto:** Web personal / landing de captación para Eduardo Marín Arjona, Community Manager
**Stack:** HTML + Tailwind CSS CDN + JavaScript vanilla

---

## 1. Objetivo

Landing page de una sola página (one-page scroll) cuyo propósito principal es **convertir visitantes en clientes o contactos**. No es un portfolio ni un blog: es una página de captación con CTA claro hacia WhatsApp y formulario de contacto.

---

## 2. Perfil del cliente

- **Nombre:** Eduardo Marín Arjona
- **Marca:** Edu Marín / Eduardo Marín Community Manager
- **Ubicación:** Priego de Córdoba, Andalucía, España
- **Experiencia:** 12+ años gestionando redes sociales
- **Servicios:** Gestión integral de redes sociales, creación de contenido visual (Canva), consultoría 1:1, estrategia de comunicación digital, integración de IA
- **Redes:**
  - Instagram: `@eduardomarin_es`
  - LinkedIn: `https://www.linkedin.com/in/-eduardomarin/`
  - Blog: `https://numero13elblog.wordpress.com`

---

## 3. Estructura de archivos

```
edu-marin/
├── index.html                  # One-page principal
├── css/
│   └── style.css               # Estilos custom (animaciones, gradientes no disponibles en Tailwind CDN puro)
├── js/
│   └── main.js                 # Fetch API WordPress, smooth scroll, formulario
├── assets/
│   └── img/                    # Foto de Edu, favicon, og-image (1200x630)
├── robots.txt                  # Crawlers SEO
├── sitemap.xml                 # Mapa del sitio (una sola URL por ahora)
├── llms.txt                    # GEO: instrucciones para crawlers de IA
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-08-18-edu-marin-design.md
```

---

## 4. Paleta de color

| Rol | Nombre | Hex |
|-----|--------|-----|
| Primario | Rojo vibrante | `#E53E3E` |
| Primario oscuro | Rojo oscuro (hover) | `#C53030` |
| Gradiente fin | Naranja cálido | `#F97316` |
| Fondo hero | Carbón casi negro | `#111111` |
| Fondo sección par | Gris muy suave | `#F9FAFB` |
| Fondo sección impar | Blanco puro | `#FFFFFF` |
| Texto sobre oscuro | Blanco | `#FFFFFF` |
| Texto sobre claro | Gris oscuro | `#1F2937` |
| Texto secundario | Gris medio | `#6B7280` |

Gradiente principal (hero, cards, botones CTA): `linear-gradient(135deg, #E53E3E, #F97316)`

---

## 5. Tipografía

- **Fuente:** Inter (Google Fonts)
- **Títulos:** `font-bold`, tamaños: H1 `text-5xl md:text-7xl`, H2 `text-3xl md:text-4xl`, H3 `text-xl`
- **Cuerpo:** `text-base` (16px), `leading-relaxed`
- **Carga:** `<link>` en `<head>` con `display=swap` para evitar bloqueo de render

---

## 6. Secciones (orden de scroll)

### 6.1 Navbar fija
- Logo/nombre "Edu Marín" a la izquierda (texto, no imagen)
- Links de navegación a la derecha: Inicio, Sobre mí, Servicios, Blog, Contacto
- Fondo transparente que se vuelve oscuro al hacer scroll (JS)
- Botón "Contáctame" con gradiente rojo/naranja
- Menú hamburguesa en móvil

### 6.2 Hero (`#inicio`)
- Fondo oscuro (`#111111`) con partículas o patrón geométrico sutil (CSS puro)
- Foto de Edu circular con borde gradiente rojo/naranja
- Texto principal: *"Hago visible tu negocio en redes sociales"*
- Subtítulo: *"Asesor y gestor de redes sociales · 12 años de experiencia · Priego de Córdoba"*
- Dos CTAs: botón WhatsApp (verde, icono) + botón "Ver servicios" (outline blanco)
- Badges animados: "Instagram", "Facebook", "Google Business", "Canva", "IA"

### 6.3 Sobre mí (`#sobre-mi`)
- Fondo blanco
- Layout dos columnas en desktop: imagen a la izquierda, texto a la derecha
- Párrafo de bio extraído del perfil de LinkedIn (redactado para SEO/GEO)
- Tres tarjetas de métricas: "12+ años", "Redes gestionadas", "Consultoría 1:1"
- Lista de herramientas: Canva, Meta Business Suite, Google Business, IA (Gemini/ChatGPT)

### 6.4 Servicios (`#servicios`)
- Fondo gris suave (`#F9FAFB`)
- Grid de cards (3 columnas desktop, 1 móvil):
  1. Gestión integral de redes sociales
  2. Creación de contenido visual (Canva)
  3. Consultoría 1:1 (con cita previa)
  4. Auditoría de perfiles sociales
  5. Estrategia de comunicación digital
  6. Integración de IA en marketing
- Cada card: icono SVG, título H3, descripción corta, link "Saber más" → scroll a #contacto
- **Subsección FAQ** (GEO): 4-5 preguntas/respuestas en acordeón
  - Ejemplos: "¿Cuánto cuesta gestionar mis redes?", "¿En qué redes trabajas?", "¿Cómo funciona la consultoría?"

### 6.5 Redes sociales (`#redes`)
- Fondo oscuro con gradiente sutil
- Título: *"Sígueme y no te pierdas nada"*
- Tres cards horizontales: Instagram, LinkedIn, Blog
  - Icono de red + handle/URL + descripción breve + botón "Seguir" / "Visitar"
- Estilo con borde gradiente rojo/naranja

### 6.6 Blog (`#blog`)
- Fondo blanco
- Título: *"Últimos artículos"*
- Grid de 3 cards con los últimos posts del blog
- Datos: imagen destacada, título, fecha, extracto (100 chars)
- Carga dinámica via `fetch` a la API pública de WordPress.com:
  `https://public-api.wordpress.com/wp/v2/sites/numero13elblog.wordpress.com/posts?per_page=3`
- Estado de carga (skeleton) y estado de error con mensaje amigable
- Botón "Ver todos los artículos" → `https://numero13elblog.wordpress.com`

### 6.7 Newsletter (`#newsletter`)
- Fondo oscuro con gradiente rojo/naranja
- Título: *"Contenido sobre redes sociales, directo a tu bandeja"*
- Campo email + botón "Suscribirme"
- Placeholder preparado para conectar Mailchimp o Brevo (comentario HTML claro)
- Texto de privacidad: "Sin spam. Puedes darte de baja cuando quieras."

### 6.8 Contacto (`#contacto`)
- Fondo gris suave
- Dos columnas: formulario (izq) + info de contacto (der)
- **Formulario:** nombre, email, mensaje, botón enviar → Formspree (`action` con ID placeholder)
- **Info:** icono WhatsApp con número, icono email, ubicación (Priego de Córdoba)
- Botón WhatsApp grande y destacado: abre `https://wa.me/34XXXXXXXXX` con mensaje predefinido

### 6.9 Footer
- Fondo muy oscuro (`#0a0a0a`)
- Columna izquierda: logo/nombre + tagline corto
- Columna centro: links de navegación
- Columna derecha: iconos redes sociales
- Línea inferior: copyright + "Diseñado con ❤️ en Priego de Córdoba"
- Schema JSON-LD embebido aquí (ver sección 8)

### 6.10 Botón flotante WhatsApp
- Fijo en esquina inferior derecha, siempre visible
- Icono WhatsApp verde, sombra suave, animación pulse

---

## 7. JavaScript (`main.js`)

| Función | Descripción |
|---------|-------------|
| `fetchBlogPosts()` | Llama a la API de WordPress.com y renderiza las 3 últimas entradas |
| `initNavScroll()` | Cambia el fondo del navbar al hacer scroll |
| `initSmoothScroll()` | Scroll suave a secciones al clicar nav links |
| `initFAQAccordion()` | Abre/cierra las preguntas frecuentes |
| `initContactForm()` | Valida el formulario y muestra feedback de envío |

---

## 8. SEO

### Meta tags (`<head>`)
```html
<title>Edu Marín · Community Manager en Priego de Córdoba | Gestión de Redes Sociales</title>
<meta name="description" content="Asesor y gestor de redes sociales con 12 años de experiencia. Gestiono Instagram, Facebook y Google Business para negocios locales en Córdoba y toda España. Consultoría 1:1 disponible.">
<link rel="canonical" href="https://eduardomarin.es/">
```

### Open Graph / Twitter Card
```html
<meta property="og:title" content="Edu Marín · Community Manager">
<meta property="og:description" content="...">
<meta property="og:image" content="/assets/img/og-image.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### Semántica HTML5
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` (cards blog), `<aside>`, `<footer>`
- Un único `<h1>` en el hero
- Jerarquía H2 por sección, H3 en cards
- `alt` descriptivos en todas las imágenes

---

## 9. GEO (Generative Engine Optimization)

### Schema JSON-LD (en footer)
Tres bloques:

**Person:**
```json
{
  "@type": "Person",
  "name": "Eduardo Marín Arjona",
  "alternateName": "Edu Marín",
  "jobTitle": "Community Manager",
  "url": "https://eduardomarin.es",
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
  }
}
```

**ProfessionalService:**
```json
{
  "@type": "ProfessionalService",
  "name": "Edu Marín Community Manager",
  "description": "Asesoría y gestión de redes sociales para negocios locales",
  "areaServed": ["Priego de Córdoba", "Córdoba", "Andalucía", "España"],
  "serviceType": ["Gestión de redes sociales", "Creación de contenido", "Consultoría digital"]
}
```

**FAQPage:** (basado en el acordeón de servicios)

### `llms.txt` (raíz del proyecto)
Fichero que describe quién es Edu Marín, sus servicios, redes y URLs relevantes para que los crawlers de IA lo indexen correctamente como entidad.

### Estrategia de contenido GEO
- Bio y sección "Sobre mí" redactadas en frases completas y directas (no solo bullets)
- Nombre completo, ubicación y especialidad repetidos de forma natural en varias secciones
- FAQ con preguntas reales que los usuarios hacen a la IA sobre community managers

---

## 10. Pendiente / Segunda fase

- Integración de plugins SEO/GEO de la comunidad (a definir)
- Conexión del newsletter a Mailchimp o Brevo (cuando Edu lo decida)
- Número de WhatsApp real de Edu (placeholder en el código)
- Foto profesional de Edu (placeholder por ahora)
- ID de formulario Formspree real
- URL de dominio definitivo (placeholder `eduardomarin.es`)
- Plugins SEO/GEO de la comunidad de superpowers

---

## 11. Criterios de éxito

- La landing carga en menos de 2 segundos en móvil
- El formulario de contacto funciona y envía email
- El botón de WhatsApp abre correctamente con mensaje predefinido
- Los 3 últimos posts del blog se cargan desde la API
- El Schema JSON-LD valida sin errores en Google Rich Results Test
- El `llms.txt` es accesible públicamente
- La página es 100% responsiva (mobile-first)
