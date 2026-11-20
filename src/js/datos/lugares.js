// Lugares del mapa y de la guía: la única fuente de verdad.
// Los conteos de la página ("59 lugares", "14 paradores"...) se calculan de acá.

import { inferLocalidad } from './rubros.js';

export const FULL_GUIA_DATA = [
  // 6 GUARDERÍAS
  { id: 'g1', cat: 'guarderia', icon: '🏁', color: '#E07A5F', lat: -37.0992, lng: -56.8688, badge: 'GUARDERÍA · SEDE CORVINA', name: 'Guardería Intermédanos (Sede Corvina)', addr: 'De la Corvina 2047, Pinamar', info: 'Guardería, alquileres, lavados, service, traslados y ventas de cuatris y UTV. Lunes a lunes de 9:30 a 20:30.' },
  { id: 'g2', cat: 'guarderia', icon: '🏁', color: '#E07A5F', lat: -37.1072, lng: -56.8742, badge: 'GUARDERÍA · SEDE CONSTITUCIÓN', name: 'Guardería Intermédanos (Sede Constitución)', addr: 'Av. Constitución 2243, Pinamar', info: 'Recepción rápida sobre avenida principal, boxes cubiertos y logística puerta a puerta.' },
  { id: 'g3', cat: 'guarderia', icon: '🏁', color: '#C86247', lat: -37.1035, lng: -56.8665, badge: 'GUARDERÍA & REPUESTOS', name: 'Botto ATV', addr: 'De las Medusas 1475, Pinamar', info: 'Guarda de UTV/ATV, venta de accesorios e indumentaria off-road.' },
  { id: 'g4', cat: 'guarderia', icon: '🏁', color: '#C86247', lat: -37.1018, lng: -56.8672, badge: 'GUARDERÍA', name: 'Guardería HPS', addr: 'Del Pejerrey 1450, Pinamar', info: 'Guarda cubierta de vehículos todo terreno y trailers.' },
  { id: 'g5', cat: 'guarderia', icon: '🏁', color: '#C86247', lat: -37.1105, lng: -56.8650, badge: 'GUARDERÍA', name: 'Guardería CMC', addr: 'Júpiter 959, Pinamar', info: 'Resguardo de cuatriciclos, motos de enduro y embarcaciones.' },
  { id: 'g6', cat: 'guarderia', icon: '🏁', color: '#C86247', lat: -37.1360, lng: -56.8855, badge: 'GUARDERÍA 24 HS', name: 'Candado Náutico & Off-Road', addr: 'Juan Díaz de Solís 2436, Valeria del Mar', info: 'Guarda monitoreada 24 hs para UTVs y motos de agua.' },

  // 12 PARADORES
  { id: 'p1', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.0612, lng: -56.8140, badge: 'PARADOR · LA FRONTERA', name: 'Kota Beach', addr: 'La Frontera Norte, Pinamar', info: 'Final del Corredor Seguro · Sunset DJ Set, gastronomía Bera y parking UTV.' },
  { id: 'p2', cat: 'parador', icon: '🌅', color: '#10B981', lat: -37.0795, lng: -56.8325, badge: 'PARADOR · PINAMAR NORTE', name: 'Nómade · Luna Roja Sunset Deck', addr: 'Av. del Mar y Olimpo, Pinamar Norte', info: 'Estética madera cruda, fuegos a la leña y atardeceres sobre el médano.' },
  { id: 'p3', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.0555, lng: -56.8090, badge: 'PARADOR · LA FRONTERA', name: 'El Más Allá', addr: 'La Frontera Norte, Pinamar', info: 'Parada clásica de travesías de UTVs y cuatris de Guardería Intermédanos.' },
  { id: 'p4', cat: 'parador', icon: '🌿', color: '#10B981', lat: -37.0510, lng: -56.8045, badge: 'PARADOR · ECO REFUGIO', name: 'La Deriva (Refugio Natural)', addr: 'Límite La Frontera Norte, Pinamar', info: 'Maderas sustentables, energía solar y cocina natural.' },
  { id: 'p5', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.0465, lng: -56.8005, badge: 'PARADOR · EXTREMO NORTE', name: 'El Límite', addr: 'Extremo Norte La Frontera, Pinamar', info: 'Dunas altas y playa abierta en el límite norte.' },
  { id: 'p6', cat: 'parador', icon: '🎶', color: '#10B981', lat: -37.0975, lng: -56.8435, badge: 'PARADOR · AFTER BEACH', name: 'UFO Point', addr: 'Av. del Mar y Tobías, Pinamar', info: 'El clásico de música electrónica, DJs al atardecer y sushi.' },
  { id: 'p7', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.0920, lng: -56.8398, badge: 'PARADOR · COCINA AUTOR', name: 'Rada Beach', addr: 'Av. del Mar y Odisea, Pinamar', info: 'Alta gastronomía de playa y carpas exclusivas.' },
  { id: 'p8', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.1055, lng: -56.8495, badge: 'PARADOR · TRADICIONAL', name: 'CR Club de Playa', addr: 'Av. del Mar y De las Acacias, Pinamar', info: 'Club de playa familiar, piscina y restaurante.' },
  { id: 'p9', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.1008, lng: -56.8458, badge: 'PARADOR · BOUTIQUE', name: 'Fedras Beach', addr: 'Av. del Mar y De las Sirenas, Pinamar', info: 'Ambiente relajado, decks de madera y tragos.' },
  { id: 'p10', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.1145, lng: -56.8552, badge: 'PARADOR · CENTRO', name: 'El Atlántico', addr: 'Av. del Mar y Av. Bunge, Pinamar', info: 'Ubicación central histórica frente al mar.' },
  { id: 'p11', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.1110, lng: -56.8528, badge: 'PARADOR · SHOWS', name: 'Cocodrilo Beach', addr: 'Av. del Mar y De las Toninas, Pinamar', info: 'Shows en vivo, barra de playa y eventos.' },
  { id: 'p12', cat: 'parador', icon: '🏖️', color: '#10B981', lat: -37.1190, lng: -56.8588, badge: 'PARADOR · DEPORTIVO', name: 'Botavara', addr: 'Av. del Mar y Del Tuyú, Pinamar', info: 'Surf, vóley de playa y licuados naturales.' },

  // 9 RESTAURANTES
  { id: 'r1', cat: 'restaurante', icon: '🍽️', color: '#D9A760', lat: -37.1088, lng: -56.8602, badge: 'CLÁSICO · BERA', name: 'Tante Pinamar', addr: 'Av. de las Artes 35, Pinamar', info: 'Goulash con spätzle, lomitos, strudel de manzana y repostería centroeuropea.' },
  { id: 'r2', cat: 'restaurante', icon: '🍝', color: '#D9A760', lat: -37.1128, lng: -56.8632, badge: 'BODEGÓN & PASTAS', name: 'Sociedad Italiana', addr: 'Eneas 200, Pinamar', info: 'Pastas caseras, minestrone, mariscos y flan mixto casero.' },
  { id: 'r3', cat: 'restaurante', icon: '🥘', color: '#D9A760', lat: -37.1135, lng: -56.8580, badge: 'PAELLA & MARISCOS', name: 'Paxapoga', addr: 'Av. Bunge y Av. del Libertador, Pinamar', info: 'Histórica paella asturiana, rabas y cazuelas de mar.' },
  { id: 'r4', cat: 'restaurante', icon: '🥩', color: '#D9A760', lat: -37.1102, lng: -56.8615, badge: 'PARRILLA ARGENTINA', name: 'Estilo Criollo', addr: 'Av. Arquitecto Jorge Bunge 620, Pinamar', info: 'Cortes a las brasas, entraña, ojo de bife y empanadas fritas.' },
  { id: 'r5', cat: 'restaurante', icon: '🍕', color: '#D9A760', lat: -37.1142, lng: -56.8565, badge: 'PIZZAS & BERA QR', name: 'Mattone', addr: 'Av. Jorge Bunge 48, Pinamar', info: 'Pizzas a la piedra y minutas en pleno centro.' },
  { id: 'r6', cat: 'restaurante', icon: '🍽️', color: '#D9A760', lat: -37.1392, lng: -56.8790, badge: 'CLÁSICO', name: 'El Alemán', addr: 'Av. Espora 1722, Valeria del Mar', info: 'Cocina centroeuropea, carnes y tortas.' },
  { id: 'r7', cat: 'restaurante', icon: '🍸', color: '#D9A760', lat: -37.1078, lng: -56.8590, badge: 'SUSHI & COCKTAILS', name: 'Negroni Pinamar', addr: 'Av. Bunge y De las Noctilucas, Pinamar', info: 'Tragos de autor, sushi, burgers y noche.' },
  { id: 'r8', cat: 'restaurante', icon: '🦐', color: '#D9A760', lat: -37.1045, lng: -56.8648, badge: 'PESCA FRESCA', name: 'La Gamba Restó', addr: 'De las Medusas 1250, Pinamar', info: 'Pescados del día, langostinos y cocina mediterránea.' },
  { id: 'r9', cat: 'restaurante', icon: '🍷', color: '#D9A760', lat: -37.1585, lng: -56.8980, badge: 'COCINA DE AUTOR', name: 'Demuru', addr: 'Castaño 274, Cariló / Pinamar', info: 'Alta gastronomía regional y cava de vinos.' },

  // 8 GOMERÍAS 4x4
  { id: 'm1', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1022, lng: -56.8705, badge: 'ESPECIALISTA UTV / 4x4', name: 'Neumáticos Carlitos', addr: 'Del Lenguado 1605, Pinamar', info: 'Destalonado en arena, parches y cubiertas off-road.' },
  { id: 'm2', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1095, lng: -56.8850, badge: 'OFICIAL MICHELIN', name: 'Gomería Arenas', addr: 'Ruta Provincial 11 Km 397.5, Pinamar', info: 'Alineación, balanceo y tren delantero para camionetas y trailers.' },
  { id: 'm3', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1112, lng: -56.8662, badge: 'ATENCIÓN RÁPIDA', name: 'Neumáticos Domi', addr: 'Júpiter 452, Pinamar', info: 'Calibración arena/ruta y vulcanizado a pasos de Constitución.' },
  { id: 'm4', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1040, lng: -56.8692, badge: 'MECÁNICA & GOMERÍA', name: 'Autocentro Pinamar', addr: 'Del Cangrejo 1525, Pinamar', info: 'Alineación, frenos, suspensión y auxilio.' },
  { id: 'm5', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1032, lng: -56.8712, badge: 'GOMERÍA', name: 'Gomería Tieri', addr: 'Del Cangrejo 1680, Pinamar', info: 'Reparación de llantas y cubiertas de cuatriciclos.' },
  { id: 'm6', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1130, lng: -56.8640, badge: 'CÉNTRICA', name: 'Gomería Blueink', addr: 'Júpiter 127, Pinamar', info: 'Ideal para inflar neumáticos al salir de la playa.' },
  { id: 'm7', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1028, lng: -56.8682, badge: 'GOMERÍA', name: 'Gomería Coti', addr: 'Del Lenguado 1401, Pinamar', info: 'Servicio para camionetas 4x4 y remolques.' },
  { id: 'm8', cat: 'gomeria', icon: '🛞', color: '#3B82F6', lat: -37.1025, lng: -56.8690, badge: 'AUXILIO', name: 'Gomería Los Melli', addr: 'Del Lenguado 1449, Pinamar', info: 'Atención rápida en temporada para vehículos de playa.' },

  // 7 SUPERMERCADOS
  { id: 's1', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.1082, lng: -56.8675, badge: 'CLAVE PRE-MÉDANOS', name: 'Supermercado San José', addr: 'Av. Constitución 1154, Pinamar', info: 'Paso obligado camino a Intermédanos y La Frontera para hielo, bebidas y carbón.' },
  { id: 's2', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.0865, lng: -56.8420, badge: 'PINAMAR NORTE', name: 'Abasto Norte', addr: 'Fragata Sarmiento 379, Pinamar', info: 'El supermercado más cercano a las casas del norte y La Frontera.' },
  { id: 's3', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.1310, lng: -56.8960, badge: 'HIPERMERCADO', name: 'Hipermercado COTO', addr: 'Ruta Provincial 11 Km 404, Pinamar', info: 'Compra grande de temporada y envíos a domicilio.' },
  { id: 's4', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.1118, lng: -56.8620, badge: 'CENTRO', name: 'Supermercado Disco', addr: 'De las Totoras y Rivadavia, Pinamar', info: 'Frescos, fiambrería y bodega.' },
  { id: 's5', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.1058, lng: -56.8722, badge: 'AV. INTERMÉDANOS', name: 'Cooperativa Obrera', addr: 'Av. Intermédanos 288, Pinamar', info: 'Ubicado sobre la avenida principal con amplio estacionamiento.' },
  { id: 's6', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.1120, lng: -56.8595, badge: 'BUNGE', name: 'Supermercado EGA', addr: 'Av. Jorge Bunge 388, Pinamar', info: 'Autoservicio clásico en el centro.' },
  { id: 's7', cat: 'supermercado', icon: '🛒', color: '#8B5CF6', lat: -37.1180, lng: -56.8890, badge: 'RUTA 11', name: 'Maxi Carrefour', addr: 'Ruta Provincial 11, Pinamar', info: 'Compras mayoristas y minoristas.' },

  // 5 ESTACIONES DE SERVICIO 24HS
  { id: 'e1', cat: 'estacion', icon: '⛽', color: '#EF4444', lat: -37.1065, lng: -56.8732, badge: 'A METROS DE GUARDERÍA', name: 'Puma Energy Intermédanos', addr: 'Av. Intermédanos esq. Av. Constitución, Pinamar', info: '24 hs · Carga de bidones homologados, aire y tienda antes de La Frontera.' },
  { id: 'e2', cat: 'estacion', icon: '⛽', color: '#EF4444', lat: -37.1085, lng: -56.8710, badge: 'V-POWER MOTO / UTV', name: 'Shell Pinamar', addr: 'Av. Intermédanos esq. Bunge, Pinamar', info: '24 hs · Combustible V-Power Nitro+ ideal para KTM/Honda de Padok y Can-Am.' },
  { id: 'e3', cat: 'estacion', icon: '⛽', color: '#EF4444', lat: -37.1090, lng: -56.8700, badge: '24 HORAS', name: 'AXION Energy', addr: 'Av. Bunge esq. Av. Intermédanos, Pinamar', info: 'Combustible Quantium, cajero automático y café.' },
  { id: 'e4', cat: 'estacion', icon: '⛽', color: '#EF4444', lat: -37.1100, lng: -56.8668, badge: 'ACA OFICIAL', name: 'YPF Full / ACA Pinamar', addr: 'Júpiter y Av. Constitución, Pinamar', info: '24 hs · Infinia, tienda Full y auxilio ACA.' },
  { id: 'e5', cat: 'estacion', icon: '⛽', color: '#EF4444', lat: -37.0980, lng: -56.8835, badge: 'ACCESO PINAMAR', name: 'YPF Ruta 11 y Ruta 74', addr: 'Rotonda Ruta 11 y Ruta 74, Pinamar', info: '24 hs · Punto de encuentro de caravanas y trailers.' },

  // BALNEARIOS DE OSTENDE Y VALERIA (coordenadas de OpenStreetMap)
  { id: 'p13', cat: 'parador', lat: -37.1329, lng: -56.8684, badge: 'BALNEARIO · OSTENDE', name: 'Balneario El Faro', addr: 'Estocolmo y la playa, Ostende', info: 'Balneario y restaurante en Ostende.' },
  { id: 'p14', cat: 'parador', lat: -37.1425, lng: -56.8751, badge: 'BALNEARIO · VALERIA DEL MAR', name: 'La Pérgola', addr: 'Comandante Py y la playa, Valeria del Mar', info: 'Balneario en Valeria del Mar.' },

  // ALOJAMIENTO (approx: ubicada por la calle, sin el número exacto)
  { id: 'a1', cat: 'alojamiento', approx: true, lat: -37.1169, lng: -56.8549, badge: 'HOTEL · 4 ESTRELLAS', name: 'Pinamar Beach Resort', addr: 'Av. del Mar 1102, Pinamar', info: 'Hotel frente al mar sobre la avenida costanera.' },

  // ACTIVIDADES
  { id: 'x1', cat: 'actividad', approx: true, lat: -37.1130, lng: -56.8880, badge: 'AVENTURA · VALERIA DEL MAR', name: 'Sector 400', addr: 'Ruta 11 km 398, Valeria del Mar', info: 'Paintball, canopy, bosque aéreo, mini golf y arquería. Todos los días de 14 a 19:30, con reserva previa.' },
  { id: 'x2', cat: 'actividad', approx: true, lat: -37.1666, lng: -56.9068, badge: 'AVENTURA · CARILÓ', name: 'Ecoparque Kalo', addr: 'Avellano 168, Cariló', info: 'Tirolesa, puentes aéreos y arquería en el bosque.' },
  { id: 'x4', cat: 'actividad', lat: -37.1123, lng: -56.8849, badge: 'DEPORTE · OSTENDE', name: 'Polideportivo Municipal', addr: 'Av. Intermédanos, Ostende', info: 'Torneos y escuelas deportivas municipales.' },

  // CULTURA
  { id: 'c1', cat: 'cultura', lat: -37.1095, lng: -56.8653, badge: 'CULTURA · BIBLIOTECA', name: 'Biblioteca Popular Manuel Belgrano', addr: 'De las Medusas 1230, Pinamar', info: 'Biblioteca con conciertos, charlas y obras.' },
  { id: 'c2', cat: 'cultura', lat: -37.1116, lng: -56.8642, badge: 'CULTURA · TEATRO', name: 'Teatro de la Torre', addr: 'Av. Constitución, Pinamar', info: 'Sala de teatro y espectáculos.' },

  // SERVICIOS E INFO ÚTIL
  { id: 'i1', cat: 'servicio', lat: -37.1100, lng: -56.8661, badge: 'SALUD · GUARDIA', name: 'Hospital Comunitario de Pinamar', addr: 'Av. Enrique Shaw, Pinamar', info: 'Guardia y atención médica. Emergencias médicas: 107.' },
  { id: 'i2', cat: 'servicio', approx: true, lat: -37.1052, lng: -56.8821, badge: 'ATENCIÓN AL TURISTA', name: 'Centro de atención al turista Pinamar', addr: 'Av. Bunge 2552, Pinamar', info: 'Todos los días de 11 a 18 hs · (02254) 48-2242.' },
  { id: 'i3', cat: 'servicio', approx: true, lat: -37.1404, lng: -56.8828, badge: 'ATENCIÓN AL TURISTA', name: 'Centro de atención al turista Valeria', addr: 'Av. Espora y Bathurst, Valeria del Mar', info: 'Todos los días de 11 a 18 hs · (02254) 49-4546.' },
  { id: 'i4', cat: 'servicio', approx: true, lat: -37.1658, lng: -56.8979, badge: 'ATENCIÓN AL TURISTA', name: 'Centro de atención al turista Cariló', addr: 'Av. Divisadero y Cerezo, Cariló', info: 'Fines de semana largos de 11 a 18 hs · (02254) 49-0231.' }
];

// Traza del Corredor Seguro (Guardería Intermédanos -> Pinamar Norte -> Kota Beach -> El Límite)
export const CORREDOR_SEGURO_COORDS = [
  [-37.0992, -56.8688],
  [-37.0920, -56.8540],
  [-37.0830, -56.8380],
  [-37.0795, -56.8325],
  [-37.0700, -56.8235],
  [-37.0612, -56.8140],
  [-37.0555, -56.8090],
  [-37.0465, -56.8005]
];
FULL_GUIA_DATA.forEach(function (p) { if (!p.localidad) p.localidad = inferLocalidad(p.addr); });
