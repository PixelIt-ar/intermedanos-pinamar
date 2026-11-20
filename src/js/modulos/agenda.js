// Agenda: filtros por día, localidad y categoría, y la vista corta de Explorar.

import { AGENDA_CATS, AGENDA_DAYS, AGENDA_EVENTS } from '../datos/agenda.js';
import { esc, icon, setSegActive } from '../base/utils.js';
import { addPlaceToMyDay } from './mi-dia.js';

let agendaDay = 'ALL';
let agendaLoc = 'ALL';
let agendaCat = 'ALL';

function priceBadge(ev) {
  if (ev.price === 'free') return '<span class="badge free">LIBRE Y GRATUITO</span>';
  if (ev.price === 'pay') return '<span class="badge pay">PAGO</span>';
  if (ev.price === 'sobre') return '<span class="badge sobre">AL SOBRE</span>';
  return '<span class="badge own">' + esc(ev.price) + '</span>';
}

function eventRow(ev) {
  const i = AGENDA_EVENTS.indexOf(ev);
  const pin = ev.pinId
    ? '<button class="icobtn" data-act="pin" data-id="' + ev.pinId + '" aria-label="Ver en el mapa">' + icon('pin') + '</button>'
    : '<span class="icobtn nopin" title="Ubicación a confirmar" aria-label="Ubicación a confirmar">' + icon('pin') + '</span>';
  return '<div class="evr' + (ev.own ? ' own' : '') + '"><time>' + esc(ev.time) + '</time>' +
    '<div><b>' + esc(ev.title) + '</b><span class="l"><i>' + esc(AGENDA_CATS[ev.cat] || '') + '</i>' + esc(ev.place) + '</span></div>' +
    priceBadge(ev) +
    '<span class="acts">' + pin + '<button class="pill" data-act="ev-day" data-id="' + i + '">+ mi día</button></span></div>';
}

export function renderAgenda() {
  const box = document.getElementById('agenda-list');
  if (!box) return;
  const list = AGENDA_EVENTS.filter(function (ev) {
    const okD = agendaDay === 'ALL' || ev.day === agendaDay;
    const okL = agendaLoc === 'ALL' || ev.loc === agendaLoc;
    const okC = agendaCat === 'ALL' || (agendaCat === 'FREE' ? ev.price === 'free' : ev.cat === agendaCat);
    return okD && okL && okC;
  });
  let html = '';
  Object.keys(AGENDA_DAYS).forEach(function (d) {
    const day = list.filter(function (ev) { return ev.day === d; });
    if (!day.length) return;
    html += '<div class="ag-day"><b>' + AGENDA_DAYS[d] + '</b><span>' + day.length + (day.length === 1 ? ' evento' : ' eventos') + '</span></div>' + day.map(eventRow).join('');
  });
  box.innerHTML = html || '<p class="ag-empty">No hay eventos con esos filtros. Probá con otro día o localidad.</p>';
  const c = document.getElementById('agenda-count');
  if (c) c.textContent = list.length + ' de ' + AGENDA_EVENTS.length + ' eventos · del 19 al 22 de noviembre';
}

export function renderAgendaPreview() {
  const box = document.getElementById('agenda-preview');
  if (!box) return;
  const pick = AGENDA_EVENTS.filter(function (ev) { return ev.day === 'sab21' && !ev.own && ev.time.indexOf(':') > -1; }).slice(-4);
  box.innerHTML = pick.map(eventRow).join('');
  const src = document.getElementById('also-src');
  if (src) src.textContent = 'Agenda municipal · sábado 21 · ' + pick.length + ' de ' + AGENDA_EVENTS.filter(function (ev) { return ev.day === 'sab21'; }).length + ' eventos';
}

export function setAgendaDay(d, btn) { agendaDay = d; setSegActive(btn); renderAgenda(); }
export function setAgendaLoc(l, btn) { agendaLoc = l; setSegActive(btn); renderAgenda(); }
export function setAgendaCat(c, btn) { agendaCat = c; setSegActive(btn); renderAgenda(); }

export function addEventToMyDay(ev) {
  const t = ev.time.indexOf(':') > -1 ? ev.time + ' hs' : 'A conf.';
  addPlaceToMyDay(ev.title, ev.place + ' · ' + AGENDA_DAYS[ev.day], ev.pinId || null, t);
}
