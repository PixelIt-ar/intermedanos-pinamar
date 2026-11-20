// Worker de Intermédanos × Pinamar.
//
// La página, app.js, app.css y las fotos los sirve Cloudflare directo desde dist/ (Workers Static
// Assets) sin pasar por acá. A este código llegan solo las rutas que no son un archivo:
// - /api/...: la API. Hoy solo /api/health; los endpoints nuevos (reservas, turnos...) van acá.
// - cualquier otra ruta: devuelve la app, como antes.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true, app: 'intermedanos-pinamar', edition: 'rediseno-marfil-arena-salvia' });
    }
    if (url.pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'not_found' }, { status: 404 });
    }

    return env.ASSETS.fetch(new URL('/', url));
  },
};
