// Punto de entrada: deja en window lo que llama el markup, atiende los clics de los botones
// armados por código (data-act + data-id) y hace el primer render.

import { AGENDA_EVENTS } from './datos/agenda.js';
import { FULL_GUIA_DATA } from './datos/lugares.js';
import { closeModal, openModal, quickAction, scrollImperdibles, switchTab, toggleSolisTheme, updateTopState } from './base/ui.js';
import { findFeed, findPlace, renderCounts } from './base/utils.js';
import { addEventToMyDay, renderAgenda, renderAgendaPreview, setAgendaCat, setAgendaDay, setAgendaLoc } from './modulos/agenda.js';
import { bookFeedItem, createNewUserGastroPost, filterGastroPage, filterSocialCards, likeCard, openCommentsModal, rerenderFeeds, submitNewComment, toggleCardSaved } from './modulos/feed.js';
import { renderCategoryChips, renderLegend } from './modulos/filtros.js';
import { jumpSearchFromHero, openGuiaWithCat, renderFullGuia, setGuiaCategory, setGuiaLoc } from './modulos/guia.js';
import { actOnSelectedPin, addSelectedPinToMyDay, filterMapMarkers, focusPinInsideOurWeb, initInAppMaps, openMapWithCategory, popupAct, popupCta, postWazeAlert, renderMapSideList, toggleGoogleMapTileLayer, triggerInAppSOSBeacon, updateSelectedMapCard } from './modulos/mapa.js';
import { addPlaceToMyDay, renderTimelines } from './modulos/mi-dia.js';
import { renderPadok } from './modulos/padok.js';
import { bookTravesia, confirmBeraReservation, confirmUTVOrder, openBeraBooking, pickSeg, subscribeWhatsapp } from './modulos/reservas.js';
import { executeHarkVoicePlan, openSponsorDetail, renderCredits, signInUser } from './modulos/varios.js';

// Estado compartido entre módulos y con el markup (un onclick lee window.__beraCurrentPinId)
window.__selectedMapPin = FULL_GUIA_DATA[0];
window.__beraCurrentPlace = 'Kota Beach';
window.__beraCurrentPinId = 'p1';
window.__activeCommentIdx = 0;
window.__utvContext = '';

// Funciones que llaman los onclick="..." del markup y los botones de los popups del mapa.
// Los módulos no crean variables globales: todo lo que el HTML llama tiene que estar en esta lista.
Object.assign(window, {
  actOnSelectedPin, addPlaceToMyDay, addSelectedPinToMyDay, bookTravesia, closeModal,
  confirmBeraReservation, confirmUTVOrder, createNewUserGastroPost, executeHarkVoicePlan,
  filterGastroPage, filterSocialCards, focusPinInsideOurWeb, jumpSearchFromHero, openBeraBooking,
  openGuiaWithCat, openMapWithCategory, openModal, openSponsorDetail, pickSeg, popupAct,
  postWazeAlert, quickAction, renderFullGuia, renderMapSideList, scrollImperdibles, setAgendaCat,
  setAgendaDay, setAgendaLoc, setGuiaLoc, signInUser, submitNewComment, subscribeWhatsapp,
  switchTab, toggleGoogleMapTileLayer, toggleSolisTheme, triggerInAppSOSBeacon
});

// Un solo manejador para los botones que arma el código (data-act + data-id)
document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.getAttribute('data-act');
  const id = el.getAttribute('data-id');
  if (act === 'pin') focusPinInsideOurWeb(id, true);
  else if (act === 'pin-soft') focusPinInsideOurWeb(id, false);
  else if (act === 'map-cat') filterMapMarkers(id);
  else if (act === 'guia-cat') setGuiaCategory(id);
  else if (act === 'place-day') { const p = findPlace(id); if (p) addPlaceToMyDay(p.name, p.addr, p.id); }
  else if (act === 'place-cta') { const p = findPlace(id); const cta = p && popupCta(p); if (cta) popupAct(cta.k, FULL_GUIA_DATA.indexOf(p)); }
  else if (act === 'feed-like') likeCard(id);
  else if (act === 'feed-save') toggleCardSaved(id);
  else if (act === 'feed-comments') openCommentsModal(id);
  else if (act === 'feed-book') { const f = findFeed(id); if (f) bookFeedItem(f); }
  else if (act === 'feed-day') { const f = findFeed(id); if (f) addPlaceToMyDay(f.author, f.dishTitle, f.pinId); }
  else if (act === 'ev-day') { const ev = AGENDA_EVENTS[Number(id)]; if (ev) addEventToMyDay(ev); }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') document.querySelectorAll('.modal:not(.hidden-el)').forEach(function (m) { closeModal(m.id); });
});
window.addEventListener('scroll', updateTopState, { passive: true });
window.addEventListener('load', initInAppMaps);

renderCounts();
renderCategoryChips();
renderLegend();
renderTimelines();
rerenderFeeds();
renderFullGuia();
renderAgenda();
renderAgendaPreview();
renderCredits();
renderPadok();
updateSelectedMapCard(FULL_GUIA_DATA[0]);
updateTopState();
setTimeout(initInAppMaps, 250);
