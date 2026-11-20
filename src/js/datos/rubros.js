// Rubros: nombre, ícono de línea, color sobre fondo claro y color del pin sobre el mapa oscuro
export const CATS = {
  parador: { label: 'Paradores', one: 'Parador', icon: 'umb', color: '#3F77B5', map: '#7FA8B4' },
  guarderia: { label: 'Guarderías', one: 'Guardería', icon: 'flag', color: '#B5532F', map: '#E6D5B8' },
  restaurante: { label: 'Restaurantes', one: 'Restó', icon: 'plate', color: '#B07A22', map: '#D3A266' },
  gomeria: { label: 'Gomerías 4x4', one: 'Gomería', icon: 'tire', color: '#5A6470', map: '#6E9BDB' },
  supermercado: { label: 'Súper', one: 'Súper', icon: 'cart', color: '#4F7D44', map: '#8DB083' },
  estacion: { label: 'Estaciones 24 h', one: 'Estación', icon: 'fuel', color: '#7A6A55', map: '#F2EFE8' },
  alojamiento: { label: 'Alojamiento', one: 'Alojamiento', icon: 'bed', color: '#2F6F73', map: '#5FC0B8' },
  actividad: { label: 'Actividades', one: 'Actividad', icon: 'wave', color: '#C07A1F', map: '#E8A84A' },
  cultura: { label: 'Cultura', one: 'Cultura', icon: 'art', color: '#7D5A86', map: '#C39BD3' },
  servicio: { label: 'Servicios e info útil', one: 'Servicio', icon: 'info', color: '#2F4F6F', map: '#E88E5A' }
};
export const CAT_ORDER = ['parador', 'guarderia', 'restaurante', 'gomeria', 'supermercado', 'estacion', 'alojamiento', 'actividad', 'cultura', 'servicio'];
export const LOC_LABEL = { pinamar: 'Pinamar', ostende: 'Ostende', valeria: 'Valeria', carilo: 'Cariló' };

export function inferLocalidad(addr) {
  const a = String(addr || '').toLowerCase();
  if (a.indexOf('valeria') > -1) return 'valeria';
  if (a.indexOf('cariló') > -1 || a.indexOf('carilo') > -1) return 'carilo';
  if (a.indexOf('ostende') > -1) return 'ostende';
  return 'pinamar';
}
