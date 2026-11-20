// Padok MX (padok.pixelit.ar), la app de motocross del ecosistema. Intermédanos la promociona con
// estos datos, copiados del repo de Padok (src/data/fixtures.ts): si cambian allá, actualizarlos acá.
// Padok publica su contenido en /datos/*.json, pero hoy el sitio responde 403; cuando esté abierto,
// el Worker podría leerlo en /api/padok/... y este archivo dejaría de ser necesario.

export const PADOK_URL = 'https://padok.pixelit.ar';

// Próxima fecha del Enduro del Verano, que se corre a unos 20 km de la guardería
export const PADOK_EDV = {
  sede: 'Villa Gesell',
  desde: '2027-02-19',
  hasta: '2027-02-21',
  inscriptos: 612,
  categorias: ['Motos', 'Cuatriciclos', 'Enduro Damas'],
  distanciaKm: 20, // desde la guardería, en línea recta
  // Récord de la pista (12,5 km de arena y médanos vivos)
  recordPiloto: 'tomas-ferreyra',
  record: '4:12.104'
};

// Podio de Motos del Enduro del Verano 2026. Cada piloto abre su ficha en Padok (/pilotos/<slug>).
export const PADOK_PODIO = [
  { slug: 'tomas-ferreyra', nombre: 'Tomás Ferreyra', dorsal: 23, categoria: 'MX1 · Pro Open', provincia: 'Córdoba' },
  { slug: 'lucia-quiroga', nombre: 'Lucía Quiroga', dorsal: 7, categoria: 'MX2', provincia: 'Mendoza' },
  { slug: 'ezequiel-paz', nombre: 'Ezequiel Paz', dorsal: 41, categoria: 'Enduro', provincia: 'Neuquén' }
];
