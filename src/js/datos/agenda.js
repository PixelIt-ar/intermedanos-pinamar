// Agenda: eventos publicados por la agenda municipal de Pinamar (19 al 22 de noviembre) + salidas propias.
// Sin pinId = ubicación a confirmar (no está en el mapa todavía).
export const AGENDA_DAYS = { jue19: 'Jueves 19', vie20: 'Viernes 20', sab21: 'Sábado 21', dom22: 'Domingo 22' };
export const AGENDA_CATS = { musica: 'Música', cultura: 'Cultura', deporte: 'Deporte', offroad: 'Off-road' };
export const AGENDA_EVENTS = [
  { day: 'jue19', time: '19:00', title: 'El primer segundo: una fábula del tiempo', place: 'Biblioteca Popular Manuel Belgrano', cat: 'cultura', loc: 'pinamar', price: 'free', pinId: 'c1' },
  { day: 'jue19', time: '20:00', title: 'Tres Miradas', place: 'Sala Municipal de Exposiciones', cat: 'cultura', loc: 'pinamar', price: 'free' },
  { day: 'vie20', time: '18:00', title: 'Festival de la Música', place: 'La Piña · Av. Bunge y Blvd. Pioneros', cat: 'musica', loc: 'pinamar', price: 'free' },
  { day: 'vie20', time: '18:30', title: 'De Clásicos & Soundtrack', place: 'Punto de Encuentro', cat: 'musica', loc: 'pinamar', price: 'pay' },
  { day: 'vie20', time: '20:00', title: 'Concierto de Música Popular Argentina', place: 'Biblioteca Popular Manuel Belgrano', cat: 'musica', loc: 'pinamar', price: 'pay', pinId: 'c1' },
  { day: 'vie20', time: '21:00', title: 'Pipa Barbato', place: 'El Refugio Pinamar', cat: 'musica', loc: 'pinamar', price: 'pay' },
  { day: 'vie20', time: 'A conf.', title: 'Torneo de Patín Artístico', place: 'Polideportivo Municipal', cat: 'deporte', loc: 'ostende', price: 'free', pinId: 'x4' },
  { day: 'vie20', time: 'A conf.', title: 'Torneo Seven Pinamar', place: 'Polideportivo Pinamar', cat: 'deporte', loc: 'ostende', price: 'pay', pinId: 'x4' },
  { day: 'sab21', time: '08:00', title: 'Copa Bosques', place: 'Links Pinamar Golf', cat: 'deporte', loc: 'pinamar', price: 'pay' },
  { day: 'sab21', time: '09:00', title: 'Torneo Newcom Beach', place: 'Polideportivo Municipal', cat: 'deporte', loc: 'ostende', price: 'pay', pinId: 'x4' },
  { day: 'sab21', time: '18:00', title: 'Festival de la Música · segundo día', place: 'La Piña · Av. Bunge y Blvd. Pioneros', cat: 'musica', loc: 'pinamar', price: 'free' },
  { day: 'sab21', time: '21:00', title: 'Travesía nocturna guiada', place: 'Guardería Intermédanos · Corvina 2047', cat: 'offroad', loc: 'pinamar', price: '$45.000', pinId: 'g1', own: true },
  { day: 'sab21', time: '22:00', title: 'An Espil', place: 'Templeton Music Bar', cat: 'musica', loc: 'pinamar', price: 'free' },
  { day: 'sab21', time: '23:00', title: 'Adicta', place: 'El Refugio Pinamar', cat: 'musica', loc: 'pinamar', price: 'sobre' },
  { day: 'dom22', time: '18:00', title: 'Festival de la Música · cierre', place: 'La Piña · Av. Bunge y Blvd. Pioneros', cat: 'musica', loc: 'pinamar', price: 'free' },
  { day: 'dom22', time: 'A conf.', title: 'Torneo Seven Pinamar · finales', place: 'Polideportivo Pinamar', cat: 'deporte', loc: 'ostende', price: 'pay', pinId: 'x4' }
];
