// Navegación entre pestañas, barra, tema día/noche, modales y avisos.

import { homeMap, mainMap } from '../modulos/mapa.js';
import { resetUtvModal } from '../modulos/reservas.js';

export function updateTopState() {
  const disc = document.getElementById('tab-discover');
  const hero = document.querySelector('.hero');
  const onHero = disc && !disc.classList.contains('hidden-el') && hero && window.scrollY < hero.offsetHeight - 90;
  document.body.classList.toggle('at-hero', !!onHero);
}

export function switchTab(tabId) {
  const tabs = ['discover', 'agenda', 'gastro', 'mapa', 'midia', 'padok', 'guia'];
  tabs.forEach(function (t) {
    const el = document.getElementById('tab-' + t);
    if (el) el.classList.toggle('hidden-el', t !== tabId);
  });
  document.querySelectorAll('.desktop-nav__btn').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-tab') === tabId); });
  document.querySelectorAll('.dock-item').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-dock') === tabId); });
  closeModal('menu-modal');
  window.scrollTo(0, 0);
  updateTopState();
  setTimeout(function () {
    if (homeMap) homeMap.invalidateSize();
    if (mainMap) mainMap.invalidateSize();
  }, 140);
}

export function toggleSolisTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'social-dark' ? 'solis-light' : 'social-dark';
  html.setAttribute('data-theme', next);
  const ic = document.getElementById('theme-toggle-icon');
  if (ic) ic.setAttribute('href', next === 'social-dark' ? '#i-sun' : '#i-moon');
  quickAction(next === 'social-dark' ? 'Modo noche activado' : 'Modo día activado');
}

export function openModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('hidden-el'); }
export function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden-el');
  if (id === 'utv-modal') resetUtvModal();
}

export function quickAction(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden-el');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function () { t.classList.add('hidden-el'); }, 3600);
}

// Flechas del carrusel de imperdibles
export function scrollImperdibles(dir) {
  const row = document.getElementById('imp-row');
  if (row) row.scrollBy({ left: dir * 270, behavior: 'smooth' });
}
