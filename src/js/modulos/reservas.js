// Reservas Bera, travesías, salidas en UTV y suscripción por WhatsApp (simuladas).

import { closeModal, openModal, quickAction } from '../base/ui.js';
import { addPlaceToMyDay } from './mi-dia.js';

export function openBeraBooking(place, priceLabel, pinId) {
  window.__beraCurrentPlace = place;
  window.__beraCurrentPinId = pinId || 'p1';
  document.getElementById('bera-modal-place').textContent = place;
  openModal('bera-modal');
}

export function confirmBeraReservation() {
  const time = document.getElementById('bera-time-select').value;
  const guests = document.getElementById('bera-guests-select').value;
  const sector = document.getElementById('bera-sector-select').value;
  closeModal('bera-modal');
  addPlaceToMyDay('Reserva Bera: ' + window.__beraCurrentPlace, guests + ' · ' + sector + ' · confirmado con Pixel Wallet', window.__beraCurrentPinId, time.split('·')[0].trim());
  quickAction('Reserva confirmada en ' + window.__beraCurrentPlace + ' (' + guests + ') y sumada a Mi día');
}

export function bookTravesia(name) {
  window.__utvContext = name;
  document.getElementById('utv-modal-eyebrow').textContent = 'Turno · ' + name;
  document.getElementById('utv-modal-title').textContent = 'Reservar turno';
  openModal('utv-modal');
}

export function resetUtvModal() {
  window.__utvContext = '';
  document.getElementById('utv-modal-eyebrow').textContent = 'Guardería Intermédanos · Corvina 2047';
  document.getElementById('utv-modal-title').textContent = 'Preparar vehículo';
}

export function pickSeg(groupId, btn, inputId, value) {
  document.querySelectorAll('#' + groupId + ' button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
  document.getElementById(inputId).value = value;
}

export function confirmUTVOrder() {
  const unit = document.getElementById('utv-unit-select').value;
  const hour = document.getElementById('utv-hour-select').value;
  const psi = document.getElementById('utv-psi-select').value;
  const ctx = window.__utvContext;
  closeModal('utv-modal');
  if (ctx) {
    addPlaceToMyDay(ctx, 'Turno pedido a la guardería · ' + unit, 'g1', hour.indexOf(':') > -1 ? hour : '15:00 hs');
    quickAction('Turno pedido: ' + ctx + ' · ' + hour);
  } else {
    quickAction('La guardería prepara ' + unit + ' para las ' + hour + ' (' + psi + ')');
  }
}

export function subscribeWhatsapp() {
  const inp = document.getElementById('wa-sub-input');
  if (!inp || !inp.value.trim()) { quickAction('Escribí tu número de WhatsApp'); return; }
  inp.value = '';
  quickAction('¡Listo! Te avisamos por WhatsApp (demo: el número no se guarda)');
}
