/* ConfIA · formulario de Diagnóstico
   Sin backend: arma un mensaje con las respuestas y lo envía por WhatsApp o correo.
   Usa los helpers expuestos en window.ConfIA (definidos en main.js). */
(function () {
  "use strict";

  const form = document.getElementById("form-diagnostico");
  if (!form) return;

  const cajaError = document.getElementById("form-error");
  const btnCorreo = document.getElementById("enviar-correo");
  const API = window.ConfIA || {};

  const valor = (name) => (form.elements[name]?.value || "").trim();
  const marcados = (name) =>
    Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);

  function validar() {
    const faltan = [];
    if (!valor("nombre")) faltan.push("tu nombre");
    if (!valor("empresa")) faltan.push("el nombre del negocio");
    if (!valor("contacto")) faltan.push("un WhatsApp o teléfono");
    if (faltan.length) {
      cajaError.textContent = "Por favor completa: " + faltan.join(", ") + ".";
      cajaError.classList.remove("hidden");
      const primero = faltan.includes("tu nombre") ? "nombre"
        : faltan.includes("el nombre del negocio") ? "empresa" : "contacto";
      form.elements[primero]?.focus();
      return false;
    }
    cajaError.classList.add("hidden");
    return true;
  }

  function construirMensaje() {
    const lineas = [
      "Hola ConfIA, quiero mi Diagnóstico de IA. Estos son mis datos:",
      "",
      `• Nombre: ${valor("nombre")}`,
      `• Negocio: ${valor("empresa")}`,
    ];
    if (valor("sector")) lineas.push(`• Sector: ${valor("sector")}`);
    if (valor("ciudad")) lineas.push(`• Ciudad: ${valor("ciudad")}`);
    lineas.push(`• Contacto: ${valor("contacto")}`);
    if (valor("dedica")) lineas.push(`• A qué se dedica: ${valor("dedica")}`);
    const canales = marcados("canales");
    if (canales.length) lineas.push(`• Canales: ${canales.join(", ")}`);
    const dolores = marcados("dolores");
    if (dolores.length) lineas.push(`• Lo que más tiempo quita: ${dolores.join(", ")}`);
    if (valor("prioridad")) lineas.push(`• Tarea a quitarse de encima: ${valor("prioridad")}`);
    return lineas.join("\n");
  }

  function enviarWhatsApp() {
    if (!validar()) return;
    const texto = construirMensaje();
    if (API.waValido && API.waUrl) {
      window.open(API.waUrl(texto), "_blank", "noopener");
    } else if (API.correoValido && API.CONFIG) {
      window.location.href = mailtoUrl(texto);
    } else {
      cajaError.textContent = "Aún no hay un canal de contacto configurado. Intenta más tarde.";
      cajaError.classList.remove("hidden");
    }
  }

  function mailtoUrl(texto) {
    const correo = (API.CONFIG && API.CONFIG.correo) || "";
    const asunto = encodeURIComponent("Solicitud de Diagnóstico de IA");
    return `mailto:${correo}?subject=${asunto}&body=${encodeURIComponent(texto)}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarWhatsApp();
  });

  if (btnCorreo) {
    btnCorreo.addEventListener("click", (e) => {
      e.preventDefault();
      if (!validar()) return;
      window.location.href = mailtoUrl(construirMensaje());
    });
  }
})();
