// Utilidades compartidas: escape de HTML, búsquedas en los datos, íconos y conteos.

import { SOCIAL_GASTRO_FEED } from '../datos/feed.js';
import { FULL_GUIA_DATA } from '../datos/lugares.js';
import { CATS } from '../datos/rubros.js';

export function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
export function catOf(item) { return CATS[item.cat] || CATS.servicio; }
export function findPlace(id) { return FULL_GUIA_DATA.find(function (x) { return x.id === id; }); }
export function findFeed(id) { return SOCIAL_GASTRO_FEED.find(function (x) { return String(x.id) === String(id); }); }
export function countCat(cat) { return cat === 'ALL' ? FULL_GUIA_DATA.length : FULL_GUIA_DATA.filter(function (x) { return x.cat === cat; }).length; }
export function setSegActive(btn) {
  if (!btn || !btn.parentElement) return;
  btn.parentElement.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
}
export function icon(name) { return '<svg class="ic"><use href="#i-' + name + '"/></svg>'; }

export function renderCounts() {
  document.querySelectorAll('[data-count]').forEach(function (el) {
    el.textContent = String(countCat(el.getAttribute('data-count')));
  });
}
