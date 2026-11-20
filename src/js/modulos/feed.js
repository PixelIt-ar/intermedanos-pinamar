// Feed de paradores, platos y experiencias (en Explorar y en la pestaña Gastro).

import { SOCIAL_GASTRO_FEED } from '../datos/feed.js';
import { closeModal, openModal, quickAction } from '../base/ui.js';
import { esc, findFeed, icon, setSegActive } from '../base/utils.js';
import { focusPinInsideOurWeb } from './mapa.js';
import { padokUrl } from './padok.js';
import { bookTravesia, openBeraBooking } from './reservas.js';

function feedCard(item) {
  // Las novedades de Padok llevan a padok.pixelit.ar en otra pestaña y no tienen pin ni "+ mi día"
  const padok = item.action === 'padok';
  const cta = padok
    ? '<a href="' + esc(padokUrl(item.padokRuta)) + '" target="_blank" rel="noopener">' + esc(item.cta) + icon('external') + '</a>'
    : '<button data-act="feed-book" data-id="' + item.id + '">' + esc(item.cta) + '</button>';
  const cierre = padok
    ? '<span class="fd__src">padok.pixelit.ar</span>'
    : '<button data-act="pin" data-id="' + item.pinId + '" aria-label="Ver en el mapa">' + icon('pin') + 'mapa</button>' +
      '<button data-act="feed-day" data-id="' + item.id + '">+ mi día</button>';
  return '<article class="fd">' +
    '<div class="fd__ph"><img src="' + esc(item.photo) + '" alt="" loading="lazy" style="object-position:' + (item.pos || '50% 50%') + '">' +
      '<span class="tag">' + esc(item.tag) + '</span>' +
      '<button class="fd__heart' + (item.saved ? ' on' : '') + '" data-act="feed-save" data-id="' + item.id + '" aria-label="Guardar">' + icon('heart') + '</button></div>' +
    '<div class="fd__row"><b>' + esc(item.author) + '</b>' + cta + '</div>' +
    '<p class="fd__sub">' + esc(item.dishTitle) + '</p>' +
    '<div class="fd__meta">' +
      '<button data-act="feed-like" data-id="' + item.id + '" aria-label="Me gusta">' + icon('heart') + item.likesCount.toLocaleString('es-AR') + '</button>' +
      '<button data-act="feed-comments" data-id="' + item.id + '" aria-label="Comentarios">' + icon('chat') + item.commentsList.length + '</button>' +
      cierre +
    '</div></article>';
}

function renderSocialCardsInto(containerId, filter) {
  const f = filter || 'ALL';
  const box = document.getElementById(containerId);
  if (!box) return;
  const list = SOCIAL_GASTRO_FEED.filter(function (x) {
    if (f === 'ALL') return true;
    if (f === 'SAVED') return x.saved;
    return x.cat === f;
  });
  box.innerHTML = list.map(feedCard).join('') || '<p class="ag-empty">Todavía no guardaste nada. Tocá el corazón de una tarjeta.</p>';
}

export function rerenderFeeds() {
  renderSocialCardsInto('discover-social-grid', window.__discoverFilter || 'ALL');
  renderSocialCardsInto('full-gastro-grid', window.__gastroFilter || 'ALL');
}

export function likeCard(id) {
  const item = findFeed(id);
  if (!item) return;
  item.likesCount += 1;
  rerenderFeeds();
  quickAction('Te gusta ' + item.author);
}

export function toggleCardSaved(id) {
  const item = findFeed(id);
  if (!item) return;
  item.saved = !item.saved;
  rerenderFeeds();
  quickAction(item.saved ? 'Guardado en tus favoritos' : 'Quitado de tus guardados');
}

export function bookFeedItem(item) {
  if (item.action === 'trav') bookTravesia(item.author);
  else if (item.action === 'pin') focusPinInsideOurWeb(item.pinId, true);
  else openBeraBooking(item.author, item.price, item.pinId);
}

export function openCommentsModal(id) {
  const item = findFeed(id);
  if (!item) return;
  window.__activeCommentIdx = item.id;
  document.getElementById('comments-modal-title').textContent = item.author;
  document.getElementById('comments-list-box').innerHTML = item.commentsList.map(function (c) {
    return '<div class="comment">' + esc(c) + '</div>';
  }).join('');
  openModal('comments-modal');
}

export function submitNewComment() {
  const inp = document.getElementById('new-comment-input');
  const val = (inp.value || '').trim();
  if (!val) return;
  const item = findFeed(window.__activeCommentIdx);
  if (!item) return;
  item.commentsList.push('@vos: ' + val);
  inp.value = '';
  openCommentsModal(item.id);
  rerenderFeeds();
  quickAction('Comentario publicado en ' + item.author);
}

export function createNewUserGastroPost() {
  const place = (document.getElementById('post-place-input').value || 'Luna Roja · Pinamar Norte').trim();
  const dish = (document.getElementById('post-dish-input').value || 'Atardecer y fuegos frente al mar').trim();
  SOCIAL_GASTRO_FEED.unshift({
    id: Date.now(), pinId: 'p2', cat: 'PARADOR', tag: 'RECIÉN SUBIDO', author: place, photo: '/img/st-sunset2.webp', pos: '50% 55%',
    dishTitle: dish, likesCount: 1, saved: true, price: 'Reservar con Bera', cta: 'reservar', action: 'bera',
    commentsList: ['@comunidad_intermedanos: ¡Tremenda foto!']
  });
  document.getElementById('post-place-input').value = '';
  document.getElementById('post-dish-input').value = '';
  closeModal('post-modal');
  window.__discoverFilter = 'ALL';
  window.__gastroFilter = 'ALL';
  rerenderFeeds();
  quickAction('Tu publicación ya está en el feed');
}

export function filterSocialCards(filter, btn) {
  window.__discoverFilter = filter;
  setSegActive(btn);
  renderSocialCardsInto('discover-social-grid', filter);
}

export function filterGastroPage(filter, btn) {
  window.__gastroFilter = filter;
  setSegActive(btn);
  renderSocialCardsInto('full-gastro-grid', filter);
}
