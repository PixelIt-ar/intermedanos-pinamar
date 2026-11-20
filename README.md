# INTERMÉDANOS × PINAMAR — Súper-App & Hub Off-Road

**Ecosistema PIXEL.IT** (`Pixel Pagos / Wallet` · `Bera` · `Sauch` · `Padok MX` · `iSell Apple` · `Cerebro Hark`).

* **URL Live (Cloudflare Worker):** https://intermedanos-pinamar.pixelautomationar.workers.dev

## Módulos
1. **Guardería Intermédanos (Corvina 2047):** guardería, alquileres, lavados, service, traslados y ventas de cuatris y UTV (lunes a lunes, 9:30 a 20:30). Salida en la puerta con presión de arena (12/14/18 PSI), turnos para las dos travesías guiadas (Off road de 2 hs y Jornada completa) y baliza SOS en el mapa.
2. **Mapa propio sin salir de la web:** capa de calles oscura o satélite, el **Corredor Seguro** y todos los lugares de la guía agrupados con número. Los conteos se calculan desde los datos.
3. **Agenda:** eventos de cultura, música y deporte de Pinamar, con filtros por día, localidad y categoría, más las salidas propias.
4. **Guía:** balnearios, gastronomía, alojamiento, actividades, cultura y servicios de Pinamar, Ostende, Valeria del Mar y Cariló, cada uno con su pin.
5. **Feed de paradores y platos (Bera y Pixel Wallet):** likes, comentarios, guardados, reservas y armado de **Mi día**.
6. **Padok MX & Frontera Live:** ranking de pilotos y clínicas.
7. **Espacios comerciales:** fila de sponsors con logo, billboard con foto y tarjeta destacada en el feed.

## Código

```
src/pagina/    HTML en parciales: barra, una por pestaña, secciones de la portada, modales
src/estilos/   CSS por sección (index.css define el orden)
src/js/        módulos: datos/, base/ y modulos/ (mapa, agenda, guía, feed, reservas...)
src/worker.js  API (/api/health)
public/img/    fotos y logo
```

`scripts/build.mjs` junta todo en `dist/` y chequea que no falten íconos, funciones ni imports. Las fotos `st-*` son de referencia (Wikimedia Commons, con sus créditos en la app) hasta tener fotos propias.

## Desarrollo y despliegue
```bash
npm install
npm run dev      # servidor local en http://localhost:8787
npm run deploy   # arma dist/ y publica
```
