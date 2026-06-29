/* ============================================================
   ConfIA · script compartido del sitio (todas las páginas)
   ------------------------------------------------------------
   👉 EDITA SOLO ESTE BLOQUE para poner tus datos reales.
   - whatsapp: número internacional, SIN "+" ni espacios (ej. "573001234567")
   - correo:   tu correo de contacto
   - instagram / linkedin / github: URL completa, o "" para ocultar el enlace
   Mientras tengan valores de ejemplo, los botones quedan como marcador.
   ============================================================ */
const CONFIG = {
  whatsapp: "573123066149",
  correo:   "gian992023@gmail.com",
  instagram: "",
  linkedin:  "",
  github:   "https://github.com/gian992023",
  // CRM · captura de leads en Supabase. Estos valores son PÚBLICOS por diseño
  // (la seguridad la da el RLS). Mientras estén vacíos, el formulario sigue
  // funcionando solo con WhatsApp/correo. Pega aquí URL y "anon key".
  supabaseUrl: "https://drwjfvbsebydirbvsxvw.supabase.co",
  supabaseAnonKey: "sb_publishable_Fv7-p4kwfGPov5KCtLm4dw_PwyIKU2_",
};

// Mensajes prellenados para WhatsApp según el botón
const MENSAJES = {
  agenda:   "Hola ConfIA, quiero agendar mi Diagnóstico de IA.",
  whatsapp: "Hola ConfIA, me gustaría más información.",
};

// Navegación del sitio (fuente única, se inyecta en cada página)
const NAV = [
  { id: "inicio",      href: "index.html",       label: "Inicio" },
  { id: "diagnostico", href: "diagnostico.html", label: "Diagnóstico" },
  { id: "servicios",   href: "servicios.html",   label: "Servicios" },
  { id: "casos",       href: "casos.html",        label: "Casos" },
  { id: "academy",     href: "academy.html",      label: "Academy" },
];

(function () {
  "use strict";

  const sinDefinir = (v) => !v || /^57X+$/.test(v) || v === "correo@tudominio.com";
  const waValido = !sinDefinir(CONFIG.whatsapp);
  const correoValido = !sinDefinir(CONFIG.correo);
  const waUrl = (texto) =>
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto || MENSAJES.whatsapp)}`;

  const paginaActiva = document.body.getAttribute("data-page") || "";

  // --- Header compartido ---
  function headerHTML() {
    const items = NAV.map((n) => {
      const activo = n.id === paginaActiva;
      const cls = activo
        ? "text-sm font-semibold text-ink"
        : "text-sm font-medium text-body transition hover:text-ink";
      const aria = activo ? ' aria-current="page"' : "";
      return `<a href="${n.href}"${aria} class="${cls}">${n.label}</a>`;
    }).join("");
    const itemsMovil = NAV.map((n) => {
      const activo = n.id === paginaActiva;
      const cls = activo
        ? "rounded-lg bg-soft px-3 py-2 text-base font-semibold text-ink"
        : "rounded-lg px-3 py-2 text-base font-medium text-body hover:bg-soft";
      const aria = activo ? ' aria-current="page"' : "";
      return `<a href="${n.href}"${aria} class="${cls}">${n.label}</a>`;
    }).join("");
    return `
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
    <a href="index.html" class="group inline-flex items-center text-2xl font-extrabold tracking-tight text-ink" aria-label="ConfIA, inicio">Conf<span class="ml-px rounded-lg bg-accent px-1.5 pb-0.5 leading-none text-white shadow-sm transition group-hover:bg-accent-dark group-hover:shadow">IA</span></a>
    <nav class="hidden items-center gap-7 md:flex" aria-label="Principal">
      ${items}
      <a data-cta="agenda" href="#" class="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark">Agenda tu diagnóstico</a>
    </nav>
    <button id="menuBtn" type="button" class="inline-flex items-center justify-center rounded-lg p-2 text-ink md:hidden" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileMenu">
      <svg id="menuIcon" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      <svg id="closeIcon" class="hidden h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>
  <div id="mobileMenu" class="hidden border-t border-line bg-white md:hidden">
    <nav class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Móvil">
      ${itemsMovil}
      <a data-cta="agenda" href="#" class="mt-1 rounded-xl bg-accent px-3 py-2 text-center text-base font-semibold text-white">Agenda tu diagnóstico</a>
    </nav>
  </div>`;
  }

  // --- Footer compartido ---
  function footerHTML() {
    return `
  <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
    <div class="text-center md:text-left">
      <p class="text-lg font-extrabold tracking-tight text-ink">Conf<span class="text-accent">IA</span></p>
      <p class="mt-1 text-sm text-body">IA y automatizaciones para pymes · Yopal, Casanare (Colombia)</p>
    </div>
    <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Enlaces del pie">
      <a href="diagnostico.html" class="text-sm font-medium text-body hover:text-ink">Diagnóstico</a>
      <a href="servicios.html" class="text-sm font-medium text-body hover:text-ink">Servicios</a>
      <a href="casos.html" class="text-sm font-medium text-body hover:text-ink">Casos</a>
      <a href="academy.html" class="text-sm font-medium text-body hover:text-ink">Academy</a>
      <a data-cta="whatsapp" href="#" class="text-sm font-medium text-body hover:text-ink">WhatsApp</a>
      <a data-cta="correo" href="#" class="text-sm font-medium text-body hover:text-ink">Correo</a>
      <a data-social="instagram" href="#" class="hidden text-sm font-medium text-body hover:text-ink">Instagram</a>
      <a data-social="linkedin" href="#" class="hidden text-sm font-medium text-body hover:text-ink">LinkedIn</a>
      <a data-social="github" href="#" class="hidden text-sm font-medium text-body hover:text-ink">GitHub</a>
    </nav>
  </div>
  <p class="mt-8 text-center text-xs text-body">© <span data-year>2026</span> ConfIA · Marca de <span class="font-medium">trayecto_IA</span>. Todos los derechos reservados.</p>`;
  }

  // Inyectar chrome compartido
  const elHeader = document.getElementById("site-header");
  if (elHeader) elHeader.innerHTML = headerHTML();
  const elFooter = document.getElementById("site-footer");
  if (elFooter) elFooter.innerHTML = footerHTML();

  // --- Cablear CTAs ---
  // 'agenda' -> formulario de diagnóstico (CAPTURA el lead al CRM).
  // 'whatsapp' -> chat directo (opción secundaria). 'correo' -> mailto.
  document.querySelectorAll('[data-cta]').forEach((el) => {
    const tipo = el.getAttribute('data-cta');
    if (tipo === 'agenda') {
      el.setAttribute('href', 'diagnostico.html');
      el.removeAttribute('target');
    } else if (tipo === 'correo') {
      if (correoValido) {
        const asunto = encodeURIComponent('Quiero agendar mi Diagnóstico de IA');
        el.setAttribute('href', `mailto:${CONFIG.correo}?subject=${asunto}`);
      }
    } else if (waValido) { // whatsapp directo
      el.setAttribute('href', waUrl(MENSAJES.whatsapp));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    }
  });

  // --- Datos de contacto en texto ---
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

  // --- Año dinámico ---
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
    menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) { setMenu(false); menuBtn.focus(); }
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

  // --- CRM: guardar lead en Supabase (carga diferida de la librería) ---
  const crmActivo = Boolean(CONFIG.supabaseUrl && CONFIG.supabaseAnonKey);
  let sbClient = null;
  async function getSupabase() {
    if (sbClient) return sbClient;
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    sbClient = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
    return sbClient;
  }
  // Guarda el lead sin romper nunca el flujo de contacto: si algo falla, solo avisa en consola.
  async function guardarLead(datos) {
    if (!crmActivo) return { ok: false, motivo: "crm-inactivo" };
    try {
      const sb = await getSupabase();
      const { error } = await sb.from("leads").insert(datos);
      if (error) throw error;
      return { ok: true };
    } catch (e) {
      console.warn("[ConfIA] No se pudo guardar el lead:", (e && e.message) || e);
      return { ok: false, motivo: "error" };
    }
  }

  // Exponer helpers para páginas con formulario (diagnóstico)
  window.ConfIA = { waUrl, waValido, correoValido, CONFIG, guardarLead, crmActivo };
})();
