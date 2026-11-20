// Guía: directorio de lugares con filtros por rubro y localidad, y la búsqueda.

import { FULL_GUIA_DATA } from '../datos/lugares.js';
import { LOC_LABEL } from '../datos/rubros.js';
import { switchTab } from '../base/ui.js';
import { catOf, esc, icon, setSegActive } from '../base/utils.js';
import { renderCategoryChips } from './filtros.js';
import { popupCta } from './mapa.js';

export let currentGuiaCat = 'ALL';
let currentGuiaLoc = 'ALL';

export function setGuiaCategory(cat) { currentGuiaCat = cat; renderCategoryChips(); renderFullGuia(); }
export function setGuiaLoc(loc, btn) { currentGuiaLoc = loc; setSegActive(btn); renderFullGuia(); }

export function openGuiaWithCat(cat) {
  switchTab('guia');
  setGuiaCategory(cat);
}

export function jumpSearchFromHero(val) {
  switchTab('guia');
  const inp = document.getElementById('guia-search-input');
  if (inp) {
    inp.value = val || '';
    renderFullGuia();
    setTimeout(function () { inp.focus(); }, 60);
  }
}

export function renderFullGuia() {
  const box = document.getElementById('guia-directory-list');
  if (!box) return;
  const q = ((document.getElementById('guia-search-input') || {}).value || '').toLowerCase().trim();
  const list = FULL_GUIA_DATA.filter(function (item) {
    const okC = currentGuiaCat === 'ALL' || item.cat === currentGuiaCat;
    const okL = currentGuiaLoc === 'ALL' || item.localidad === currentGuiaLoc;
    const hay = (item.name + ' ' + item.addr + ' ' + item.info + ' ' + item.badge + ' ' + catOf(item).label).toLowerCase();
    return okC && okL && (!q || hay.indexOf(q) > -1);
  });
  box.innerHTML = list.map(function (item) {
    const c = catOf(item);
    const cta = popupCta(item);
    return '<article class="place">' +
      '<div class="place__top"><span class="cat"><i style="background:' + c.color + '"></i>' + esc(item.badge) + '</span><em>' + (LOC_LABEL[item.localidad] || '') + '</em></div>' +
      '<h3 class="place__name">' + esc(item.name) + '</h3>' +
      '<p class="place__addr">' + esc(item.addr) + '</p>' +
      '<p class="place__txt">' + esc(item.info) + '</p>' +
      (item.approx ? '<p class="place__approx">Ubicación aproximada</p>' : '') +
      '<div class="place__btns"><button class="link" data-act="pin" data-id="' + item.id + '">ver en el mapa ' + icon('arrow') + '</button>' +
        (cta ? '<button class="link" data-act="place-cta" data-id="' + item.id + '">' + cta.t.toLowerCase() + '</button>' : '') +
        '<button class="link" data-act="place-day" data-id="' + item.id + '">+ mi día</button></div>' +
    '</article>';
  }).join('') || '<p class="ag-empty">No encontramos lugares con ese filtro.</p>';
}
