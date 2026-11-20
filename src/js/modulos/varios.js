// Sponsors, plan por voz (Hark), ingreso simulado y créditos de las fotos.

import { PHOTO_CREDITS } from '../datos/creditos.js';
import { closeModal, openModal, quickAction } from '../base/ui.js';
import { esc } from '../base/utils.js';
import { addPlaceToMyDay } from './mi-dia.js';
import { openBeraBooking } from './reservas.js';

export function openSponsorDetail(title, body, ctaText) {
  document.getElementById('story-modal-title').textContent = title;
  document.getElementById('story-modal-body').textContent = body;
  document.getElementById('story-modal-cta').textContent = ctaText;
  openModal('story-modal');
}

export function executeHarkVoicePlan() {
  closeModal('hark-modal');
  addPlaceToMyDay('Salida en UTV pedida por voz', 'Can-Am en la puerta a las 15:00 con 14 PSI', 'g1', '15:00 hs');
  openBeraBooking('Kota Beach', 'Reserva por voz', 'p1');
}

export function signInUser(provider) {
  closeModal('login-modal');
  document.getElementById('top-auth-label').textContent = 'invitado';
  quickAction('Sesión de demo iniciada con ' + provider);
}

export function renderCredits() {
  const box = document.getElementById('credits-list');
  if (!box) return;
  box.innerHTML = PHOTO_CREDITS.map(function (c) {
    return '<li><b>' + esc(c.what) + ' · ' + esc(c.where) + '</b><a href="' + esc(c.page) + '" target="_blank" rel="noopener">' + esc(c.artist || 'Autor en Wikimedia Commons') + '</a> · ' + esc(c.lic) + '</li>';
  }).join('');
}
