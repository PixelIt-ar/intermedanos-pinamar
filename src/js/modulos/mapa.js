// Mapa: Leaflet con capa de calles oscura, pines del mismo estilo y grupos con número.
// Nada saca al usuario hacia Google Maps: todo pasa por focusPinInsideOurWeb.
// L (Leaflet y markercluster) llega como global desde los <script> del <head>.

import { CORREDOR_SEGURO_COORDS, FULL_GUIA_DATA } from '../datos/lugares.js';
import { CATS } from '../datos/rubros.js';
import { closeModal, openModal, quickAction, switchTab } from '../base/ui.js';
import { catOf, esc, findPlace } from '../base/utils.js';
import { renderCategoryChips } from './filtros.js';
import { jumpSearchFromHero } from './guia.js';
import { addPlaceToMyDay } from './mi-dia.js';
import { openBeraBooking } from './reservas.js';

export let homeMap = null;
export let mainMap = null;
let mainMarkersLayer = null;
let homeMarkersLayer = null;
let mainTileLayerSat = null;
let mainTileLayerStreet = null;
let usingSatLayer = false;
export let currentMapCat = 'ALL';
const markerByIdMain = {};
const markerByIdHome = {};

function createPinIcon(item, selected) {
  const c = catOf(item).map;
  return L.divIcon({
    className: '',
    html: '<span class="pin' + (selected ? ' sel' : '') + '" style="--c:' + c + '" title="' + esc(item.name) + '"></span>',
    iconSize: selected ? [30, 30] : [22, 22],
    iconAnchor: selected ? [15, 15] : [11, 11],
    popupAnchor: [0, -12]
  });
}

const POPUP_OPTS = { maxWidth: 260, autoPanPadding: [18, 18] };

export function popupCta(item) {
  if (item.cat === 'guarderia') return { k: 3, t: 'Programar salida' };
  if (item.cat === 'parador' || item.cat === 'restaurante') return { k: 1, t: 'Reservar' };
  return null;
}

// Los popups de Leaflet frenan la propagación del clic: por eso llaman a popupAct con números
function buildPopupHtml(item) {
  const idx = FULL_GUIA_DATA.indexOf(item);
  const cta = popupCta(item);
  return '<div class="pop"><span class="eyebrow">' + esc(item.badge) + '</span>' +
    '<strong>' + esc(item.name) + '</strong>' +
    '<span class="addr">' + esc(item.addr) + (item.approx ? ' · aprox.' : '') + '</span>' +
    '<p>' + esc(item.info) + '</p>' +
    '<div class="pop__btns">' +
      (cta ? '<button class="go" onclick="popupAct(' + cta.k + ', ' + idx + ')">' + cta.t + '</button>' : '') +
      '<button onclick="popupAct(2, ' + idx + ')">+ Mi día</button>' +
    '</div></div>';
}

export function popupAct(kind, idx) {
  const item = FULL_GUIA_DATA[idx];
  if (!item) return;
  if (kind === 1) openBeraBooking(item.name, 'Reservar con Bera', item.id);
  else if (kind === 2) addPlaceToMyDay(item.name, item.addr, item.id);
  else if (kind === 3) openModal('utv-modal');
}

function makeClusterGroup() {
  if (typeof L.markerClusterGroup !== 'function') return L.layerGroup();
  return L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 42,
    disableClusteringAtZoom: 16,
    iconCreateFunction: function (cluster) {
      return L.divIcon({ className: '', html: '<span class="clu">' + cluster.getChildCount() + '</span>', iconSize: [36, 36] });
    }
  });
}

function darkStreetTiles() {
  return L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20, className: 'tiles-dark' });
}

function drawCorridor(map) {
  L.polyline(CORREDOR_SEGURO_COORDS, { color: '#7BC48A', weight: 11, opacity: 0.18 }).addTo(map);
  L.polyline(CORREDOR_SEGURO_COORDS, { color: '#7BC48A', weight: 3.5, opacity: 1, className: 'corridor-glow' })
    .bindPopup('<div class="pop"><span class="eyebrow">Habilitado</span><strong>Corredor Seguro</strong><p>De la guardería a La Frontera Norte.</p></div>')
    .addTo(map);
}

export function initInAppMaps() {
  if (typeof L === 'undefined') return;
  const homeEl = document.getElementById('home-leaflet-map');
  if (homeEl && !homeMap) {
    homeMap = L.map(homeEl, { zoomControl: false, attributionControl: false, scrollWheelZoom: false }).setView([-37.1, -56.86], 12);
    darkStreetTiles().addTo(homeMap);
    drawCorridor(homeMap);
    homeMarkersLayer = makeClusterGroup().addTo(homeMap);
  }
  const mainEl = document.getElementById('main-leaflet-map');
  if (mainEl && !mainMap) {
    mainMap = L.map(mainEl, { attributionControl: false }).setView([-37.1, -56.86], 13);
    mainTileLayerStreet = darkStreetTiles().addTo(mainMap);
    mainTileLayerSat = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { maxZoom: 20 });
    drawCorridor(mainMap);
    mainMarkersLayer = makeClusterGroup().addTo(mainMap);
  }
  populateMapMarkers(currentMapCat);
}

function populateMapMarkers(catFilter) {
  currentMapCat = catFilter || 'ALL';
  renderMapSideList();
  if (!mainMarkersLayer || !homeMarkersLayer) return;
  mainMarkersLayer.clearLayers();
  homeMarkersLayer.clearLayers();
  const sel = window.__selectedMapPin;
  FULL_GUIA_DATA.filter(function (item) { return currentMapCat === 'ALL' || item.cat === currentMapCat; }).forEach(function (item) {
    const m1 = L.marker([item.lat, item.lng], { icon: createPinIcon(item, sel === item) }).bindPopup(buildPopupHtml(item), POPUP_OPTS);
    m1.on('click', function () { updateSelectedMapCard(item); });
    mainMarkersLayer.addLayer(m1);
    markerByIdMain[item.id] = m1;
    const m2 = L.marker([item.lat, item.lng], { icon: createPinIcon(item, sel === item) }).bindPopup(buildPopupHtml(item), POPUP_OPTS);
    m2.on('click', function () { updateSelectedMapCard(item); });
    homeMarkersLayer.addLayer(m2);
    markerByIdHome[item.id] = m2;
  });
}

export function renderMapSideList() {
  const box = document.getElementById('map-side-list');
  if (!box) return;
  const q = ((document.getElementById('map-search-input') || {}).value || '').toLowerCase().trim();
  const sel = window.__selectedMapPin;
  const list = FULL_GUIA_DATA.filter(function (item) {
    const okCat = currentMapCat === 'ALL' || item.cat === currentMapCat;
    const okQ = !q || item.name.toLowerCase().indexOf(q) > -1 || item.addr.toLowerCase().indexOf(q) > -1;
    return okCat && okQ;
  });
  box.innerHTML = list.map(function (item) {
    return '<button class="map-li' + (sel === item ? ' is-sel' : '') + '" data-act="pin-soft" data-id="' + item.id + '">' +
      '<i style="background:' + catOf(item).map + '"></i>' +
      '<div><b>' + esc(item.name) + '</b><span>' + esc(item.addr) + '</span></div>' +
      '<em>' + esc(catOf(item).one) + '</em></button>';
  }).join('') || '<p class="ag-empty">No hay lugares con ese filtro.</p>';
}

export function updateSelectedMapCard(item) {
  const prev = window.__selectedMapPin;
  window.__selectedMapPin = item;
  const set = function (id, txt) { const el = document.getElementById(id); if (el) el.textContent = txt; };
  set('map-selected-badge', item.badge);
  set('map-selected-title', item.name);
  set('map-selected-addr', item.addr + (item.approx ? ' · ubicación aproximada' : ''));
  set('map-selected-sub', item.info);
  const cta = popupCta(item);
  set('map-selected-cta', cta ? cta.t.toLowerCase() : 'ver en la guía');
  [[markerByIdMain, prev, false], [markerByIdHome, prev, false], [markerByIdMain, item, true], [markerByIdHome, item, true]].forEach(function (x) {
    const p = x[1];
    if (p && x[0][p.id] && (x[2] || p !== item)) x[0][p.id].setIcon(createPinIcon(p, x[2]));
  });
  renderMapSideList();
}

export function actOnSelectedPin() {
  const p = window.__selectedMapPin || FULL_GUIA_DATA[0];
  const cta = popupCta(p);
  if (!cta) { jumpSearchFromHero(p.name); return; }
  popupAct(cta.k, FULL_GUIA_DATA.indexOf(p));
}

function isMapVisible(map) { return !!(map && map.getContainer().offsetParent); }

function flyAndOpen(map, marker, item) {
  if (!isMapVisible(map)) return;
  map.invalidateSize();
  map.flyTo([item.lat, item.lng], 16, { duration: 0.7 });
  if (marker) setTimeout(function () { marker.openPopup(); }, 850);
}

// ENFOCA CUALQUIER PUNTO DENTRO DE NUESTRO PROPIO MAPA (SIN SALIR NUNCA DE LA WEB)
export function focusPinInsideOurWeb(pinId, switchToFullMapTab) {
  const item = findPlace(pinId) || FULL_GUIA_DATA[0];
  if (currentMapCat !== 'ALL' && item.cat !== currentMapCat) setMapCat('ALL');
  updateSelectedMapCard(item);
  if (switchToFullMapTab) switchTab('mapa');
  setTimeout(function () {
    flyAndOpen(mainMap, markerByIdMain[item.id], item);
    flyAndOpen(homeMap, markerByIdHome[item.id], item);
  }, 160);
  quickAction('En el mapa: ' + item.name);
}

function setMapCat(cat) {
  currentMapCat = cat;
  renderCategoryChips();
  populateMapMarkers(cat);
}

export function filterMapMarkers(cat) { setMapCat(cat); fitToCat(cat); }

function fitToCat(cat) {
  if (!mainMap) return;
  const pts = FULL_GUIA_DATA.filter(function (x) { return cat === 'ALL' || x.cat === cat; }).map(function (x) { return [x.lat, x.lng]; });
  if (pts.length) mainMap.fitBounds(L.latLngBounds(pts), { padding: [50, 50], maxZoom: 15 });
}

export function openMapWithCategory(cat) {
  switchTab('mapa');
  setMapCat(cat);
  setTimeout(function () { if (mainMap) { mainMap.invalidateSize(); fitToCat(cat); } }, 160);
  quickAction('Mostrando ' + (CATS[cat] ? CATS[cat].label.toLowerCase() : 'lugares') + ' en el mapa');
}

export function toggleGoogleMapTileLayer() {
  if (!mainMap) return;
  const label = document.querySelector('#toggle-tile-btn span');
  if (usingSatLayer) {
    mainMap.removeLayer(mainTileLayerSat);
    mainTileLayerStreet.addTo(mainMap);
    usingSatLayer = false;
    if (label) label.textContent = 'ver satélite';
    quickAction('Mapa de calles activado');
  } else {
    mainMap.removeLayer(mainTileLayerStreet);
    mainTileLayerSat.addTo(mainMap);
    usingSatLayer = true;
    if (label) label.textContent = 'ver calles';
    quickAction('Vista satelital activada');
  }
}

export function addSelectedPinToMyDay() {
  const p = window.__selectedMapPin || FULL_GUIA_DATA[0];
  addPlaceToMyDay(p.name, p.addr, p.id);
}

export function triggerInAppSOSBeacon() {
  closeModal('sos-modal');
  switchTab('mapa');
  setTimeout(function () {
    if (!mainMap) return;
    mainMap.invalidateSize();
    L.marker([-37.0682, -56.8241], { icon: L.divIcon({ className: '', html: '<span class="pin-sos">SOS</span>', iconSize: [40, 40], iconAnchor: [20, 20] }) })
      .addTo(mainMap)
      .bindPopup('<div class="pop"><span class="eyebrow">Baliza activa</span><strong>Tu SOS</strong><p>El auxilio de la guardería sale hacia tu punto (simulado).</p></div>')
      .openPopup();
    mainMap.flyTo([-37.0682, -56.8241], 15);
  }, 160);
  quickAction('Baliza SOS activada en el mapa');
}

export function postWazeAlert(txt, lat, lng) {
  closeModal('report-modal');
  switchTab('mapa');
  setTimeout(function () {
    if (!mainMap) return;
    mainMap.invalidateSize();
    L.marker([lat, lng], { icon: L.divIcon({ className: '', html: '<span class="pin-alert">!</span>', iconSize: [34, 34], iconAnchor: [17, 17] }) })
      .addTo(mainMap)
      .bindPopup('<div class="pop"><span class="eyebrow">Alerta reciente</span><strong>' + esc(txt) + '</strong><p>Reportada por vos recién.</p></div>')
      .openPopup();
    mainMap.flyTo([lat, lng], 15);
  }, 160);
  quickAction('Alerta agregada al mapa del médano');
}
