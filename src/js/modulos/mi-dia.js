// Mi día: itinerario con lugares, platos y eventos.

import { MY_TRIP_ITEMS } from '../datos/mi-dia.js';
import { quickAction } from '../base/ui.js';
import { esc, icon } from '../base/utils.js';

export function renderTimelines() {
  const countEl = document.getElementById('nav-midia-count');
  if (countEl) countEl.textContent = String(MY_TRIP_ITEMS.length);
  const fullBox = document.getElementById('full-timeline-list');
  if (!fullBox) return;
  const sorted = MY_TRIP_ITEMS.slice().sort(function (a, b) { return a.time.localeCompare(b.time); });
  fullBox.innerHTML = sorted.map(function (item) {
    const act = item.pinId ? ' data-act="pin" data-id="' + item.pinId + '"' : '';
    return '<button class="tl"' + act + '><time>' + esc(item.time.replace(' hs', '')) + '</time>' +
      '<div><b>' + esc(item.title) + '</b><span>' + esc(item.sub) + '</span></div>' +
      (item.pinId ? icon('pin') : '') + '</button>';
  }).join('');
}

export function addPlaceToMyDay(title, sub, pinId, time) {
  MY_TRIP_ITEMS.push({ time: time || '19:45 hs', title: title, sub: sub, pinId: pinId || null });
  renderTimelines();
  quickAction('"' + title + '" se sumó a Mi día');
}
