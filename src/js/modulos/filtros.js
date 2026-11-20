// Chips de rubro del mapa y de la guía (armados desde los datos, con conteos reales) y leyenda del mapa.

import { CATS, CAT_ORDER } from '../datos/rubros.js';
import { countCat, icon } from '../base/utils.js';
import { currentGuiaCat } from './guia.js';
import { currentMapCat } from './mapa.js';

export function renderCategoryChips() {
  const mk = function (act, cur) {
    return ['ALL'].concat(CAT_ORDER).map(function (cat) {
      const n = countCat(cat);
      if (!n) return '';
      const label = cat === 'ALL' ? 'Todos' : CATS[cat].label;
      return '<button class="chip' + (cur === cat ? ' is-active' : '') + '" data-act="' + act + '" data-id="' + cat + '">' +
        (cat === 'ALL' ? '' : icon(CATS[cat].icon)) + label + ' ' + n + '</button>';
    }).join('');
  };
  const mapBox = document.getElementById('map-category-pills');
  if (mapBox) mapBox.innerHTML = mk('map-cat', currentMapCat);
  const guiaBox = document.getElementById('guia-cat-pills');
  if (guiaBox) guiaBox.innerHTML = mk('guia-cat', currentGuiaCat);
}

export function renderLegend() {
  const box = document.getElementById('home-legend');
  if (!box) return;
  box.innerHTML = CAT_ORDER.map(function (cat) {
    return '<li><i style="background:' + CATS[cat].map + '"></i>' + CATS[cat].label + '<em>' + countCat(cat) + '</em></li>';
  }).join('');
}
