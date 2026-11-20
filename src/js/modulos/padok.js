// Accesos a Padok MX: la franja del Enduro del Verano (portada), el podio (pestaña Padok) y los links.
// Padok siempre se abre en otra pestaña: Mi día y las reservas viven en memoria y se perderían.

import { PADOK_EDV, PADOK_PODIO, PADOK_URL } from '../datos/padok.js';
import { esc, icon } from '../base/utils.js';

const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

export function padokUrl(ruta) {
  return PADOK_URL + (ruta || '/') + '?ref=intermedanos';
}

// 'AAAA-MM-DD' como fecha local (new Date('AAAA-MM-DD') la toma en UTC y puede caer el día anterior)
function fecha(iso) {
  const p = iso.split('-').map(Number);
  return new Date(p[0], p[1] - 1, p[2]);
}

function rango(desde, hasta) {
  const a = fecha(desde);
  const b = fecha(hasta);
  if (a.getMonth() === b.getMonth()) return a.getDate() + '–' + b.getDate() + ' ' + MESES[b.getMonth()];
  return a.getDate() + ' ' + MESES[a.getMonth()] + ' – ' + b.getDate() + ' ' + MESES[b.getMonth()];
}

function texto(id, valor) {
  const el = document.getElementById(id);
  if (el) el.textContent = valor;
}

// Los <a data-padok="/ruta"> del markup toman acá su dirección
function conectarLinks() {
  document.querySelectorAll('a[data-padok]').forEach(function (a) {
    a.href = padokUrl(a.getAttribute('data-padok'));
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

export function renderPadok() {
  const e = PADOK_EDV;
  texto('pk-edv-meta', rango(e.desde, e.hasta) + ' · ' + e.sede.toUpperCase() + ' · A ' + e.distanciaKm + ' KM DE LA GUARDERÍA');

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const dias = Math.round((fecha(e.desde) - hoy) / 86400000);
  const cuenta = document.getElementById('pk-edv-cuenta');
  if (cuenta) cuenta.classList.toggle('hidden-el', dias < 1);
  texto('pk-edv-dias', String(dias));
  texto('pk-edv-dias-lbl', dias === 1 ? 'día para largar' : 'días para largar');
  texto('pk-edv-inscriptos', e.inscriptos.toLocaleString('es-AR'));

  const cats = document.getElementById('pk-edv-cats');
  if (cats) cats.innerHTML = e.categorias.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('');

  const podio = document.getElementById('padok-podio');
  if (podio) {
    podio.innerHTML = PADOK_PODIO.map(function (p, i) {
      const record = p.slug === e.recordPiloto ? ' · récord de la pista ' + e.record : '';
      return '<a class="rank__row pk-row" data-padok="/pilotos/' + esc(p.slug) + '">' +
        '<em>' + (i + 1) + '</em>' +
        '<div><b>' + esc(p.nombre) + ' #' + p.dorsal + '</b><span>' + esc(p.categoria + ' · ' + p.provincia + record) + '</span></div>' +
        icon('external') + '</a>';
    }).join('');
  }

  conectarLinks();
}
