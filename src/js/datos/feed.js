// Feed de paradores, platos y experiencias. cat: PARADOR / GASTRO / OFFROAD (+ filtro SAVED)
// action: 'bera' (reserva), 'trav' (inscripción), 'pin' (mapa) o 'padok' (abre padokRuta en
// padok.pixelit.ar; esas tarjetas no tienen pin ni "+ mi día").
export const SOCIAL_GASTRO_FEED = [
  { id: 0, pinId: 'p2', cat: 'PARADOR', tag: 'PARADOR · SUNSET', author: 'Nómade · Luna Roja', photo: '/img/st-fogon2.webp', pos: '50% 60%', dishTitle: 'Fuegos a la leña y sunset acústico sobre el médano', likesCount: 2410, saved: true, price: 'Reservar deck (Bera)', cta: 'reserva bera', action: 'bera',
    commentsList: ['@sofi_ribeiro: El mejor atardecer de Pinamar Norte, la pesca a la leña es increíble.', '@lucho_utv: Dejás el Can-Am en el estacionamiento de arena y bajás directo al deck.'] },
  { id: 1, pinId: 'p1', cat: 'PARADOR', tag: 'PARADOR · LA FRONTERA', author: 'Kota Beach', photo: '/img/st-ceviche.webp', pos: '40% 50%', dishTitle: 'Tiradito de pesca fresca y cocktails frente al mar', likesCount: 1940, saved: true, price: 'Reservar con Bera', cta: 'reserva bera', action: 'bera',
    commentsList: ['@marcos_ktm: Llegamos por el Corredor Seguro en 10 min desde Intermédanos.', '@agus_pinamar: Los tragos de autor y las rabas al atardecer no fallan.'] },
  { id: 2, pinId: 'r1', cat: 'GASTRO', tag: 'PLATO · BERA', author: 'Tante Pinamar', photo: '/img/st-goulash.webp', pos: '50% 50%', dishTitle: 'Goulash con spätzle y el histórico strudel de manzana', likesCount: 3120, saved: false, price: 'Reservar mesa (Bera)', cta: 'mesa bera', action: 'bera',
    commentsList: ['@fede_enduro: El goulash después de 3 horas de médanos te devuelve el alma.', '@clari_alderete: El strudel tibio con crema y helado es patrimonio de Pinamar.'] },
  { id: 3, pinId: 'r3', cat: 'GASTRO', tag: 'PLATO · BERA', author: 'Paxapoga', photo: '/img/st-paella.webp', pos: '50% 50%', dishTitle: 'Paella asturiana, rabas crocantes y cazuelas de mar', likesCount: 1680, saved: false, price: 'Reservar con Bera', cta: 'reservar', action: 'bera',
    commentsList: ['@nico_4x4: Porciones gigantes para compartir en familia.'] },
  { id: 4, pinId: 'g1', cat: 'OFFROAD', tag: 'TRAVESÍA · PADOK MX', author: 'Travesía nocturna', photo: '/img/st-utv-bosque.webp', pos: '55% 60%', dishTitle: 'Guardería Intermédanos × Padok MX, con apoyo mecánico y cena de fuegos', likesCount: 2850, saved: true, price: 'Inscribirme ($45.000)', cta: '$45.000', action: 'trav',
    commentsList: ['@tomas_maverick: La mejor experiencia de Pinamar, vas súper seguro con el apoyo mecánico.'] },
  { id: 8, cat: 'OFFROAD', tag: 'NOVEDAD · PADOK MX', author: 'Padok MX', photo: '/img/st-cuatris.webp', pos: '60% 60%', dishTitle: 'Se abre la Cantera 2027: 14 marcas buscan pilotos de MX2 y Cuatriciclos para el Enduro del Verano', likesCount: 760, saved: false, cta: 'leer en padok', action: 'padok', padokRuta: '/novedades',
    commentsList: ['@mati_quad: Ya subí mi media kit, ojalá me llame alguna marca para Gesell.'] },
  { id: 5, pinId: 'p6', cat: 'PARADOR', tag: 'PARADOR · AFTER', author: 'UFO Point', photo: '/img/st-dj.webp', pos: '50% 40%', dishTitle: 'After beach electrónico, sushi y DJs al atardecer', likesCount: 2290, saved: false, price: 'Reservar con Bera', cta: 'reserva bera', action: 'bera',
    commentsList: ['@valen_dj: Increíble el sonido frente al mar a las 19 hs.'] },
  { id: 6, pinId: 'p3', cat: 'PARADOR', tag: 'PARADOR · LA FRONTERA', author: 'El Más Allá', photo: '/img/st-faro.webp', pos: '50% 50%', dishTitle: 'Parada clásica de las travesías de UTV y cuatris', likesCount: 980, saved: false, price: 'Ver en el mapa', cta: 'ver pin', action: 'pin',
    commentsList: ['@vale_cuatri: Paramos siempre a hidratar antes de La Olla.'] },
  { id: 7, pinId: 'r4', cat: 'GASTRO', tag: 'PARRILLA · BERA', author: 'Estilo Criollo', photo: '/img/st-asado.webp', pos: '50% 60%', dishTitle: 'Cortes a las brasas, entraña y empanadas fritas', likesCount: 1210, saved: false, price: 'Reservar con Bera', cta: 'reservar', action: 'bera',
    commentsList: ['@juanma_4x4: La entraña es de otro planeta.'] }
];
