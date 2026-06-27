/* ============================================================
   ConfIA · interacciones de la landing
   ------------------------------------------------------------
   👉 EDITA SOLO ESTE BLOQUE para poner tus datos reales.
   - whatsapp: número en formato internacional, SIN "+" ni espacios (ej. "573001234567")
   - correo:   tu correo de contacto
   - instagram / linkedin: URL completa, o déjalo en "" para ocultar el enlace
   Mientras tengan los valores de ejemplo, los botones quedan como
   marcador (placeholder) y el texto de contacto muestra "[por definir]".
   ============================================================ */
const CONFIG = {
  whatsapp: "573123066149",          // <-- tu número en formato internacional (sin "+")
  correo:   "gian992023@gmail.com",  // <-- tu correo de contacto
  instagram: "",                      // <-- URL de Instagram o "" para ocultar
  linkedin:  "",                      // <-- URL de LinkedIn o "" para ocultar
  github:   "https://github.com/gian992023", // <-- URL del perfil de GitHub o "" para ocultar
};

// Mensajes prellenados para WhatsApp segun el boton
const MENSAJES = {
  agenda:   "Hola ConfIA, quiero agendar mi Diagnóstico de IA.",
  whatsapp: "Hola ConfIA, me gustaría más información.",
};

(function () {
  "use strict";

  const sinDefinir = (v) => !v || /^57X+$/.test(v) || v === "correo@tudominio.com";
  const waValido = !sinDefinir(CONFIG.whatsapp);
  const correoValido = !sinDefinir(CONFIG.correo);

  function waUrl(tipo) {
    const texto = encodeURIComponent(MENSAJES[tipo] || MENSAJES.whatsapp);
    return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  }

  // --- Cablear CTAs (sin backend: solo wa.me y mailto) ---
  document.querySelectorAll('[data-cta]').forEach((el) => {
    const tipo = el.getAttribute('data-cta');
    if (tipo === 'correo') {
      if (correoValido) {
        const asunto = encodeURIComponent('Quiero agendar mi Diagnóstico de IA');
        el.setAttribute('href', `mailto:${CONFIG.correo}?subject=${asunto}`);
      }
    } else { // agenda o whatsapp -> ambos abren WhatsApp
      if (waValido) {
        el.setAttribute('href', waUrl(tipo === 'agenda' ? 'agenda' : 'whatsapp'));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    }
  });

  // --- Mostrar datos de contacto en el texto bajo el CTA final ---
  document.querySelectorAll('[data-show="whatsapp"]').forEach((el) => {
    el.textContent = waValido ? `+${CONFIG.whatsapp}` : '[por definir]';
  });
  document.querySelectorAll('[data-show="correo"]').forEach((el) => {
    el.textContent = correoValido ? CONFIG.correo : '[por definir]';
  });

  // --- Redes sociales: mostrar solo si hay URL ---
  document.querySelectorAll('[data-social]').forEach((el) => {
    const url = CONFIG[el.getAttribute('data-social')];
    if (url) {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.classList.remove('hidden');
    }
  });

  // --- Año dinámico en el footer ---
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // --- Menú móvil ---
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');

  function setMenu(abierto) {
    mobileMenu.classList.toggle('hidden', !abierto);
    menuIcon.classList.toggle('hidden', abierto);
    closeIcon.classList.toggle('hidden', !abierto);
    menuBtn.setAttribute('aria-expanded', String(abierto));
    menuBtn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      setMenu(mobileMenu.classList.contains('hidden'));
    });
    // Cerrar al hacer clic en un enlace del menú
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  // --- Acordeón FAQ (accesible) ---
  document.querySelectorAll('.faq-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const abierto = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!abierto));
      if (panel) panel.classList.toggle('hidden', abierto);
    });
  });
})();
