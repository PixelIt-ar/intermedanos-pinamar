# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

La súper-app "Intermédanos × Pinamar" (guardería de cuatris y UTV, travesías, agenda, mapa propio de Pinamar, Ostende, Valeria y Cariló, feed de paradores y platos, itinerario "Mi día", avisos de sponsors) publicada como Cloudflare Worker con Static Assets. Es una demo de front-end navegable: no hay backend real ni bindings de datos (KV/D1/R2); todo lo transaccional está simulado en el cliente.

URL en vivo: https://intermedanos-pinamar.pixelautomationar.workers.dev

## Comandos

```bash
npm install        # wrangler y esbuild
npm run build      # arma dist/ y corre los chequeos (wrangler lo hace solo antes de dev y deploy)
npm run dev        # wrangler dev — servidor local; vuelve a armar dist/ cuando cambia src/ o public/
npm run deploy     # wrangler deploy — publica directo en la URL workers.dev en vivo (no hay entorno de staging)
```

No hay tests ni linter. `npm run build` es el chequeo: falla si un ícono no existe, si una función que llama un `onclick` no está en `window`, si un módulo usa un nombre de otro sin importarlo o si hay ids repetidos. Lo demás (mapa, pestañas, modales) hay que probarlo en el navegador con `npm run dev`, a 390 px y a 1440 px de ancho.

## Estructura

```
src/
  worker.js          Worker: /api/health y futuras rutas /api/*; cualquier otra ruta devuelve la app
  pagina/            HTML: index.html (esqueleto + <head>) y los parciales que incluye
    iconos.html        sprite SVG
    barra.html, pie.html, dock.html
    pestanas/          una por pestaña (explorar.html incluye las secciones de explorar/)
    explorar/          secciones de la portada (portada, sponsors, rubros, imperdibles, guardería...)
    modales/           un archivo por modal
  estilos/           CSS: index.css importa las secciones en el orden de la cascada
    tokens.css         variables de color y modos (goma, salvia)
    explorar/, pestanas/   misma división que pagina/
  js/                JS del cliente en módulos ES
    main.js            entrada: window, delegación de clics y primer render
    datos/             lugares, rubros, feed, agenda, mi día, créditos de fotos
    base/              utils (esc, icon, búsquedas, conteos) y ui (pestañas, modales, avisos, tema)
    modulos/           mapa, filtros, guía, agenda, feed, mi día, reservas, varios
public/img/          fotos y logo (se copian tal cual)
scripts/build.mjs    arma dist/ y chequea
dist/                generado (no se commitea): index.html, app.js, app.css, img/
```

## Arquitectura

### Build y publicación

`scripts/build.mjs` reemplaza cada `<!-- incluir: ruta -->` de `src/pagina/` por ese archivo (rutas relativas a `src/pagina/`, pueden anidarse), empaqueta `src/js/main.js` en `dist/app.js` y `src/estilos/index.css` en `dist/app.css` con esbuild, y copia `public/`. `wrangler.jsonc` lo corre como build propio antes de dev y deploy. Cloudflare sirve `dist/` directo (la página en `/` es `dist/index.html`); al Worker solo llegan las rutas que no son un archivo. Los endpoints nuevos van en `src/worker.js` bajo `/api/`.

### JS del cliente

- Módulos ES con `import`/`export` explícitos; las dependencias circulares entre módulos están bien mientras nadie use un import al evaluarse el módulo (todo se usa adentro de funciones).
- **El markup usa `onclick="fn('x')"`**, y los módulos no crean globales: toda función que se llame desde un `on...=""` del HTML (o desde las cadenas `onclick` de los popups del mapa) tiene que estar en el `Object.assign(window, {...})` de `src/js/main.js`. El build avisa si falta.
- Los botones que arma el código usan `data-act="..."` + `data-id="..."` y los atiende el único `document.addEventListener('click', ...)` de `main.js`. Para una acción nueva de ese tipo, sumar un caso ahí.
- Los popups de Leaflet frenan la propagación del clic, así que sus botones llaman a `popupAct(tipo, índice)` (índice en `FULL_GUIA_DATA`).
- Todo texto que venga de datos o del usuario pasa por `esc()` antes de entrar a `innerHTML`.
- Los links a Padok MX (padok.pixelit.ar) son `<a data-padok="/ruta">` sin `href`: `renderPadok()` (`modulos/padok.js`) les pone la dirección con `padokUrl(ruta)` (suma `?ref=intermedanos`) y los abre en otra pestaña. El código que arma links usa `padokUrl()` directo. Siempre pestaña nueva: Mi día y las reservas viven en memoria y se perderían.
- Leaflet (`L`) es global: lo cargan los `<script>` del `<head>` en `src/pagina/index.html`.

### Modelo de datos del cliente (`src/js/datos/`)

Todo el estado es JS en memoria y se pierde al recargar. Lo transaccional (login, reserva Bera, turnos y salidas de UTV, SOS, alertas, publicidad, suscripción por WhatsApp) está simulado: muta un array o el DOM y muestra un aviso con `quickAction(msg)`. Un poco de estado compartido vive en `window.__*` (pin elegido, reserva en curso), inicializado en `main.js`.

- `FULL_GUIA_DATA` (`lugares.js`) — todos los lugares (hoy 59). Única fuente de verdad para los dos mapas, la lista del mapa, la leyenda y la Guía. El `id` es una letra de rubro más un número (`g` guardería, `p` parador, `r` restaurante, `m` gomería, `s` súper, `e` estación, `a` alojamiento, `x` actividad, `c` cultura, `i` servicios e info útil). `cat` es la clave de rubro de `CATS` (`rubros.js`: nombre, ícono y colores). `localidad` se deduce de `addr` con `inferLocalidad()`. `approx: true` marca lugares ubicados solo por la calle: la Guía y el mapa lo avisan.
- **Los conteos se calculan desde los datos.** Los elementos con `data-count="ALL"` o `data-count="<cat>"` los llena `renderCounts()`; los chips del mapa y de la Guía y la leyenda los arman `renderCategoryChips()` y `renderLegend()`. Agregar un lugar no obliga a tocar textos.
- `MY_TRIP_ITEMS` (Mi día), `SOCIAL_GASTRO_FEED` (feed) y `AGENDA_EVENTS` (agenda) apuntan a los lugares con `pinId`; en la agenda, sin `pinId` = ubicación a confirmar. El markup también tiene ids fijos (p. ej. `focusPinInsideOurWeb('g1', true)`), así que renombrar o quitar un id requiere buscar en `src/pagina/` y `src/js/`.
- El feed usa otras categorías, en mayúsculas (`PARADOR` / `GASTRO` / `OFFROAD`, más el filtro `SAVED`), sin relación con `cat`. Cada tarjeta tiene `action` (`bera`, `trav`, `pin` o `padok`) para su botón; las `padok` llevan `padokRuta` en vez de `pinId` y no muestran mapa ni "+ mi día".
- `padok.js` tiene los datos de Padok MX que se muestran acá (Enduro del Verano 2027 con su cuenta regresiva, podio 2026), copiados a mano del repo de Padok (`src/data/fixtures.ts`), porque sus `/datos/*.json` hoy responden 403. Si cambian allá, actualizarlos acá.
- `AGENDA_EVENTS` son los eventos que publicó la agenda municipal para el 19–22 de noviembre de 2026 más las salidas propias (`own: true`). Los días se filtran por las claves de `AGENDA_DAYS`.
- `PHOTO_CREDITS` lista autor y licencia de las fotos de referencia (Wikimedia Commons); se muestran en el modal "créditos de fotos" del pie. Si se cambia una foto, actualizar su crédito.
- Después de mutar datos hay que llamar al render correspondiente: `renderTimelines()`, `rerenderFeeds()`, `renderFullGuia()`, `renderAgenda()`, `populateMapMarkers(cat)`, `renderCounts()`.

### Mapas (`src/js/modulos/mapa.js`)

Dos instancias de Leaflet comparten los datos: `homeMap` (banda del mapa en Explorar) y `mainMap` (pestaña Mapa), con los marcadores en `markerByIdHome` / `markerByIdMain`, agrupados con Leaflet.markercluster (se separan a partir del zoom 16). Los tiles son de Google sin API key: `lyrs=m` con la clase `tiles-dark` (filtro CSS que lo vuelve oscuro) y `lyrs=y` satélite como alternativa. `CORREDOR_SEGURO_COORDS` es la línea verde del Corredor Seguro.

- La regla central del producto es que **nada saca al usuario hacia Google Maps** (los links a Padok MX son la única salida, y siempre en otra pestaña): toda acción de "ver en el mapa" llama a `focusPinInsideOurWeb(pinId, switchToFullMapTab)`, que marca el pin elegido (terracota), vuela hasta él en el mapa visible y abre su ficha.
- Los mapas están en pestañas que arrancan ocultas, así que Leaflet necesita `invalidateSize()` cuando la pestaña se hace visible; `switchTab` y los helpers lo hacen dentro de un `setTimeout` corto.

### Pestañas, modales y temas

- Las pestañas son `<section id="tab-<nombre>">` que `switchTab(nombre)` (`base/ui.js`) muestra u oculta con `.hidden-el`; la lista está fija en esa función (`discover`, `agenda`, `gastro`, `mapa`, `midia`, `padok`, `guia`). Una pestaña nueva necesita: su parcial en `src/pagina/pestanas/` incluido desde `index.html`, su CSS en `src/estilos/pestanas/` importado en `index.css`, una entrada en la lista de `switchTab`, un botón en `barra.html` (`data-tab`) y una entrada en `modales/menu.html`.
- El dock del celular (debajo de 1024 px) expone Inicio, Agenda, Mapa y Mi día; el resto está en el menú (ícono ☰ de la barra).
- La barra es fija y transparente sobre la portada (`body.at-hero`, lo maneja `updateTopState()` con el scroll).
- Los modales son `<div id="<nombre>-modal" class="modal hidden-el">` con un `.sheet` adentro (hoja inferior en el celular, panel centrado en escritorio), uno por archivo en `src/pagina/modales/`; se abren y cierran con `openModal(id)` / `closeModal(id)`. Cerrar `utv-modal` lo devuelve a "Preparar vehículo".
- CSS: el orden de los `@import` de `src/estilos/index.css` es el orden de la cascada; una sección nueva va en su lugar, no al final.
- El contenido va en `.wrap` (1280 px centrados). Lo que va de lado a lado (franja de Padok, billboard) queda fuera del `.wrap` y alinea su texto con un `.wrap` interno; la fila de imperdibles no usa `.wrap` y replica su margen izquierdo con padding, para llegar al borde derecho de la pantalla.
- Colores: custom properties `--solis-*` en `tokens.css`. `html[data-theme="social-dark"]` (modo noche, `toggleSolisTheme()`) y la clase `.franja-goma` (mapa, garage, hojas oscuras) los cambian al goma oscuro; `.franja-salvia` es el verde de la banda del mapa y el pie. Usar siempre las variables para que la UI funcione en los dos modos. `--solis-ladrillo` (#E66115) es el naranja del logo para rótulos y links. Los `--padok-*` (bengala #FF4F1A) y `--font-padok` (Chakra Petch) son la marca invitada: solo en lo que lleva a Padok MX.
- Íconos: sprite SVG en `src/pagina/iconos.html`; se usan con `<svg class="ic"><use href="#i-nombre"/></svg>` (o `icon('nombre')` en el JS). La interfaz no usa emojis.

### Dependencias externas en runtime

Se cargan desde CDNs: Leaflet 1.9.4 y Leaflet.markercluster 1.5.3 (unpkg), Google Fonts (Jost, Manrope, JetBrains Mono, Chakra Petch) y los tiles de Google. Las fotos son locales (`public/img`): `st-*` son fotos de referencia de Wikimedia Commons hasta tener propias, `pk-*` vienen de Padok MX (también de Commons), `ig-*` son el logo y fotos del Instagram de la guardería, `px-logo` es el logo de Pixel IT de la firma del pie (sale de `landing-pixelit/public/logo-512.png`).

## Convenciones

- Todo el texto visible está en español rioplatense con voseo ("Descubrí", "Reservá", "Tocá"), con nombres de marcas socias del ecosistema PIXEL.IT (Bera, Pixel Wallet, Sauch, Padok MX, Hark, iSell). Títulos en Jost fina y mayúsculas; datos (horarios, presión, precios) en JetBrains Mono.
- Datos reales de la guardería (de su Instagram): guardería, alquileres, lavados, service, traslados y ventas; lunes a lunes de 9:30 a 20:30; Corvina 2047; tel. 2254 513221; WhatsApp 11 3849-9989. No volver a prometer "24/7".
