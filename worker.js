// ============================================================================
// INTERMÉDANOS × PINAMAR SUPER-APP — MAPA MULTIPUNTO INTEGRADO (47 PINS EN VIVO)
// - "No quiero salir de mi web para ver todos los puntos en Google Maps":
//   * Motor cartográfico interactivo integrado 100% DENTRO de nuestra web usando
//     capas reales de Google Maps Híbrido/Satélite (mt1.google.com/vt/lyrs=y) y
//     Google Maps Calles (lyrs=m) + Leaflet JS.
//   * Los 47 puntos verificados de Pinamar (12 Paradores, 6 Guarderías, 9 Restos,
//     8 Gomerías 4x4, 7 Supermercados y 5 Estaciones 24hs) + la traza verde brillante
//     del Corredor Seguro están TODOS dibujados al mismo tiempo dentro del mapa de
//     nuestra página con pines personalizados por rubro.
//   * Ningún botón te saca de la web: tocar "📍 Ver en nuestro Mapa" en cualquier
//     tarjeta, historia, itinerario o guía hace zoom suave (flyTo) al pin dentro de
//     nuestra propia página y abre su tarjeta interactiva con Reserva Bera.
// - Incluye los Banners Comerciales estilo Tucán News listos para vender.
// ============================================================================

const HTML_APP = `<!DOCTYPE html>
<html lang="es" data-theme="solis-light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>INTERMÉDANOS · Pinamar & La Frontera — Super-App</title>
  <meta name="description" content="Descubrí Pinamar sin salir de la app: Mapa Satelital Multipunto con los 47 lugares, Guardería Intermédanos, Corredor Seguro, Gastro Bera y Padok MX." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
  <style>
    :root {
      --solis-ivory: #F8F6F1;
      --solis-cream: #F1ECE1;
      --solis-card: #FFFFFF;
      --solis-sand: #E6DEC8;
      --solis-terracotta: #E07A5F;
      --solis-terracotta-dark: #C86247;
      --solis-charcoal: #2C2E33;
      --solis-muted: #6E6A63;
      --solis-subtle: #9A948A;
      --solis-seablue: #7CA7B7;
      --solis-seadeep: #1D4E56;
      --solis-emerald: #10B981;
      --solis-ochre: #D9A760;
      --border: rgba(44, 46, 51, 0.09);
      --border-strong: rgba(44, 46, 51, 0.16);
      --shadow-soft: 0 12px 32px -8px rgba(44, 46, 51, 0.07), 0 4px 12px -2px rgba(44, 46, 51, 0.04);
      --shadow-float: 0 22px 48px -12px rgba(44, 46, 51, 0.16);
      --glass-dock: rgba(255, 255, 255, 0.94);
      --font-serif: "Cormorant Garamond", Georgia, serif;
      --font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: "JetBrains Mono", monospace;
    }

    html[data-theme="social-dark"] {
      --solis-ivory: #0F1419;
      --solis-cream: #161D24;
      --solis-card: #1C252E;
      --solis-sand: #26323D;
      --solis-charcoal: #F5F3EE;
      --solis-muted: #A9B4BE;
      --solis-subtle: #788591;
      --border: rgba(255, 255, 255, 0.09);
      --border-strong: rgba(255, 255, 255, 0.18);
      --glass-dock: rgba(22, 29, 36, 0.94);
      --shadow-soft: 0 14px 36px rgba(0, 0, 0, 0.45);
      --shadow-float: 0 20px 48px rgba(0, 0, 0, 0.65);
    }

    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
      background-color: var(--solis-ivory);
      color: var(--solis-charcoal);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      scroll-behavior: smooth;
    }
    body { padding-bottom: 106px; }
    @media (min-width: 1024px) {
      body {
        padding-bottom: 48px;
        background-image:
          radial-gradient(circle at 12% 8%, rgba(224, 122, 95, 0.08), transparent 32%),
          radial-gradient(circle at 88% 14%, rgba(124, 167, 183, 0.12), transparent 36%);
      }
    }
    .serif-solis { font-family: var(--font-serif); letter-spacing: -0.01em; }

    /* 1. TOP BAR MINIMALISTA ESTILO SOLIS */
    .solis-topbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--glass-dock);
      -webkit-backdrop-filter: blur(18px);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
      width: 100%;
    }
    .solis-topbar__inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    @media (min-width: 1024px) {
      .solis-topbar__inner { padding: 14px 32px; }
    }
    .solis-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--solis-charcoal);
      cursor: pointer;
      min-width: 0;
    }
    .solis-brand__badge {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--solis-terracotta);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 19px;
      box-shadow: 0 6px 16px rgba(224, 122, 95, 0.35);
      flex: none;
    }
    .solis-brand__title {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 21px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1;
      display: block;
    }
    .solis-brand__sub {
      display: block;
      font-family: var(--font-sans);
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--solis-terracotta);
      margin-top: 2px;
    }

    .desktop-nav {
      display: none;
      align-items: center;
      gap: 6px;
      background: var(--solis-cream);
      padding: 5px;
      border-radius: 999px;
      border: 1px solid var(--border);
    }
    @media (min-width: 1024px) {
      .desktop-nav { display: flex; }
    }
    .desktop-nav__btn {
      padding: 9px 16px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: var(--solis-muted);
      font: 600 13px/1 var(--font-sans);
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .desktop-nav__btn:hover { color: var(--solis-charcoal); }
    .desktop-nav__btn.is-active {
      background: var(--solis-terracotta);
      color: #fff;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(224, 122, 95, 0.3);
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: none;
    }
    .circle-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid var(--border-strong);
      background: var(--solis-card);
      color: var(--solis-charcoal);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.15s ease, background 0.2s ease;
      flex: none;
    }
    .circle-btn:hover { transform: translateY(-1px); background: var(--solis-cream); }

    .terracotta-pill-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 10px 18px;
      border-radius: 999px;
      border: none;
      background: var(--solis-terracotta);
      color: #fff;
      font: 700 13px/1 var(--font-sans);
      cursor: pointer;
      box-shadow: 0 8px 20px -4px rgba(224, 122, 95, 0.45);
      transition: all 0.2s ease;
      white-space: nowrap;
      text-decoration: none;
    }
    .terracotta-pill-btn:hover {
      background: var(--solis-terracotta-dark);
      transform: translateY(-1px);
    }

    .maps-pill-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 9px 14px;
      border-radius: 999px;
      border: 1px solid var(--border-strong);
      background: var(--solis-ivory);
      color: var(--solis-charcoal);
      font: 700 12px/1 var(--font-sans);
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      text-decoration: none;
    }
    .maps-pill-btn:hover {
      border-color: var(--solis-terracotta);
      color: var(--solis-terracotta);
      transform: translateY(-1px);
    }

    /* 2. SISTEMA DE BANNERS COMERCIALES ESTILO "TUCÁN NEWS" */
    .tucan-ad-shell {
      max-width: 1400px;
      margin: 0 auto;
      padding: 12px 16px 4px;
    }
    @media (min-width: 1024px) {
      .tucan-ad-shell { padding: 16px 32px 6px; }
    }
    .tucan-ad-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      gap: 8px;
    }
    .tucan-ad-label {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--solis-subtle);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .tucan-sell-pill {
      font-size: 10.5px;
      font-weight: 800;
      color: var(--solis-terracotta);
      background: rgba(224, 122, 95, 0.12);
      border: 1px solid rgba(224, 122, 95, 0.3);
      padding: 4px 10px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .tucan-sell-pill:hover {
      background: var(--solis-terracotta);
      color: #fff;
    }

    .tucan-leaderboard-strip {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 10px;
    }
    @media (min-width: 768px) {
      .tucan-leaderboard-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1140px) {
      .tucan-leaderboard-strip { grid-template-columns: 1.25fr 1.25fr 1fr; gap: 14px; }
    }

    .tucan-banner-card {
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      border: 1px solid var(--border-strong);
      box-shadow: var(--shadow-soft);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      min-width: 0;
    }
    .tucan-banner-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-float);
    }
    .tucan-banner-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 6px;
      margin-bottom: 4px;
    }

    .tucan-billboard {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      margin: 26px 0;
      padding: 24px 22px;
      background:
        linear-gradient(95deg, rgba(20, 26, 32, 0.94) 0%, rgba(20, 26, 32, 0.80) 52%, rgba(20, 26, 32, 0.35) 100%),
        url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1500&q=85') center/cover no-repeat;
      color: #FAF6F0;
      border: 1px solid var(--border-strong);
      box-shadow: var(--shadow-float);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }
    @media (min-width: 1024px) {
      .tucan-billboard { padding: 32px 36px; }
    }

    /* 3. GRILLA DESKTOP "SOLIS 3-SCREENS SHOWCASE" */
    .app-shell {
      max-width: 1400px;
      margin: 0 auto;
      padding: 8px 16px 32px;
    }
    @media (min-width: 1024px) {
      .app-shell { padding: 12px 32px 48px; }
    }

    .solis-hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }
    @media (min-width: 1024px) {
      .solis-hero-grid {
        grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.93fr) minmax(0, 0.95fr);
        gap: 24px;
        align-items: stretch;
      }
    }

    .solis-two-col-desktop {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
    }
    @media (min-width: 1024px) {
      .solis-two-col-desktop {
        grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
        gap: 24px;
      }
    }

    .solis-cover-card {
      position: relative;
      border-radius: 30px;
      overflow: hidden;
      min-height: 430px;
      padding: 26px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: var(--shadow-float);
      border: 1px solid var(--border);
      background:
        linear-gradient(180deg, rgba(248, 246, 241, 0.95) 0%, rgba(248, 246, 241, 0.80) 40%, rgba(28, 32, 38, 0.55) 75%, rgba(28, 32, 38, 0.90) 100%),
        url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85') center/cover no-repeat;
      color: #2C2E33;
    }
    @media (min-width: 1024px) {
      .solis-cover-card { padding: 36px 32px; min-height: 540px; }
    }
    .solis-eyebrow {
      font: 700 10px/1.2 var(--font-sans);
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #6E5A49;
      display: block;
      margin-bottom: 8px;
    }
    .solis-hero-h1 {
      font-family: var(--font-serif);
      font-weight: 600;
      font-size: clamp(36px, 5vw, 56px);
      line-height: 0.96;
      margin: 0 0 12px;
      color: #2C2E33;
    }
    .solis-hero-sub {
      font-size: 14px;
      line-height: 1.5;
      color: #4E4A44;
      max-width: 42ch;
      margin: 0 0 18px;
    }

    .solis-searchbar {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(44, 46, 51, 0.14);
      border-radius: 999px;
      padding: 6px 8px 6px 14px;
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.08);
      width: 100%;
    }
    .solis-searchbar input {
      flex: 1 1;
      min-width: 0;
      border: none;
      background: transparent;
      outline: none;
      font: 500 13px var(--font-sans);
      color: #2C2E33;
    }

    .next-adventure-pill {
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(14px);
      border-radius: 22px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.22);
      margin-top: 22px;
    }

    .mood-and-map-stack {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      min-width: 0;
    }
    .solis-panel {
      background: var(--solis-card);
      border: 1px solid var(--border);
      border-radius: 28px;
      padding: 20px;
      box-shadow: var(--shadow-soft);
      min-width: 0;
    }
    @media (min-width: 1024px) {
      .solis-panel { padding: 24px; }
    }
    .panel-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .panel-title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      color: var(--solis-charcoal);
    }
    .panel-link {
      font-size: 12px;
      font-weight: 700;
      color: var(--solis-terracotta);
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }
    .panel-link:hover { text-decoration: underline; }

    .mood-row {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 8px;
      text-align: center;
    }
    .mood-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      color: var(--solis-charcoal);
      min-width: 0;
    }
    .mood-circle {
      width: 58px;
      height: 58px;
      border-radius: 20px;
      background-size: cover;
      background-position: center;
      border: 2px solid var(--solis-terracotta);
      box-shadow: 0 6px 14px rgba(224, 122, 95, 0.20);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--solis-cream);
      transition: transform 0.2s ease;
    }
    .mood-item:hover .mood-circle { transform: translateY(-3px) scale(1.05); }
    .mood-name {
      font-size: 11px;
      font-weight: 700;
      color: var(--solis-charcoal);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    .explore-nearby-card {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      background: linear-gradient(125deg, #17362A 0%, #1F4B43 52%, #2B6762 100%);
      color: #FAF6F0;
      padding: 20px;
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      gap: 12px;
      align-items: center;
      cursor: pointer;
      box-shadow: var(--shadow-soft);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .explore-nearby-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-float);
    }

    .saved-mini-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      border-radius: 18px;
      background: var(--solis-ivory);
      border: 1px solid var(--border);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .saved-mini-card:hover {
      border-color: var(--solis-terracotta);
      transform: translateX(3px);
    }
    .saved-mini-thumb {
      width: 64px;
      height: 54px;
      border-radius: 12px;
      background-size: cover;
      background-position: center;
      flex: none;
    }

    /* 4. SECCIÓN GASTRONÓMICA & SOCIAL FEED */
    .solis-pills {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 6px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .solis-pills::-webkit-scrollbar { display: none; }
    .solis-pill {
      padding: 9px 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--solis-cream);
      color: var(--solis-muted);
      font: 600 12.5px/1 var(--font-sans);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      flex: none;
    }
    .solis-pill:hover { border-color: var(--solis-terracotta); }
    .solis-pill.is-active {
      background: var(--solis-terracotta);
      border-color: var(--solis-terracotta);
      color: #fff;
      font-weight: 700;
    }

    .gastro-social-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
      margin-top: 18px;
    }
    @media (min-width: 768px) {
      .gastro-social-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (min-width: 1140px) {
      .gastro-social-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
    }
    .social-gastro-card {
      background: var(--solis-card);
      border: 1px solid var(--border);
      border-radius: 26px;
      overflow: hidden;
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      min-width: 0;
    }
    .social-gastro-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-float);
    }
    .social-gastro-card__media {
      position: relative;
      height: 225px;
      background-size: cover;
      background-position: center;
      padding: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .social-gastro-card__media::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.28) 0%, transparent 40%, rgba(0,0,0,0.72) 100%);
      pointer-events: none;
    }
    .media-top-row, .media-bottom-row {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .tag-chip {
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(28, 32, 38, 0.76);
      backdrop-filter: blur(8px);
      color: #fff;
      font: 700 10.5px/1 var(--font-sans);
      letter-spacing: 0.04em;
    }
    .heart-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      border: none;
      color: var(--solis-terracotta);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.15s ease;
    }
    .heart-btn:hover { transform: scale(1.1); }
    .social-gastro-card__body {
      padding: 18px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 11px;
    }
    .author-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .author-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--solis-cream);
      border: 1.5px solid var(--solis-terracotta);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      flex: none;
    }
    .social-metrics {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid var(--border);
      font-size: 12.5px;
      color: var(--solis-muted);
    }

    /* 5. TIMELINE "MI DÍA EN PINAMAR" */
    .timeline-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 14px 0;
    }
    .timeline-step {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 13px;
      border-radius: 18px;
      background: var(--solis-ivory);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: border-color 0.2s ease, transform 0.15s ease;
      width: 100%;
      text-align: left;
    }
    .timeline-step:hover {
      border-color: var(--solis-terracotta);
      transform: translateX(3px);
    }
    .timeline-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--solis-card);
      border: 1px solid var(--border-strong);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex: none;
    }

    /* 6. DOCK FLOTANTE INFERIOR BLANCO ESTILO SOLIS (SOLO MOBILE & TABLET) */
    .solis-floating-dock {
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      background: var(--glass-dock);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 4px;
      width: calc(100vw - 24px);
      max-width: 450px;
      box-shadow: 0 18px 42px rgba(44, 46, 51, 0.22);
    }
    @media (min-width: 1024px) {
      .solis-floating-dock { display: none; }
    }
    .dock-item {
      flex: 1 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 6px 2px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: var(--solis-subtle);
      font: 600 10px/1 var(--font-sans);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .dock-item.is-active {
      color: var(--solis-terracotta);
      font-weight: 800;
    }
    .dock-plus-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: var(--solis-terracotta);
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(224, 122, 95, 0.45);
      flex: none;
    }

    /* ESTILOS DEL MAPA MULTIPUNTO INTEGRADO EN NUESTRA WEB */
    .inapp-map-canvas {
      width: 100%;
      height: 430px;
      border-radius: 22px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.2);
      background: #132C22;
      z-index: 1;
    }
    @media (min-width: 1024px) {
      .inapp-map-canvas { height: 540px; }
    }
    .pin-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 2.5px solid #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,0.45);
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .pin-marker:hover { transform: scale(1.18); }
    .leaflet-popup-content-wrapper {
      border-radius: 18px !important;
      padding: 4px !important;
      font-family: var(--font-sans) !important;
      box-shadow: 0 16px 36px rgba(0,0,0,0.3) !important;
    }

    .corridor-glow { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.85)); }
    .hidden-el { display: none !important; }
  </style>
</head>
<body>

  <!-- 1. TOP BAR MINIMALISTA ESTILO SOLIS -->
  <header class="solis-topbar">
    <div class="solis-topbar__inner">
      <div class="solis-brand" onclick="switchTab('discover')">
        <span class="solis-brand__badge">IM</span>
        <div>
          <span class="solis-brand__title">INTERMÉDANOS</span>
          <span class="solis-brand__sub">PINAMAR · LA FRONTERA · HUB</span>
        </div>
      </div>

      <nav class="desktop-nav">
        <button class="desktop-nav__btn is-active" data-tab="discover" onclick="switchTab('discover')">🌅 Explorar Pinamar</button>
        <button class="desktop-nav__btn" data-tab="gastro" onclick="switchTab('gastro')">🍽️ Gastro & Paradores (Bera)</button>
        <button class="desktop-nav__btn" data-tab="mapa" onclick="switchTab('mapa')">🗺️ Mapa Multipunto (47 en Vivo)</button>
        <button class="desktop-nav__btn" data-tab="midia" onclick="switchTab('midia')">🗓️ Mi Día & Guardería (<span id="nav-midia-count">5</span>)</button>
        <button class="desktop-nav__btn" data-tab="padok" onclick="switchTab('padok')">🏍️ Padok MX & Stream</button>
        <button class="desktop-nav__btn" data-tab="guia" onclick="switchTab('guia')">🧭 Guía 360° (47)</button>
      </nav>

      <div class="topbar-actions">
        <button class="tucan-sell-pill" onclick="openModal('ads-modal')" title="Ver espacios publicitarios para marcas y comercios">📢 Publicitar</button>
        <button class="circle-btn" onclick="openModal('hark-modal')" title="Pedir por Audio en Ruta 11 (Cerebro Hark)">🎙️</button>
        <button class="circle-btn" onclick="toggleSolisTheme()" title="Alternar entre Modo SOLIS Marfil y Modo Social Dark">
          <span id="theme-toggle-icon">🌙</span>
        </button>
        <button class="terracotta-pill-btn" onclick="openModal('login-modal')" id="top-auth-btn">
          <span id="top-auth-label">Entrar</span>
        </button>
      </div>
    </div>
  </header>

  <!-- 2. BANNERS PUBLICITARIOS SUPERIORES ESTILO "TUCÁN NEWS" -->
  <div class="tucan-ad-shell">
    <div class="tucan-ad-header">
      <span class="tucan-ad-label">● SPONSORS OFICIALES TEMPORADA PINAMAR · POWERED BY PIXEL MEDIA</span>
      <button class="tucan-sell-pill" onclick="openModal('ads-modal')">💼 Ver Tarifario / Anunciá tu Marca acá →</button>
    </div>

    <div class="tucan-leaderboard-strip">
      <div class="tucan-banner-card" style="background:linear-gradient(125deg,#18191C 0%,#2C2E33 100%);color:#FAF6F0;" onclick="openSponsorDetail('🍎 iSell Apple · Pinamar Summer Edition', 'Plan Canje iPhone en el acto, servicio técnico oficial y 15% OFF en AirTags para no perder las llaves de tu UTV en los médanos.', 'Activar Beneficio en Pixel Wallet')">
        <div style="min-width:0;">
          <span class="tucan-banner-badge" style="background:#E07A5F;color:#fff;">MAIN SPONSOR · TECH</span>
          <strong style="display:block;font-size:14.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">🍎 iSell Apple · Plan Canje iPhone & AirTags</strong>
          <span style="font-size:11.5px;color:#D6D1C7;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">15% OFF exclusivo clientes Guardería Intermédanos</span>
        </div>
        <span style="padding:7px 12px;border-radius:999px;background:rgba(255,255,255,0.14);font-size:11px;font-weight:700;flex:none;">Canjear →</span>
      </div>

      <div class="tucan-banner-card" style="background:linear-gradient(125deg,#17362A 0%,#235347 100%);color:#FAF6F0;" onclick="openSponsorDetail('🛞 Can-Am & Motul · Test Drive La Frontera', 'Probá el nuevo Maverick R 240 HP saliendo desde Guardería Intermédanos con lubricantes oficiales Motul 300V.', 'Reservar Test Drive')">
        <div style="min-width:0;">
          <span class="tucan-banner-badge" style="background:#10B981;color:#082218;">SPONSOR OFICIAL 4x4</span>
          <strong style="display:block;font-size:14.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">🛞 Can-Am & Motul · Test Drive en La Frontera</strong>
          <span style="font-size:11.5px;color:#D8E8E2;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Salidas guiadas desde De la Corvina 2047 · Pinamar</span>
        </div>
        <span style="padding:7px 12px;border-radius:999px;background:rgba(255,255,255,0.14);font-size:11px;font-weight:700;flex:none;">Ver Turnos →</span>
      </div>

      <div class="tucan-banner-card" style="background:var(--solis-cream);border:1.5px dashed var(--solis-terracotta);color:var(--solis-charcoal);" onclick="openModal('ads-modal')">
        <div style="min-width:0;">
          <span class="tucan-banner-badge" style="background:var(--solis-terracotta);color:#fff;">ESPACIO PUBLICITARIO DISPONIBLE</span>
          <strong style="display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">✨ Destacá tu Parador, Restó o Marca acá</strong>
          <span style="font-size:11.5px;color:var(--solis-muted);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">+25.000 riders, turistas ABC1 y reservas Bera</span>
        </div>
        <span style="padding:7px 12px;border-radius:999px;background:var(--solis-terracotta);color:#fff;font-size:11px;font-weight:700;flex:none;">Anunciar →</span>
      </div>
    </div>
  </div>

  <!-- CONTENEDOR PRINCIPAL -->
  <main class="app-shell">

    <!-- VISTA 1: EXPLORAR PINAMAR -->
    <section id="tab-discover">
      <div class="solis-hero-grid">
        
        <div class="solis-cover-card">
          <div>
            <span class="solis-eyebrow">EXPLORAR · PLANIFICAR · COMUNIDAD OFF-ROAD & PLAYA</span>
            <h1 class="solis-hero-h1">
              Viví Pinamar<br/>
              <span style="font-style:italic;color:var(--solis-terracotta);">de otra manera.</span>
            </h1>
            <p class="solis-hero-sub">
              Tu UTV listo en Guardería Intermédanos, mapa satelital con los 47 puntos adentro de nuestra web, paradores y reservas Bera.
            </p>

            <div class="solis-searchbar">
              <span>🔍</span>
              <input id="hero-search-input" type="text" placeholder="Buscar parador, plato, restó, gomería..." onkeydown="if(event.key==='Enter'){jumpSearchFromHero(this.value)}" />
              <button class="terracotta-pill-btn" style="padding:8px 14px;font-size:12px;" onclick="jumpSearchFromHero(document.getElementById('hero-search-input').value)">
                Buscar →
              </button>
            </div>
          </div>

          <div class="next-adventure-pill">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;cursor:pointer;" onclick="openModal('utv-modal')">
              <div style="width:44px;height:44px;border-radius:14px;background:#F1ECE1;display:flex;align-items:center;justify-content:center;font-size:21px;flex:none;">
                🛞
              </div>
              <div style="min-width:0;">
                <div style="font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#E07A5F;">
                  GUARDERÍA INTERMÉDANOS · BOX #114
                </div>
                <div style="font-weight:800;font-size:13.5px;color:#2C2E33;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  Can-Am Maverick X3 · Listo 15:00 hs
                </div>
                <div style="font-size:11.5px;color:#6E6A63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">De la Corvina 2047 · 14 PSI Arena</div>
              </div>
            </div>
            <div style="display:flex;gap:6px;flex:none;">
              <button onclick="openModal('utv-modal')" class="terracotta-pill-btn" style="padding:9px 13px;font-size:11.5px;" title="Configurar salida de mi UTV">
                🔑 Pedir
              </button>
              <button onclick="focusPinInsideOurWeb('g1', true)" class="circle-btn" style="width:34px;height:34px;" title="Ver Guardería en nuestro Mapa">
                📍
              </button>
              <button onclick="openModal('sos-modal')" class="circle-btn" style="background:#FEE2E2;color:#B91C1C;border-color:#FCA5A5;width:34px;height:34px;" title="SOS Rescate en Médanos">
                🚨
              </button>
            </div>
          </div>
        </div>

        <div class="mood-and-map-stack">
          
          <div class="solis-panel">
            <div class="panel-header">
              <h2 class="panel-title">¿Qué buscás hoy en Pinamar?</h2>
              <button class="panel-link" onclick="switchTab('mapa')">Ver los 47 en el Mapa →</button>
            </div>
            <div class="mood-row">
              <button class="mood-item" onclick="openMapWithCategory('parador')">
                <span class="mood-circle" style="background-image:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80')"></span>
                <span class="mood-name">12 Paradores</span>
              </button>
              <button class="mood-item" onclick="openMapWithCategory('restaurante')">
                <span class="mood-circle" style="background-image:url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80')"></span>
                <span class="mood-name">Restaurantes</span>
              </button>
              <button class="mood-item" onclick="openMapWithCategory('guarderia')">
                <span class="mood-circle" style="background-image:url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80')"></span>
                <span class="mood-name">6 Guarderías</span>
              </button>
              <button class="mood-item" onclick="openMapWithCategory('gomeria')">
                <span class="mood-circle" style="background-image:url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=300&q=80')"></span>
                <span class="mood-name">Gomerías 4x4</span>
              </button>
              <button class="mood-item" onclick="openMapWithCategory('estacion')">
                <span class="mood-circle" style="background-image:url('https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=300&q=80')"></span>
                <span class="mood-name">Nafta & Súper</span>
              </button>
            </div>
          </div>

          <div class="explore-nearby-card" onclick="switchTab('mapa')">
            <div style="min-width:0;">
              <span style="font-size:9.5px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#34D399;display:block;">
                🟢 47 PUNTOS EN VIVO SIN SALIR DE LA WEB
              </span>
              <h3 class="serif-solis" style="font-size:25px;line-height:1.05;margin:4px 0 6px;color:#FAF6F0;">
                Mapa Multipunto<br/>& Corredor Seguro
              </h3>
              <p style="font-size:11.5px;color:#D8CBB8;margin:0 0 8px;">
                Todos los paradores, guarderías, restos, gomerías y estaciones en un solo mapa propio.
              </p>
              <span style="display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;color:#fff;">
                Explorar los 47 pines →
              </span>
            </div>
            <div>
              <svg viewBox="0 0 210 120" style="width:100%;border-radius:16px;background:#132C22;border:1px solid rgba(255,255,255,0.18);display:block;">
                <path d="M0,0 L70,0 L45,120 L0,120 Z" fill="#235354" />
                <path d="M70,0 L210,0 L210,120 L45,120 Z" fill="#E3CEB0" />
                <path d="M72,98 Q95,35 135,48 T185,88" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round" class="corridor-glow" />
                <circle cx="72" cy="98" r="6" fill="#17362A" stroke="#fff" stroke-width="2" />
                <circle cx="135" cy="48" r="6" fill="#E07A5F" stroke="#fff" stroke-width="2" />
                <circle cx="185" cy="88" r="6" fill="#10B981" stroke="#fff" stroke-width="2" />
              </svg>
            </div>
          </div>

          <div class="solis-panel" style="padding:18px 20px;">
            <div class="panel-header" style="margin-bottom:10px;">
              <h3 class="panel-title" style="font-size:21px;">Imperdibles Hoy en Pinamar</h3>
              <button class="panel-link" onclick="switchTab('gastro')">Ver todos →</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:9px;">
              <div class="saved-mini-card" onclick="focusPinInsideOurWeb('p1', false)">
                <div class="saved-mini-thumb" style="background-image:url('https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=240&q=80')"></div>
                <div style="flex:1;min-width:0;">
                  <strong style="font-size:13.5px;display:block;">Kota Beach · La Frontera</strong>
                  <span style="font-size:11.5px;color:var(--solis-muted);">Sunset DJ 18:30 hs · Final Corredor Seguro</span>
                </div>
                <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="event.stopPropagation();focusPinInsideOurWeb('p1', true)">📍 Ver Pin</button>
              </div>
              <div class="saved-mini-card" onclick="focusPinInsideOurWeb('r1', false)">
                <div class="saved-mini-thumb" style="background-image:url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=240&q=80')"></div>
                <div style="flex:1;min-width:0;">
                  <strong style="font-size:13.5px;display:block;">Tante Pinamar · Av. de las Artes 35</strong>
                  <span style="font-size:11.5px;color:var(--solis-muted);">Goulash & Strudel · Reserva Bera sin fila</span>
                </div>
                <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="event.stopPropagation();focusPinInsideOurWeb('r1', true)">📍 Ver Pin</button>
              </div>
            </div>
          </div>

        </div>

        <!-- COLUMNA 3: MAPA MULTIPUNTO EN VIVO EN HOME + MI DÍA EN PINAMAR -->
        <div class="solis-panel" style="display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <span class="solis-eyebrow" style="margin:0;">47 PUNTOS EN NUESTRA WEB</span>
                <h2 class="panel-title" style="font-size:22px;" id="mini-map-label">Mapa Multipunto Pinamar</h2>
              </div>
              <button class="terracotta-pill-btn" style="padding:7px 13px;font-size:11.5px;" onclick="switchTab('mapa')">
                🗺️ Expandir Mapa
              </button>
            </div>

            <!-- Mapa Satelital Multipunto Embebido Directamente (Sin salir de la web) -->
            <div id="home-leaflet-map" style="width:100%;height:215px;border-radius:20px;overflow:hidden;border:1px solid var(--border-strong);background:#132C22;z-index:1;"></div>

            <div style="display:flex;gap:6px;overflow-x:auto;padding:10px 0 4px;scrollbar-width:none;">
              <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="focusPinInsideOurWeb('g1', false)">🏁 Corvina 2047</button>
              <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="focusPinInsideOurWeb('p1', false)">🏖️ Kota Beach</button>
              <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="focusPinInsideOurWeb('p2', false)">🌅 Luna Roja</button>
              <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="focusPinInsideOurWeb('r1', false)">🍽️ Tante</button>
              <button class="maps-pill-btn" style="padding:6px 10px;font-size:11px;" onclick="focusPinInsideOurWeb('e1', false)">⛽ Puma 24hs</button>
            </div>
          </div>

          <div style="border-top:1px solid var(--border);padding-top:12px;">
            <div class="panel-header" style="margin-bottom:6px;">
              <h3 class="panel-title" style="font-size:21px;">Mi Día en Pinamar</h3>
              <button class="panel-link" onclick="switchTab('midia')">Abrir hoja de ruta →</button>
            </div>
            <div class="timeline-list" id="home-timeline-preview" style="margin:8px 0;"></div>
            <button class="terracotta-pill-btn" style="width:100%;" onclick="openModal('hark-modal')">
              🎙️ Armar o editar mi día por voz (Hark) →
            </button>
          </div>
        </div>

      </div>

      <!-- BANNER EDITORIAL INTERMEDIO ESTILO "TUCÁN NEWS" -->
      <div class="tucan-billboard">
        <div style="max-width:640px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
            <span style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:#E07A5F;color:#fff;">
              ESPACIO SPONSOR EXCLUSIVO · ESTILO TUCÁN NEWS
            </span>
            <span style="font-size:11px;color:#D8CBB8;font-weight:600;">Presentado por Guardería Intermédanos × Pixel Media</span>
          </div>
          <h3 class="serif-solis" style="font-size:clamp(26px, 3.5vw, 38px);line-height:1.05;margin:0 0 8px;">
            Ford Bronco & Ranger Raptor · Off-Road Point La Frontera
          </h3>
          <p style="font-size:13.5px;color:#E6DEC8;margin:0;">
            Clínicas de manejo en arena, calibración sin cargo y travesías exclusivas saliendo desde De la Corvina 2047. *(Ejemplo de Banner Comercial para vender a automotrices, bancos, bebidas o desarrollos inmobiliarios)*.
          </p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="terracotta-pill-btn" onclick="openSponsorDetail('🚙 Off-Road Point La Frontera', 'Espacio demostrativo de alto impacto estilo Tucán News para automotrices, cervezas premium, bancos o real estate en Pinamar Norte.', 'Quiero anunciar mi marca')">
            ✨ Ver Promo Sponsor →
          </button>
          <button class="maps-pill-btn" style="background:rgba(255,255,255,0.14);color:#fff;border-color:rgba(255,255,255,0.3);" onclick="openModal('ads-modal')">
            📢 Comprar este Banner
          </button>
        </div>
      </div>

      <!-- SECCIÓN ESTRELLA: SOCIAL GASTRO & PARADORES FEED -->
      <div class="solis-panel">
        <div class="panel-header">
          <div>
            <span class="solis-eyebrow" style="margin-bottom:4px;">SOCIAL GASTRO & BEACH CLUBS · TODOS LOS PUNTOS EN NUESTRO MAPA</span>
            <h2 class="panel-title" style="font-size:32px;">Paradores, Platos & Experiencias en Vivo</h2>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="maps-pill-btn" onclick="openModal('post-modal')">📸 + Subir Plato o Sunset</button>
            <button class="terracotta-pill-btn" onclick="switchTab('gastro')">Ver todos los Paradores & Restos →</button>
          </div>
        </div>

        <div class="solis-pills" id="discover-pills">
          <button class="solis-pill is-active" onclick="filterSocialCards('ALL', this)">🔥 Todos los Destacados</button>
          <button class="solis-pill" onclick="filterSocialCards('PARADOR', this)">🏖️ Paradores & Sunsets</button>
          <button class="solis-pill" onclick="filterSocialCards('GASTRO', this)">🍽️ Platos & Restaurantes (Bera)</button>
          <button class="solis-pill" onclick="filterSocialCards('OFFROAD', this)">🏍️ Travesías & Padok MX</button>
          <button class="solis-pill" onclick="filterSocialCards('SAVED', this)">❤️ Mis Guardados</button>
        </div>

        <div class="gastro-social-grid" id="discover-social-grid"></div>
      </div>
    </section>

    <!-- VISTA 2: SECCIÓN GASTRONÓMICA, PARADORES & SOCIAL FEED COMPLETO -->
    <section id="tab-gastro" class="hidden-el">
      <div class="solis-panel">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;margin-bottom:16px;">
          <div>
            <span class="solis-eyebrow">GASTRONOMÍA, PARADORES & COMUNIDAD · POWERED BY BERA & PIXEL WALLET</span>
            <h1 class="serif-solis" style="font-size:38px;margin:0;line-height:1.05;">
              Descubrí dónde comer, parar y ver el atardecer
            </h1>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="maps-pill-btn" onclick="openModal('ads-modal')">⭐ Destacar mi Parador / Restó</button>
            <button class="terracotta-pill-btn" onclick="openModal('post-modal')">📸 + Subir Plato o Sunset</button>
          </div>
        </div>

        <div class="solis-pills" id="gastro-pills">
          <button class="solis-pill is-active" onclick="filterGastroPage('ALL', this)">Todos</button>
          <button class="solis-pill" onclick="filterGastroPage('PARADOR', this)">🏖️ Paradores de Playa & Frontera</button>
          <button class="solis-pill" onclick="filterGastroPage('GASTRO', this)">🍽️ Restaurantes Clásicos & Autor</button>
          <button class="solis-pill" onclick="filterGastroPage('OFFROAD', this)">🏍️ Travesías Gastronómicas</button>
        </div>

        <div class="gastro-social-grid" id="full-gastro-grid"></div>
      </div>
    </section>

    <!-- =======================================================================
         VISTA 3: MAPA MULTIPUNTO INTEGRADO EN NUESTRA WEB (LOS 47 PUNTOS + CORREDOR SEGURO)
         No sale nunca de la página: muestra todos los pines juntos con satélite Google Maps
    ======================================================================== -->
    <section id="tab-mapa" class="hidden-el">
      <div class="solis-panel" style="background:#17362A;color:#FAF6F0;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">
          <div>
            <span style="font-size:10.5px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:#34D399;">
              ● MAPA SATELITAL MULTIPUNTO PROPIO · LOS 47 PUNTOS ADENTRO DE NUESTRA WEB
            </span>
            <h1 class="serif-solis" style="font-size:34px;margin:4px 0 0;color:#FAF6F0;">
              Todos los Puntos de Pinamar & Corredor Seguro en Vivo
            </h1>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <button class="terracotta-pill-btn" style="background:#10B981;" id="toggle-tile-btn" onclick="toggleGoogleMapTileLayer()">
              🗺️ Cambiar a Vista Calles / Satélite
            </button>
            <button class="terracotta-pill-btn" onclick="openModal('report-modal')">⚠️ + Reportar Alerta</button>
            <button class="maps-pill-btn" onclick="openModal('qr-modal')">🪪 Mi Pase QR Sauch</button>
          </div>
        </div>

        <!-- FILTROS EN VIVO DEL MAPA MULTIPUNTO (FILTRAN LOS 47 PINES SIN SALIR DE LA PÁGINA) -->
        <div class="solis-pills" id="map-category-pills" style="margin-bottom:14px;">
          <button class="solis-pill is-active" onclick="filterMapMarkers('ALL', this)">📍 Todos en el Mapa (47)</button>
          <button class="solis-pill" onclick="filterMapMarkers('guarderia', this)">🏁 6 Guarderías</button>
          <button class="solis-pill" onclick="filterMapMarkers('parador', this)">🏖️ 12 Paradores</button>
          <button class="solis-pill" onclick="filterMapMarkers('restaurante', this)">🍽️ 9 Restaurantes</button>
          <button class="solis-pill" onclick="filterMapMarkers('gomeria', this)">🛞 8 Gomerías 4x4</button>
          <button class="solis-pill" onclick="filterMapMarkers('supermercado', this)">🛒 7 Supermercados</button>
          <button class="solis-pill" onclick="filterMapMarkers('estacion', this)">⛽ 5 Estaciones 24hs</button>
        </div>

        <div class="solis-two-col-desktop">
          <div>
            <!-- Lienzo principal con los 47 pines + Corredor Seguro sobre Google Satellite -->
            <div id="main-leaflet-map" class="inapp-map-canvas"></div>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            <!-- Tarjeta del punto seleccionado actualmente en el mapa -->
            <div style="background:#FAF6F0;color:#2C2E33;padding:18px;border-radius:20px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <span style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#E07A5F;" id="map-selected-badge">⭐ GUARDERÍA CORE #1</span>
                <span style="font-size:11px;font-weight:800;color:#0F766E;">Pin Activo en Mapa</span>
              </div>
              <strong style="font-size:18px;display:block;margin:4px 0;" id="map-selected-title">🏁 Guardería Intermédanos (Sede Corvina)</strong>
              <div style="font-size:12.5px;font-weight:700;color:#1D4E56;margin-bottom:6px;" id="map-selected-addr">📍 De la Corvina 2047, Pinamar</div>
              <p style="font-size:12.5px;color:#6E6A63;margin:0 0 12px;" id="map-selected-sub">
                UTVs, cuatris, motos, taller oficial, mecánica ambulante SOS 24/7, alquiler y travesías.
              </p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <button class="terracotta-pill-btn" style="padding:9px 12px;font-size:12px;" onclick="openBeraBooking(window.__selectedMapPin?.name || 'Kota Beach', 'Reservar con Bera', window.__selectedMapPin?.id || 'p1')">
                  🍽️ Reservar / Pedir
                </button>
                <button class="maps-pill-btn" style="padding:9px 12px;font-size:12px;" onclick="addSelectedPinToMyDay()">
                  🗓️ + Sumar a Mi Día
                </button>
              </div>
            </div>

            <!-- Lista rápida clicable de los puntos visibles en el mapa -->
            <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:14px;">
              <div style="font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#34D399;margin-bottom:8px;">
                TOCÁ CUALQUIER LUGAR PARA ENFOCARLO EN EL MAPA:
              </div>
              <div id="map-side-list" style="display:flex;flex-direction:column;gap:6px;max-height:220px;overflow-y:auto;padding-right:4px;"></div>
            </div>

            <button class="terracotta-pill-btn" style="background:#B91C1C;width:100%;" onclick="openModal('sos-modal')">
              🚨 Auxilio Mecánico Ambulante en mi Punto del Mapa
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VISTA 4: MI DÍA EN PINAMAR & GUARDERÍA -->
    <section id="tab-midia" class="hidden-el">
      <div class="solis-two-col-desktop">
        <div class="solis-panel">
          <span class="solis-eyebrow">GUARDERÍA INTERMÉDANOS · DE LA CORVINA 2047 & CONSTITUCIÓN 2243</span>
          <h2 class="serif-solis" style="font-size:34px;margin:0 0 8px;">Mi Garage Digital & Auxilio SOS</h2>
          <p style="font-size:13.5px;color:var(--solis-muted);margin:0 0 16px;">
            Tus unidades guardadas con arranque diario, control de presión para arena y salida directa a La Frontera.
          </p>

          <div style="display:grid;gap:14px;">
            <div style="padding:18px;border-radius:22px;background:var(--solis-ivory);border:2px solid var(--solis-terracotta);">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <strong style="font-size:16px;">🛞 Can-Am Maverick X3 RS Turbo</strong>
                <span style="font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:999px;background:var(--solis-terracotta);color:#fff;">BOX #114-A</span>
              </div>
              <p style="font-size:13px;color:var(--solis-muted);margin:6px 0 14px;">
                Presión arena: 14 PSI · Tanque 100% · Antena reglamentaria y Pase QR Sauch activo.
              </p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="terracotta-pill-btn" onclick="openModal('utv-modal')">🔑 Programar Salida en Puerta</button>
                <button class="maps-pill-btn" onclick="focusPinInsideOurWeb('g1', true)">📍 Ver Guardería en Nuestro Mapa</button>
                <button class="terracotta-pill-btn" style="background:#B91C1C;" onclick="openModal('sos-modal')">🚨 SOS Rescate GPS</button>
              </div>
            </div>

            <div style="padding:18px;border-radius:22px;background:var(--solis-ivory);border:1px solid var(--border);">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                <strong style="font-size:16px;">🏍️ KTM 450 EXC-F Six Days</strong>
                <span style="font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:999px;background:var(--solis-sand);color:var(--solis-charcoal);">PADOK #942</span>
              </div>
              <p style="font-size:13px;color:var(--solis-muted);margin:6px 0 12px;">
                ✓ Service Oficial Validado por Guardería Intermédanos · Filtro limpio y aceite Motul 300V.
              </p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="maps-pill-btn" onclick="openModal('utv-modal')">🛠️ Ver Ficha de Taller</button>
                <button class="maps-pill-btn" onclick="focusPinInsideOurWeb('g2', true)">📍 Ver Sede Constitución 2243</button>
              </div>
            </div>
          </div>
        </div>

        <div class="solis-panel">
          <div style="height:150px;border-radius:20px;background:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80') center/cover;margin-bottom:14px;"></div>
          <span class="solis-eyebrow">TU HOJA DE RUTA INTERACTIVA · SIN SALIR DE LA WEB</span>
          <h2 class="serif-solis" style="font-size:32px;margin:0 0 4px;">Escapada Pinamar & La Frontera</h2>
          <p style="font-size:13px;color:var(--solis-muted);margin:0;">Tocá cualquier parada para enfocarla en nuestro Mapa Multipunto</p>

          <div class="timeline-list" id="full-timeline-list"></div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;">
            <button class="terracotta-pill-btn" onclick="openModal('hark-modal')">
              🎙️ Editar por Voz (Hark)
            </button>
            <button class="maps-pill-btn" onclick="switchTab('gastro')">
              ➕ Sumar Parador / Restó
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VISTA 5: PADOK MX & FRONTERA LIVE STREAM -->
    <section id="tab-padok" class="hidden-el">
      <div class="solis-panel">
        <span class="solis-eyebrow">COMUNIDAD ENDURO & UTV · REPO PADOK-MX ADENTRO DE INTERMÉDANOS</span>
        <h1 class="serif-solis" style="font-size:36px;margin:0 0 16px;">Padok MX · Ranking, Clínicas & Stream en Vivo</h1>

        <div class="solis-two-col-desktop">
          <div style="border-radius:24px;padding:24px;background:linear-gradient(135deg,#231C16,#4E3829);color:#FAF6F0;display:flex;flex-direction:column;justify-content:space-between;min-height:280px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;">
              <span style="padding:5px 12px;border-radius:999px;background:#E07A5F;font-weight:700;">🔴 FRONTERA LIVE STREAM</span>
              <span>👁️ 1.480 viendo ahora</span>
            </div>
            <div style="text-align:center;margin:20px 0;">
              <h3 class="serif-solis" style="font-size:32px;margin:0;">Drone La Olla Norte & Sunset Session</h3>
              <p style="font-size:13px;color:#E6DEC8;margin:6px 0 14px;">Conducen influencers y pilotos de Padok MX con el apoyo de <strong>iSell Apple</strong> y <strong>Pixel IT</strong>.</p>
              <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
                <button class="terracotta-pill-btn" onclick="quickAction('▶ Reproduciendo stream multicámara en vivo desde La Olla Norte')">
                  ▶ Ver Transmisión en Vivo
                </button>
                <button class="maps-pill-btn" onclick="focusPinInsideOurWeb('p1', true)">
                  📍 Ver La Frontera en Nuestro Mapa
                </button>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;background:rgba(255,255,255,0.1);padding:10px 14px;border-radius:14px;">
              <span>🍎 <strong>Sponsor iSell Apple:</strong> 15% OFF AirTags & Trade-in iPhone</span>
              <span style="color:#DFBA82;font-weight:700;cursor:pointer;" onclick="quickAction('🍎 Cupón iSell Apple activado en tu Pixel Wallet')">Activar Cupón →</span>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:16px;border-radius:18px;background:var(--solis-ivory);border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <strong style="font-size:15px;">#1 Marcos Gómez · KTM 450 EXC-F</strong>
                <div style="font-size:12px;color:var(--solis-muted);">Tiempo La Olla: 01:24:18 · Box #114</div>
                <span style="display:inline-block;margin-top:4px;font-size:11px;font-weight:700;color:var(--solis-terracotta);">✓ Service Oficial Validado por Guardería Intermédanos</span>
              </div>
              <strong style="font-size:15px;">1.840 pts</strong>
            </div>
            <div style="padding:16px;border-radius:18px;background:var(--solis-ivory);border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <strong style="font-size:15px;">#2 Juan Ignacio Díaz · Honda CRF 450R</strong>
                <div style="font-size:12px;color:var(--solis-muted);">Tiempo La Olla: 01:25:05 · Box #042</div>
                <span style="display:inline-block;margin-top:4px;font-size:11px;font-weight:700;color:var(--solis-terracotta);">✓ Service Oficial Validado por Guardería Intermédanos</span>
              </div>
              <strong style="font-size:15px;">1.790 pts</strong>
            </div>
            <div style="padding:16px;border-radius:18px;background:var(--solis-ivory);border:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <div>
                <strong style="font-size:15px;">#3 Tomás Etcheverry · Can-Am Maverick X3</strong>
                <div style="font-size:12px;color:var(--solis-muted);">Categoría UTV Open · Box #088</div>
                <span style="display:inline-block;margin-top:4px;font-size:11px;font-weight:700;color:#0F766E;">✓ Pase QR Corredor Seguro Activo</span>
              </div>
              <strong style="font-size:15px;">1.710 pts</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VISTA 6: GUÍA 360° DE PINAMAR (TODOS ENFOCAN EN NUESTRO MAPA SIN SALIR DE LA WEB) -->
    <section id="tab-guia" class="hidden-el">
      <div class="solis-panel">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;">
          <div>
            <span class="solis-eyebrow">DIRECTORIO COMPLETO DE 47 PUNTOS INTEGRADOS EN NUESTRO MAPA</span>
            <h1 class="serif-solis" style="font-size:36px;margin:0;">
              Guía 360°: Guarderías, Paradores, Restos, Gomerías, Súper & Nafta
            </h1>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="maps-pill-btn" onclick="switchTab('mapa')">🗺️ Ver los 47 juntos en el Mapa</button>
            <button class="terracotta-pill-btn" onclick="openModal('ads-modal')">📢 Sumar o Destacar mi Comercio</button>
          </div>
        </div>

        <div style="margin-bottom:14px;">
          <input id="guia-search-input" oninput="renderFullGuia()" type="text" placeholder="🔍 Escribí el nombre del lugar, calle o rubro (ej: Carlitos, Tante, Puma, San José, Kota)..." style="width:100%;height:46px;padding:0 18px;border-radius:999px;border:1px solid var(--border-strong);background:var(--solis-ivory);color:var(--solis-charcoal);font:500 14px var(--font-sans);" />
        </div>

        <div class="solis-pills" id="guia-cat-pills">
          <button class="solis-pill is-active" onclick="setGuiaCategory('ALL', this)">Todos (47 Puntos)</button>
          <button class="solis-pill" onclick="setGuiaCategory('parador', this)">🏖️ 12 Paradores</button>
          <button class="solis-pill" onclick="setGuiaCategory('guarderia', this)">🏁 6 Guarderías</button>
          <button class="solis-pill" onclick="setGuiaCategory('restaurante', this)">🍽️ 9 Restaurantes</button>
          <button class="solis-pill" onclick="setGuiaCategory('gomeria', this)">🛞 8 Gomerías 4x4</button>
          <button class="solis-pill" onclick="setGuiaCategory('supermercado', this)">🛒 7 Supermercados</button>
          <button class="solis-pill" onclick="setGuiaCategory('estacion', this)">⛽ 5 Estaciones 24hs</button>
        </div>

        <div id="guia-directory-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px;margin-top:18px;"></div>
      </div>
    </section>

  </main>

  <!-- DOCK FLOTANTE INFERIOR BLANCO ESTILO SOLIS (SOLO MOBILE/TABLET) -->
  <nav class="solis-floating-dock" aria-label="Navegación principal">
    <button class="dock-item is-active" data-dock="discover" onclick="switchTab('discover')">
      <span style="font-size:18px;">🏠</span>
      <span>Explorar</span>
    </button>
    <button class="dock-item" data-dock="gastro" onclick="switchTab('gastro')">
      <span style="font-size:18px;">🍽️</span>
      <span>Gastro & Playas</span>
    </button>
    <button class="dock-plus-btn" onclick="openModal('post-modal')" title="Subir Foto, Plato o Alerta en Médanos">+</button>
    <button class="dock-item" data-dock="mapa" onclick="switchTab('mapa')">
      <span style="font-size:18px;">🗺️</span>
      <span>Mapa (47)</span>
    </button>
    <button class="dock-item" data-dock="midia" onclick="switchTab('midia')">
      <span style="font-size:18px;">🛞</span>
      <span>Mi Día</span>
    </button>
  </nav>

  <!-- MODAL COMERCIAL: MEDIA KIT & TARIFARIO DE BANNERS -->
  <div id="ads-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.80);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:520px;width:100%;padding:26px;max-height:90vh;overflow-y:auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;color:var(--solis-terracotta);">MEDIA KIT COMERCIAL · INTERMÉDANOS × PIXEL MEDIA</span>
          <h3 class="serif-solis" style="font-size:32px;margin:2px 0 0;">Anunciá tu Marca en Pinamar</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('ads-modal')">✕</button>
      </div>
      <p style="font-size:13px;color:var(--solis-muted);margin:0 0 14px;">
        Llegá de forma directa a propietarios de UTVs, camionetas 4x4, riders de Padok MX y turistas ABC1 en La Frontera y Pinamar Norte (mismo motor publicitario de <strong>Tucán News</strong>).
      </p>

      <div style="display:grid;gap:10px;margin-bottom:16px;">
        <div style="padding:14px;border-radius:18px;background:var(--solis-ivory);border:2px solid var(--solis-terracotta);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:14.5px;">🏆 1. Main Sponsor Top Leaderboard</strong>
            <span style="font-size:11px;font-weight:800;color:var(--solis-terracotta);">ALTO IMPACTO</span>
          </div>
          <p style="font-size:12px;color:var(--solis-muted);margin:4px 0 0;">
            Banner fijo en la cabecera de la App + Pin Destacado en el Mapa Multipunto + cupón directo en Pixel Wallet.
          </p>
        </div>

        <div style="padding:14px;border-radius:18px;background:var(--solis-ivory);border:1px solid var(--border-strong);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:14.5px;">📰 2. Billboard Editorial Central (Estilo Tucán News)</strong>
            <span style="font-size:11px;font-weight:800;color:#0F766E;">MARCAS & 4x4</span>
          </div>
          <p style="font-size:12px;color:var(--solis-muted);margin:4px 0 0;">
            Banner ancho fotográfico entre la portada y el Feed Gastronómico con botón interactivo directo.
          </p>
        </div>

        <div style="padding:14px;border-radius:18px;background:var(--solis-ivory);border:1px solid var(--border-strong);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:14.5px;">🍽️ 3. Parador / Restó Destacado #1 + Bera</strong>
            <span style="font-size:11px;font-weight:800;color:var(--solis-seadeep);">GASTRONOMÍA</span>
          </div>
          <p style="font-size:12px;color:var(--solis-muted);margin:4px 0 0;">
            Tarjeta patrocinada fija en el tope del Feed Gastronómico con reserva de mesa Bera y Pin Dorado en el Mapa.
          </p>
        </div>
      </div>

      <button class="terracotta-pill-btn" style="width:100%;height:46px;" onclick="closeModal('ads-modal');quickAction('✅ Solicitud comercial registrada · Equipo Pixel Media / Intermédanos')">
        ✓ Solicitar Propuesta Comercial Ahora →
      </button>
    </div>
  </div>

  <!-- MODALES FUNCIONALES INTERNOS (SIN SALIR DE LA WEB) -->
  <div id="bera-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.76);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:440px;width:100%;padding:26px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;color:var(--solis-terracotta);">RESERVA OFICIAL BERA × PIXEL WALLET</span>
          <h3 class="serif-solis" style="font-size:30px;margin:2px 0 0;" id="bera-modal-place">Kota Beach</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('bera-modal')">✕</button>
      </div>

      <div style="display:grid;gap:12px;margin:14px 0;">
        <div>
          <label style="font-size:11.5px;font-weight:700;color:var(--solis-muted);display:block;margin-bottom:6px;">HORARIO & TURNO</label>
          <select id="bera-time-select" style="width:100%;height:44px;border-radius:14px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:600 13.5px var(--font-sans);">
            <option value="13:30 hs · Almuerzo de Playa">13:30 hs · Almuerzo</option>
            <option value="18:30 hs · Sunset Deck & Fuegos" selected>18:30 hs · Sunset & Fuegos</option>
            <option value="21:30 hs · Cena Principal">21:30 hs · Cena</option>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:11.5px;font-weight:700;color:var(--solis-muted);display:block;margin-bottom:6px;">COMENSALES</label>
            <select id="bera-guests-select" style="width:100%;height:44px;border-radius:14px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:600 13.5px var(--font-sans);">
              <option value="2 personas">2 personas</option>
              <option value="4 personas" selected>4 personas</option>
              <option value="6 personas">6 personas</option>
              <option value="8+ personas (Mesa Grande)">8+ personas</option>
            </select>
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:700;color:var(--solis-muted);display:block;margin-bottom:6px;">SECTOR</label>
            <select id="bera-sector-select" style="width:100%;height:44px;border-radius:14px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:600 13.5px var(--font-sans);">
              <option value="Deck Madera Cruda">Deck Madera Cruda</option>
              <option value="Primera Línea Mar">Primera Línea Mar</option>
              <option value="Salón Interior">Salón Principal</option>
            </select>
          </div>
        </div>

        <div style="padding:12px 14px;border-radius:16px;background:var(--solis-cream);font-size:12.5px;display:flex;justify-content:space-between;align-items:center;">
          <span>💳 Beneficio <strong>Pixel Wallet</strong> + Estacionamiento UTV</span>
          <strong style="color:var(--solis-terracotta);">15% Cashback</strong>
        </div>
      </div>

      <div style="display:grid;gap:8px;">
        <button class="terracotta-pill-btn" style="width:100%;height:46px;" onclick="confirmBeraReservation()">
          ✓ Confirmar Reserva y Sumar a Mi Día →
        </button>
        <button class="maps-pill-btn" style="width:100%;height:42px;" onclick="closeModal('bera-modal');focusPinInsideOurWeb(window.__beraCurrentPinId || 'p1', true)">
          📍 Ver Ubicación en Nuestro Mapa Interactivo
        </button>
      </div>
    </div>
  </div>

  <div id="utv-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.76);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:440px;width:100%;padding:26px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;color:var(--solis-terracotta);">GUARDERÍA INTERMÉDANOS · BOX #114</span>
          <h3 class="serif-solis" style="font-size:30px;margin:2px 0 0;">Preparar Vehículo en Puerta</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('utv-modal')">✕</button>
      </div>

      <div style="display:grid;gap:12px;margin:14px 0;">
        <div>
          <label style="font-size:11.5px;font-weight:700;color:var(--solis-muted);display:block;margin-bottom:6px;">UNIDAD Y SEDE DE RETIRO</label>
          <select id="utv-unit-select" style="width:100%;height:44px;border-radius:14px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:600 13px var(--font-sans);">
            <option value="Can-Am Maverick X3 RS (Sede De la Corvina 2047)">🛞 Can-Am Maverick X3 RS · De la Corvina 2047</option>
            <option value="KTM 450 EXC-F Six Days (Sede De la Corvina 2047)">🏍️ KTM 450 EXC-F Six Days · De la Corvina 2047</option>
            <option value="Can-Am Maverick X3 RS (Sede Av. Constitución 2243)">🛞 Can-Am Maverick X3 RS · Av. Constitución 2243</option>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:11.5px;font-weight:700;color:var(--solis-muted);display:block;margin-bottom:6px;">HORA DE SALIDA</label>
            <select id="utv-hour-select" style="width:100%;height:44px;border-radius:14px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:600 13px var(--font-sans);">
              <option value="En 15 minutos">Ahora (en 15 min)</option>
              <option value="15:00 hs" selected>15:00 hs</option>
              <option value="17:00 hs (Sunset)">17:00 hs (Sunset)</option>
              <option value="20:30 hs (Nocturna)">20:30 hs (Nocturna)</option>
            </select>
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:700;color:var(--solis-muted);display:block;margin-bottom:6px;">PRESIÓN ARENA</label>
            <select id="utv-psi-select" style="width:100%;height:44px;border-radius:14px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:600 13px var(--font-sans);">
              <option value="12 PSI (Arena blanda)">12 PSI (Arena blanda)</option>
              <option value="14 PSI (Estándar Médanos)" selected>14 PSI (Médanos)</option>
              <option value="18 PSI (Travesía firme)">18 PSI (Firme)</option>
            </select>
          </div>
        </div>
      </div>

      <div style="display:grid;gap:8px;">
        <button class="terracotta-pill-btn" style="width:100%;height:46px;" onclick="confirmUTVOrder()">
          🔑 Confirmar alistamiento en puerta →
        </button>
        <button class="maps-pill-btn" style="width:100%;height:42px;" onclick="closeModal('utv-modal');focusPinInsideOurWeb('g1', true)">
          📍 Ver Sede en Nuestro Mapa Multipunto
        </button>
      </div>
    </div>
  </div>

  <div id="sos-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.82);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:440px;width:100%;padding:26px;border:2px solid #EF4444;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;color:#EF4444;">🚨 MECÁNICA AMBULANTE INTERMÉDANOS 24/7</span>
          <h3 class="serif-solis" style="font-size:30px;margin:2px 0 0;">Rescate SOS en Nuestro Mapa</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('sos-modal')">✕</button>
      </div>
      <p style="font-size:13px;color:var(--solis-muted);margin:0 0 12px;">
        Tu baliza SOS se marca en tiempo real dentro del Mapa de <strong>Guardería Intermédanos</strong> para que la camioneta de rescate salga hacia tu posición.
      </p>
      <div style="padding:12px 14px;border-radius:16px;background:var(--solis-ivory);border:1px solid var(--border-strong);font-family:var(--font-mono);font-size:12px;margin-bottom:14px;">
        📍 Coordenadas en La Frontera: <strong>-37.0682, -56.8241 (Sector La Olla Norte)</strong>
      </div>
      <div style="display:grid;gap:8px;">
        <button class="terracotta-pill-btn" style="background:#B91C1C;width:100%;height:46px;" onclick="triggerInAppSOSBeacon()">
          🚨 Activar Baliza SOS en el Mapa de la App →
        </button>
      </div>
    </div>
  </div>

  <div id="comments-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.76);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:430px;width:100%;padding:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;">RESEÑAS VERIFICADAS · COMUNIDAD PINAMAR</span>
          <h3 class="serif-solis" style="font-size:26px;margin:0;" id="comments-modal-title">Comentarios</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('comments-modal')">✕</button>
      </div>
      <div id="comments-list-box" style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;margin-bottom:12px;font-size:13px;"></div>
      <div style="display:flex;gap:8px;">
        <input id="new-comment-input" type="text" placeholder="Escribí tu recomendación o tip..." style="flex:1;height:42px;border-radius:999px;border:1px solid var(--border-strong);padding:0 14px;background:var(--solis-ivory);color:var(--solis-charcoal);font:500 13px var(--font-sans);" onkeydown="if(event.key==='Enter'){submitNewComment()}" />
        <button class="terracotta-pill-btn" onclick="submitNewComment()">Publicar</button>
      </div>
    </div>
  </div>

  <div id="story-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.82);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div style="max-width:390px;width:100%;border-radius:28px;overflow:hidden;background:linear-gradient(165deg,#231C16,#4A3828);color:#FAF6F0;padding:24px;box-shadow:0 24px 60px rgba(0,0,0,0.6);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <strong id="story-modal-title" style="font-size:16px;">Sponsor Oficial</strong>
        <button class="circle-btn" onclick="closeModal('story-modal')" style="width:32px;height:32px;">✕</button>
      </div>
      <p id="story-modal-body" class="serif-solis" style="font-size:26px;line-height:1.25;margin:18px 0;"></p>
      <div style="display:grid;gap:8px;">
        <button id="story-modal-cta" class="terracotta-pill-btn" style="width:100%;" onclick="closeModal('story-modal');quickAction('✅ Beneficio Sponsor guardado en tu Pixel Wallet');">
          Activar Beneficio →
        </button>
        <button class="maps-pill-btn" style="width:100%;background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.25);" onclick="closeModal('story-modal');openModal('ads-modal');">
          📢 Quiero un espacio publicitario así
        </button>
      </div>
    </div>
  </div>

  <div id="post-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:410px;width:100%;padding:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;">COMUNIDAD PINAMAR & BERA</span>
          <h3 class="serif-solis" style="font-size:28px;margin:0;">Publicar en el Feed</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('post-modal')">✕</button>
      </div>
      <div style="display:grid;gap:10px;margin:12px 0;">
        <input id="post-place-input" type="text" placeholder="Lugar (ej: Luna Roja, Kota Beach, Tante...)" style="width:100%;height:42px;border-radius:12px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:500 13px var(--font-sans);" />
        <input id="post-dish-input" type="text" placeholder="Plato, Sunset o Experiencia que recomendás..." style="width:100%;height:42px;border-radius:12px;border:1px solid var(--border-strong);padding:0 12px;background:var(--solis-ivory);color:var(--solis-charcoal);font:500 13px var(--font-sans);" />
        <button class="terracotta-pill-btn" style="height:44px;" onclick="createNewUserGastroPost()">
          📸 Publicar en el Feed Gastronómico →
        </button>
      </div>
      <div style="border-top:1px solid var(--border);padding-top:12px;margin-top:8px;">
        <button class="timeline-step" onclick="closeModal('post-modal');openModal('report-modal');">
          <span class="timeline-icon">⚠️</span>
          <div>
            <strong style="display:block;font-size:13.5px;">Reportar Alerta en nuestro Mapa de Médanos</strong>
            <span style="font-size:11.5px;color:var(--solis-muted);">Agrega un pin de alerta en vivo sobre La Frontera</span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <div id="login-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:410px;width:100%;padding:26px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div>
          <span class="solis-eyebrow" style="margin:0;">PIXEL ID × INTERMÉDANOS</span>
          <h3 class="serif-solis" style="font-size:30px;margin:0;">Ingresá a tu cuenta</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('login-modal')">✕</button>
      </div>
      <p style="font-size:13.5px;color:var(--solis-muted);margin:0 0 18px;">
        Vinculá tu Box de <strong>Guardería Intermédanos</strong>, tu <strong>Pase QR Sauch</strong> y tus reservas gastronómicas con <strong>Bera</strong>.
      </p>
      <div style="display:grid;gap:10px;">
        <button onclick="signInUser('Google', 'lucho@pixelit.ar')" style="height:50px;border-radius:999px;border:1px solid var(--border-strong);background:var(--solis-ivory);color:var(--solis-charcoal);font:700 14px var(--font-sans);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;">
          <span>🌐</span> <span>Continuar con Google</span>
        </button>
        <button onclick="signInUser('Apple', 'lucho@icloud.com')" style="height:50px;border-radius:999px;border:none;background:#2C2E33;color:#fff;font:700 14px var(--font-sans);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;">
          <span style="font-size:18px;"></span> <span>Continuar con Apple</span>
        </button>
      </div>
    </div>
  </div>

  <div id="qr-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:400px;width:100%;padding:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <div>
          <span class="solis-eyebrow" style="color:#10B981;margin:0;">PASE QR CORREDOR SEGURO · SAUCH</span>
          <h3 class="serif-solis" style="font-size:28px;margin:0;">Credencial Vehicular</h3>
        </div>
        <button class="circle-btn" onclick="closeModal('qr-modal')">✕</button>
      </div>
      <div style="background:#17362A;color:#FAF6F0;padding:18px;border-radius:20px;display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div style="font-size:12.5px;">
          <div style="color:#34D399;font-weight:800;">✓ HABILITADO LA FRONTERA</div>
          <strong style="font-size:15px;display:block;margin:4px 0;">Can-Am Maverick X3 RS</strong>
          <div style="color:#D8CBB8;">Guardería Intermédanos · Box #114</div>
        </div>
        <div style="width:74px;height:74px;background:#fff;color:#17362A;border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:monospace;font-weight:700;font-size:10.5px;text-align:center;flex:none;">
          [QR SAUCH<br/>#PIN-114]
        </div>
      </div>
    </div>
  </div>

  <div id="report-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:400px;width:100%;padding:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <h3 class="serif-solis" style="font-size:28px;margin:0;">⚠️ Agregar Alerta al Mapa</h3>
        <button class="circle-btn" onclick="closeModal('report-modal')">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <button class="terracotta-pill-btn" onclick="postWazeAlert('⚠️ Cortada peligrosa en La Olla', -37.0665, -56.8235)">⚠️ Cortada</button>
        <button class="terracotta-pill-btn" onclick="postWazeAlert('🚜 UTV encajado en Médano', -37.0630, -56.8190)">🚜 Encajado</button>
        <button class="terracotta-pill-btn" style="background:#17362A;" onclick="postWazeAlert('👮 Control QR Corredor Seguro', -37.0785, -56.8350)">👮 Control QR</button>
        <button class="terracotta-pill-btn" style="background:#D9A760;" onclick="postWazeAlert('🌅 Sunset en vivo Kota Beach', -37.0612, -56.8140)">🌅 Sunset</button>
      </div>
    </div>
  </div>

  <div id="hark-modal" class="hidden-el" style="position:fixed;inset:0;z-index:1100;background:rgba(15,20,25,0.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;">
    <div class="solis-panel" style="max-width:440px;width:100%;padding:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h3 class="serif-solis" style="font-size:28px;margin:0;">🎙️ Cerebro Pixel (Hark) · Ruta 11</h3>
        <button class="circle-btn" onclick="closeModal('hark-modal')">✕</button>
      </div>
      <p style="font-style:italic;background:var(--solis-cream);padding:14px;border-radius:16px;font-size:13.5px;">
        "Che Pixel, llego a Pinamar a las 15:00. Que en Intermédanos me tengan el Can-Am en la puerta con 14 libras y reservame mesa para 4 en Kota Beach al sunset."
      </p>
      <button class="terracotta-pill-btn" style="width:100%;margin-top:8px;" onclick="executeHarkVoicePlan()">
        ✓ Aprobar y Ejecutar Plan Completo con 1 Clic
      </button>
    </div>
  </div>

  <div id="toast" class="hidden-el" style="position:fixed;bottom:84px;left:16px;right:16px;max-width:440px;margin:0 auto;z-index:1200;background:#17362A;color:#FAF6F0;padding:12px 18px;border-radius:999px;font-weight:700;font-size:13px;box-shadow:0 14px 34px rgba(0,0,0,0.35);border:1px solid #34D399;text-align:center;"></div>

  <script>
    // =========================================================================
    // BASE DE DATOS GEORREFERENCIADA COMPLETA DE NUESTRA PÁGINA (47 PUNTOS REALES DE PINAMAR)
    // Todos estos puntos se dibujan simultáneamente DENTRO del mapa de nuestra web
    // =========================================================================
    const FULL_GUIA_DATA = [
      // 6 GUARDERÍAS
      { id: 'g1', cat: 'guarderia', icon: '🏁', color: '#E07A5F', lat: -37.0992, lng: -56.8688, badge: '⭐ GUARDERÍA CORE #1', name: 'Guardería Intermédanos (Sede Corvina)', addr: 'De la Corvina 2047, Pinamar', info: 'UTVs, cuatris, motos, taller oficial, mecánica ambulante SOS 24/7, alquiler y travesías.' },
      { id: 'g2', cat: 'guarderia', icon: '🏁', color: '#E07A5F', lat: -37.1072, lng: -56.8742, badge: '⭐ GUARDERÍA CORE #2', name: 'Guardería Intermédanos (Sede Constitución)', addr: 'Av. Constitución 2243, Pinamar', info: 'Recepción rápida sobre avenida principal, boxes cubiertos y logística puerta a puerta.' },
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
      { id: 'e5', cat: 'estacion', icon: '⛽', color: '#EF4444', lat: -37.0980, lng: -56.8835, badge: 'ACCESO PINAMAR', name: 'YPF Ruta 11 y Ruta 74', addr: 'Rotonda Ruta 11 y Ruta 74, Pinamar', info: '24 hs · Punto de encuentro de caravanas y trailers.' }
    ];

    // Coordenadas de la traza verde del Corredor Seguro (Guardería Intermédanos -> Pinamar Norte -> Kota Beach -> El Límite)
    const CORREDOR_SEGURO_COORDS = [
      [-37.0992, -56.8688],
      [-37.0920, -56.8540],
      [-37.0830, -56.8380],
      [-37.0795, -56.8325],
      [-37.0700, -56.8235],
      [-37.0612, -56.8140],
      [-37.0555, -56.8090],
      [-37.0465, -56.8005]
    ];

    window.__selectedMapPin = FULL_GUIA_DATA[0];
    window.__beraCurrentPlace = 'Kota Beach · La Frontera';
    window.__beraCurrentPinId = 'p1';
    window.__activeCommentIdx = 0;

    // ITINERARIO EN VIVO ("MI DÍA EN PINAMAR") CONECTADO A LOS PINES INTERNOS
    const MY_TRIP_ITEMS = [
      { time: '13:30 hs', icon: '⛽', title: 'Previa & Combustible 24hs', sub: 'Puma Energy Intermédanos y Constitución + Súper San José', pinId: 'e1' },
      { time: '15:00 hs', icon: '🏁', title: 'Salida UTV Guardería Intermédanos', sub: 'De la Corvina 2047 · Can-Am Maverick X3 listo en puerta (14 PSI)', pinId: 'g1' },
      { time: '16:30 hs', icon: '🏍️', title: 'La Olla Norte & Padok MX', sub: 'Clínica de manejo en arena y transmisión Frontera LIVE', pinId: 'p3' },
      { time: '18:30 hs', icon: '🌅', title: 'Sunset en Kota Beach / Luna Roja', sub: 'Mesa para 4 reservada con Bera · 15% Cashback Pixel', pinId: 'p1' },
      { time: '21:30 hs', icon: '🍽️', title: 'Cena en Tante Pinamar', sub: 'Av. de las Artes 35 · Goulash & Strudel sin hacer fila', pinId: 'r1' }
    ];

    const SOCIAL_GASTRO_FEED = [
      {
        id: 0,
        pinId: 'p2',
        cat: 'PARADOR',
        tag: '🌅 PARADOR · SUNSET',
        author: 'Nómade · Luna Roja Sunset Deck',
        zone: 'Pinamar Norte · Límite La Frontera',
        icon: '🔥',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
        dishTitle: 'Fuegos a la Leña & Sunset Acústico sobre el Médano',
        desc: 'Arquitectura en madera cruda, lino al sol y estacionamiento exclusivo para UTVs de Guardería Intermédanos. Hoy 18:30 hs DJ Set.',
        likesCount: 2410,
        saved: true,
        price: 'Reservar Deck (Bera)',
        commentsList: [
          '@sofi_ribeiro: El mejor atardecer de Pinamar Norte, la pesca a la leña es increíble.',
          '@lucho_utv: Dejás el Can-Am en el estacionamiento de arena y bajás directo al deck.'
        ]
      },
      {
        id: 1,
        pinId: 'p1',
        cat: 'PARADOR',
        tag: '🏖️ PARADOR · LA FRONTERA',
        author: 'Kota Beach · La Frontera',
        zone: 'Final del Corredor Seguro (Acceso 4x4 / UTV)',
        icon: '🏖️',
        photo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
        dishTitle: 'Tiradito de Pesca Fresca & Cocktails frente al Mar',
        desc: 'El punto de encuentro número uno al final de la traza verde del Corredor Seguro. Ocupación en vivo: 80%.',
        likesCount: 1940,
        saved: true,
        price: 'Reservar con Bera',
        commentsList: [
          '@marcos_ktm: Llegamos por el Corredor Seguro en 10 min desde Intermédanos.',
          '@agus_pinamar: Los tragos de autor y las rabas al atardecer no fallan.'
        ]
      },
      {
        id: 2,
        pinId: 'r1',
        cat: 'GASTRO',
        tag: '🍽️ CLÁSICO DE PINAMAR · BERA',
        author: 'Tante Pinamar',
        zone: 'Av. de las Artes 35 · Centro',
        icon: '🥧',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        dishTitle: 'Goulash con Spätzle & el Histórico Strudel de Manzana',
        desc: 'Una fija obligatoria de Pinamar después de bajar de los médanos. Reservá mesa sin hacer fila con Bera y Pixel Wallet.',
        likesCount: 3120,
        saved: false,
        price: 'Reservar Mesa (Bera)',
        commentsList: [
          '@fede_enduro: El Goulash después de 3 horas de médanos te devuelve el alma.',
          '@clari_alderete: El strudel tibio con crema y helado es patrimonio de Pinamar.'
        ]
      },
      {
        id: 3,
        pinId: 'r3',
        cat: 'GASTRO',
        tag: '🥘 TRADICIÓN DE MAR',
        author: 'Paxapoga & Sociedad Italiana',
        zone: 'Av. Bunge y Libertador / Eneas 200',
        icon: '🦐',
        photo: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=900&q=80',
        dishTitle: 'Paella Asturiana, Rabas Crocantes & Pastas Caseras',
        desc: 'Los sabores históricos de la costa atlántica integrados con carta QR y beneficios para miembros de Intermédanos.',
        likesCount: 1680,
        saved: false,
        price: 'Reservar / Pedir',
        commentsList: [
          '@nico_4x4: Porciones gigantes para compartir en familia.'
        ]
      },
      {
        id: 4,
        pinId: 'g1',
        cat: 'OFFROAD',
        tag: '🏍️ PADOK MX · TRAVESÍA',
        author: 'Guardería Intermédanos × Padok MX',
        zone: 'Salida De la Corvina 2047 → La Olla',
        icon: '🏁',
        photo: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
        dishTitle: 'Travesía Nocturna Guiada + Cena de Fuegos en Parador',
        desc: 'Salimos hoy 21:00 hs desde la guardería con camioneta de apoyo mecánico, cascos, guía oficial y cierre gastronómico Bera.',
        likesCount: 2850,
        saved: true,
        price: 'Inscribirme ($45.000)',
        commentsList: [
          '@tomas_maverick: La mejor experiencia de Pinamar, vas súper seguro con el apoyo mecánico.'
        ]
      },
      {
        id: 5,
        pinId: 'p6',
        cat: 'PARADOR',
        tag: '🎶 AFTER BEACH & COCINA DE AUTOR',
        author: 'UFO Point & Rada Beach',
        zone: 'Av. del Mar y Tobías / Odisea',
        icon: '🍸',
        photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
        dishTitle: 'After Beach Electrónico, Sushi & Cocina de Autor',
        desc: 'Los balnearios ícono sobre Av. del Mar con reservas de carpas y mesas integradas a tu Pixel Wallet.',
        likesCount: 2290,
        saved: false,
        price: 'Reservar con Bera',
        commentsList: [
          '@valen_dj: Increíble el sonido frente al mar a las 19 hs.'
        ]
      }
    ];

    // =========================================================================
    // MOTOR DE MAPA SATELITAL MULTIPUNTO INTEGRADO EN NUESTRA PÁGINA (LEAFLET + GOOGLE TILES)
    // =========================================================================
    let homeMap = null;
    let mainMap = null;
    let mainMarkersLayer = null;
    let homeMarkersLayer = null;
    let mainTileLayerSat = null;
    let mainTileLayerStreet = null;
    let usingSatLayer = true;
    const markerByIdMain = {};
    const markerByIdHome = {};

    function createPinIcon(item) {
      return L.divIcon({
        className: '',
        html: '<div class="pin-marker" style="background:' + item.color + ';" title="' + item.name + '">' + item.icon + '</div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -16]
      });
    }

    function buildPopupHtml(item) {
      const safeName = item.name.replace(/'/g, "\\\\'");
      return '<div style="min-width:210px;padding:4px;">' +
        '<div style="font-size:9.5px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#E07A5F;">' + item.badge + '</div>' +
        '<strong style="font-size:15px;display:block;margin:2px 0;color:#2C2E33;">' + item.name + '</strong>' +
        '<div style="font-size:11.5px;font-weight:700;color:#1D4E56;margin-bottom:5px;">📍 ' + item.addr + '</div>' +
        '<div style="font-size:11.5px;color:#6E6A63;margin-bottom:8px;line-height:1.35;">' + item.info + '</div>' +
        '<div style="display:flex;gap:6px;">' +
          '<button onclick="openBeraBooking(\\'' + safeName + '\\', \\'Reservar Bera\\', \\'' + item.id + '\\')" style="flex:1;padding:7px 10px;border-radius:999px;border:none;background:#E07A5F;color:#fff;font-weight:700;font-size:11px;cursor:pointer;">🍽️ Reservar / Pedir</button>' +
          '<button onclick="addPlaceToMyDay(\\'' + safeName + '\\', \\'' + item.addr.replace(/'/g, "\\\\'") + '\\', \\'' + item.id + '\\')" style="padding:7px 10px;border-radius:999px;border:1px solid #ccc;background:#F8F6F1;color:#2C2E33;font-weight:700;font-size:11px;cursor:pointer;">+ Mi Día</button>' +
        '</div>' +
      '</div>';
    }

    function initInAppMaps() {
      if (typeof L === 'undefined') return;

      // 1. Mini Mapa Multipunto en la Home (Columna 3)
      const homeEl = document.getElementById('home-leaflet-map');
      if (homeEl && !homeMap) {
        homeMap = L.map(homeEl, { zoomControl: false, attributionControl: false }).setView([-37.095, -56.855], 12);
        L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { maxZoom: 20 }).addTo(homeMap);
        L.polyline(CORREDOR_SEGURO_COORDS, { color: '#10B981', weight: 4, opacity: 0.95 }).addTo(homeMap);
        homeMarkersLayer = L.layerGroup().addTo(homeMap);
      }

      // 2. Mapa Multipunto Principal en la Pestaña "Mapa (47)"
      const mainEl = document.getElementById('main-leaflet-map');
      if (mainEl && !mainMap) {
        mainMap = L.map(mainEl, { attributionControl: false }).setView([-37.095, -56.855], 13);
        mainTileLayerSat = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { maxZoom: 20 }).addTo(mainMap);
        mainTileLayerStreet = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20 });

        // Traza verde brillante del Corredor Seguro sobre Google Maps
        L.polyline(CORREDOR_SEGURO_COORDS, { color: '#064E3B', weight: 9, opacity: 0.7 }).addTo(mainMap);
        L.polyline(CORREDOR_SEGURO_COORDS, { color: '#10B981', weight: 5, opacity: 1 }).bindPopup('<strong>🟢 Corredor Seguro Habilitado</strong><br/>De Guardería Intermédanos a La Frontera Norte').addTo(mainMap);

        mainMarkersLayer = L.layerGroup().addTo(mainMap);
      }

      populateMapMarkers('ALL');
    }

    function populateMapMarkers(catFilter) {
      if (!mainMarkersLayer || !homeMarkersLayer) return;
      mainMarkersLayer.clearLayers();
      homeMarkersLayer.clearLayers();

      const filtered = FULL_GUIA_DATA.filter(item => catFilter === 'ALL' || item.cat === catFilter);

      filtered.forEach(item => {
        const m1 = L.marker([item.lat, item.lng], { icon: createPinIcon(item) })
          .bindPopup(buildPopupHtml(item));
        m1.on('click', () => updateSelectedMapCard(item));
        mainMarkersLayer.addLayer(m1);
        markerByIdMain[item.id] = m1;

        const m2 = L.marker([item.lat, item.lng], { icon: createPinIcon(item) })
          .bindPopup(buildPopupHtml(item));
        m2.on('click', () => updateSelectedMapCard(item));
        homeMarkersLayer.addLayer(m2);
        markerByIdHome[item.id] = m2;
      });

      renderMapSideList(filtered);
    }

    function renderMapSideList(list) {
      const box = document.getElementById('map-side-list');
      if (!box) return;
      box.innerHTML = list.map(item =>
        '<button onclick="focusPinInsideOurWeb(\\'' + item.id + '\\', false)" style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:12px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:#FAF6F0;cursor:pointer;text-align:left;width:100%;font:600 12px var(--font-sans);">' +
          '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.icon + ' ' + item.name + '</span>' +
          '<span style="font-size:10.5px;color:#34D399;flex:none;">Enfocar →</span>' +
        '</button>'
      ).join('');
    }

    function updateSelectedMapCard(item) {
      window.__selectedMapPin = item;
      const b = document.getElementById('map-selected-badge');
      const t = document.getElementById('map-selected-title');
      const a = document.getElementById('map-selected-addr');
      const s = document.getElementById('map-selected-sub');
      const ml = document.getElementById('mini-map-label');
      if (b) b.textContent = item.badge;
      if (t) t.textContent = item.icon + ' ' + item.name;
      if (a) a.textContent = '📍 ' + item.addr;
      if (s) s.textContent = item.info;
      if (ml) ml.textContent = item.name;
    }

    // ENFOCA CUALQUIER PUNTO DENTRO DE NUESTRO PROPIO MAPA (SIN SALIR NUNCA DE LA WEB)
    function focusPinInsideOurWeb(pinId, switchToFullMapTab) {
      const item = FULL_GUIA_DATA.find(x => x.id === pinId) || FULL_GUIA_DATA[0];
      updateSelectedMapCard(item);

      if (switchToFullMapTab) {
        switchTab('mapa');
      }

      setTimeout(() => {
        if (homeMap) {
          homeMap.invalidateSize();
          homeMap.flyTo([item.lat, item.lng], 16, { duration: 0.7 });
          if (markerByIdHome[item.id]) markerByIdHome[item.id].openPopup();
        }
        if (mainMap) {
          mainMap.invalidateSize();
          mainMap.flyTo([item.lat, item.lng], 16, { duration: 0.7 });
          if (markerByIdMain[item.id]) markerByIdMain[item.id].openPopup();
        }
      }, 120);

      quickAction('📍 Enfocado en nuestro Mapa: ' + item.name);
    }

    function openMapWithCategory(cat) {
      switchTab('mapa');
      const pills = document.querySelectorAll('#map-category-pills .solis-pill');
      pills.forEach(p => {
        const match = p.getAttribute('onclick')?.includes("'" + cat + "'");
        p.classList.toggle('is-active', !!match);
      });
      populateMapMarkers(cat);
      setTimeout(() => { if (mainMap) mainMap.invalidateSize(); }, 120);
      quickAction('🗺️ Mostrando todos los pines de ' + cat.toUpperCase() + ' en nuestro mapa');
    }

    function filterMapMarkers(cat, btn) {
      if (btn) {
        document.querySelectorAll('#map-category-pills .solis-pill').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      }
      populateMapMarkers(cat);
    }

    function toggleGoogleMapTileLayer() {
      if (!mainMap) return;
      if (usingSatLayer) {
        mainMap.removeLayer(mainTileLayerSat);
        mainTileLayerStreet.addTo(mainMap);
        usingSatLayer = false;
        quickAction('🗺️ Vista Google Maps Calles activada');
      } else {
        mainMap.removeLayer(mainTileLayerStreet);
        mainTileLayerSat.addTo(mainMap);
        usingSatLayer = true;
        quickAction('🛰️ Vista Google Maps Satélite Híbrido activada');
      }
    }

    function addSelectedPinToMyDay() {
      const p = window.__selectedMapPin || FULL_GUIA_DATA[0];
      addPlaceToMyDay(p.name, p.addr, p.id);
    }

    function triggerInAppSOSBeacon() {
      closeModal('sos-modal');
      switchTab('mapa');
      setTimeout(() => {
        if (mainMap) {
          mainMap.invalidateSize();
          const sosMarker = L.marker([-37.0682, -56.8241], {
            icon: L.divIcon({
              className: '',
              html: '<div class="pin-marker" style="background:#EF4444;width:42px;height:42px;font-size:20px;">🚨</div>',
              iconSize: [42, 42],
              iconAnchor: [21, 21]
            })
          }).addTo(mainMap).bindPopup('<strong>🚨 TU BALIZA SOS ACTIVA</strong><br/>Camioneta Mecánica Ambulante Intermédanos en camino (ETA 9 min).').openPopup();
          mainMap.flyTo([-37.0682, -56.8241], 15);
        }
      }, 150);
      quickAction('🚨 Baliza SOS activada en vivo dentro del Mapa de Intermédanos');
    }

    // =========================================================================
    // RENDER DEL ITINERARIO "MI DÍA EN PINAMAR"
    // =========================================================================
    function renderTimelines() {
      const countEl = document.getElementById('nav-midia-count');
      if (countEl) countEl.textContent = String(MY_TRIP_ITEMS.length);

      const previewBox = document.getElementById('home-timeline-preview');
      if (previewBox) {
        previewBox.innerHTML = MY_TRIP_ITEMS.slice(0, 4).map(item =>
          '<div class="timeline-step" onclick="focusPinInsideOurWeb(\\'' + item.pinId + '\\', false)">' +
            '<span class="timeline-icon">' + item.icon + '</span>' +
            '<div style="flex:1;min-width:0;">' +
              '<strong style="font-size:13px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.time + ' · ' + item.title + '</strong>' +
              '<span style="font-size:11.5px;color:var(--solis-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;">' + item.sub + '</span>' +
            '</div>' +
            '<button class="maps-pill-btn" style="padding:5px 9px;font-size:10.5px;" onclick="event.stopPropagation();focusPinInsideOurWeb(\\'' + item.pinId + '\\', true)">📍 Mapa</button>' +
          '</div>'
        ).join('');
      }

      const fullBox = document.getElementById('full-timeline-list');
      if (fullBox) {
        fullBox.innerHTML = MY_TRIP_ITEMS.map(item =>
          '<div class="timeline-step" onclick="focusPinInsideOurWeb(\\'' + item.pinId + '\\', true)">' +
            '<span class="timeline-icon">' + item.icon + '</span>' +
            '<div style="flex:1;min-width:0;">' +
              '<strong style="font-size:14px;display:block;">' + item.time + ' · ' + item.title + '</strong>' +
              '<span style="font-size:12px;color:var(--solis-muted);">' + item.sub + '</span>' +
            '</div>' +
            '<span style="font-size:12px;font-weight:700;color:var(--solis-terracotta);">📍 Ver en Mapa ›</span>' +
          '</div>'
        ).join('');
      }
    }

    function addPlaceToMyDay(title, sub, pinId) {
      MY_TRIP_ITEMS.push({
        time: '19:45 hs',
        icon: '🌅',
        title: title,
        sub: sub,
        pinId: pinId || 'p1'
      });
      renderTimelines();
      quickAction('🗓️ "' + title + '" se sumó a tu itinerario Mi Día en Pinamar');
    }

    // =========================================================================
    // RENDER DEL SOCIAL GASTRO & PARADORES FEED
    // =========================================================================
    function renderSocialCardsInto(containerId, filter = 'ALL') {
      const box = document.getElementById(containerId);
      if (!box) return;
      const list = SOCIAL_GASTRO_FEED.filter(x => {
        if (filter === 'ALL') return true;
        if (filter === 'SAVED') return x.saved;
        return x.cat === filter || x.tag.includes(filter);
      });

      box.innerHTML = list.map((item) => {
        const heartBg = item.saved ? '#E07A5F' : 'rgba(255,255,255,0.92)';
        const heartColor = item.saved ? '#fff' : '#E07A5F';
        const safeAuthor = item.author.replace(/'/g, "\\\\'");
        const safeDish = item.dishTitle.replace(/'/g, "\\\\'");

        return '<article class="social-gastro-card">' +
          '<div>' +
            '<div class="social-gastro-card__media" style="background-image:url(\\'' + item.photo + '\\')">' +
              '<div class="media-top-row">' +
                '<span class="tag-chip">' + item.tag + '</span>' +
                '<button class="heart-btn" style="background:' + heartBg + ';color:' + heartColor + ';" onclick="toggleCardSaved(' + item.id + ')" aria-label="Guardar">♥</button>' +
              '</div>' +
              '<div class="media-bottom-row">' +
                '<span style="color:#fff;font-size:12px;font-weight:600;text-shadow:0 2px 6px rgba(0,0,0,0.6);">📍 ' + item.zone + '</span>' +
                '<button class="maps-pill-btn" style="padding:5px 10px;font-size:11px;background:rgba(255,255,255,0.94);color:#2C2E33;" onclick="focusPinInsideOurWeb(\\'' + item.pinId + '\\', true)">📍 Ver en Nuestro Mapa</button>' +
              '</div>' +
            '</div>' +
            '<div class="social-gastro-card__body">' +
              '<div class="author-row">' +
                '<div style="display:flex;align-items:center;gap:10px;min-width:0;cursor:pointer;" onclick="focusPinInsideOurWeb(\\'' + item.pinId + '\\', false)">' +
                  '<span class="author-avatar">' + item.icon + '</span>' +
                  '<div style="min-width:0;">' +
                    '<strong style="display:block;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.author + '</strong>' +
                    '<span style="font-size:11.5px;color:var(--solis-muted);">Tocá para enfocar en el Mapa</span>' +
                  '</div>' +
                '</div>' +
                '<button class="terracotta-pill-btn" style="padding:8px 14px;font-size:12px;" onclick="openBeraBooking(\\'' + safeAuthor + '\\', \\'' + item.price.replace(/'/g, "\\\\'") + '\\', \\'' + item.pinId + '\\')">' +
                  item.price +
                '</button>' +
              '</div>' +
              '<h3 class="serif-solis" style="font-size:24px;line-height:1.15;margin:2px 0 0;">' + item.dishTitle + '</h3>' +
              '<p style="font-size:13px;color:var(--solis-muted);line-height:1.45;margin:0;">' + item.desc + '</p>' +
              '<div class="social-metrics">' +
                '<div style="display:flex;gap:14px;align-items:center;">' +
                  '<button style="background:none;border:none;padding:0;color:var(--solis-charcoal);font:700 12.5px var(--font-sans);cursor:pointer;" onclick="likeCard(' + item.id + ')">❤️ ' + item.likesCount + '</button>' +
                  '<button style="background:none;border:none;padding:0;color:var(--solis-muted);font:600 12.5px var(--font-sans);cursor:pointer;" onclick="openCommentsModal(' + item.id + ')">💬 ' + item.commentsList.length + '</button>' +
                  '<button style="background:none;border:none;padding:0;color:var(--solis-muted);font:600 12.5px var(--font-sans);cursor:pointer;" onclick="focusPinInsideOurWeb(\\'' + item.pinId + '\\', true)">🗺️ Pin GPS</button>' +
                '</div>' +
                '<button style="background:none;border:none;padding:0;font:800 12.5px var(--font-sans);color:var(--solis-terracotta);cursor:pointer;" onclick="addPlaceToMyDay(\\'' + safeAuthor + '\\', \\'' + safeDish + '\\', \\'' + item.pinId + '\\')">+ Mi Día</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    function likeCard(id) {
      const item = SOCIAL_GASTRO_FEED.find(x => x.id === id);
      if (!item) return;
      item.likesCount += 1;
      renderSocialCardsInto('discover-social-grid', window.__discoverFilter || 'ALL');
      renderSocialCardsInto('full-gastro-grid', window.__gastroFilter || 'ALL');
      quickAction('❤️ Te gusta ' + item.author);
    }

    function toggleCardSaved(id) {
      const item = SOCIAL_GASTRO_FEED.find(x => x.id === id);
      if (!item) return;
      item.saved = !item.saved;
      renderSocialCardsInto('discover-social-grid', window.__discoverFilter || 'ALL');
      renderSocialCardsInto('full-gastro-grid', window.__gastroFilter || 'ALL');
      quickAction(item.saved ? '❤️ Guardado en tus Favoritos de Pinamar' : 'Eliminado de tus Guardados');
    }

    function openCommentsModal(id) {
      window.__activeCommentIdx = id;
      const item = SOCIAL_GASTRO_FEED.find(x => x.id === id);
      if (!item) return;
      document.getElementById('comments-modal-title').textContent = item.author;
      const box = document.getElementById('comments-list-box');
      box.innerHTML = item.commentsList.map(c =>
        '<div style="padding:10px 12px;border-radius:14px;background:var(--solis-ivory);border:1px solid var(--border);">' + c + '</div>'
      ).join('');
      openModal('comments-modal');
    }

    function submitNewComment() {
      const inp = document.getElementById('new-comment-input');
      const val = (inp.value || '').trim();
      if (!val) return;
      const item = SOCIAL_GASTRO_FEED.find(x => x.id === window.__activeCommentIdx);
      if (item) {
        item.commentsList.push('@vos_pinamar: ' + val);
        inp.value = '';
        openCommentsModal(item.id);
        renderSocialCardsInto('discover-social-grid', window.__discoverFilter || 'ALL');
        renderSocialCardsInto('full-gastro-grid', window.__gastroFilter || 'ALL');
        quickAction('💬 Comentario publicado en ' + item.author);
      }
    }

    function openBeraBooking(place, priceLabel, pinId) {
      window.__beraCurrentPlace = place;
      window.__beraCurrentPinId = pinId || 'p1';
      document.getElementById('bera-modal-place').textContent = place;
      openModal('bera-modal');
    }

    function confirmBeraReservation() {
      const time = document.getElementById('bera-time-select').value;
      const guests = document.getElementById('bera-guests-select').value;
      const sector = document.getElementById('bera-sector-select').value;
      closeModal('bera-modal');
      MY_TRIP_ITEMS.push({
        time: time.split('·')[0].trim(),
        icon: '🍽️',
        title: 'Reserva Bera: ' + window.__beraCurrentPlace,
        sub: guests + ' · ' + sector + ' · Confirmado con Pixel Wallet',
        pinId: window.__beraCurrentPinId
      });
      renderTimelines();
      quickAction('✅ Reserva Bera confirmada en ' + window.__beraCurrentPlace + ' (' + guests + ') y sumada a Mi Día');
    }

    function confirmUTVOrder() {
      const unit = document.getElementById('utv-unit-select').value;
      const hour = document.getElementById('utv-hour-select').value;
      const psi = document.getElementById('utv-psi-select').value;
      closeModal('utv-modal');
      quickAction('🔑 Guardería Intermédanos preparando ' + unit + ' para ' + hour + ' (' + psi + ')');
    }

    function createNewUserGastroPost() {
      const place = (document.getElementById('post-place-input').value || 'Luna Roja · Pinamar Norte').trim();
      const dish = (document.getElementById('post-dish-input').value || 'Atardecer y fuegos frente al mar').trim();
      SOCIAL_GASTRO_FEED.unshift({
        id: Date.now(),
        pinId: 'p2',
        cat: 'PARADOR',
        tag: '✨ RECIÉN SUBIDO POR VOS',
        author: place,
        zone: 'Pinamar · Ubicación en nuestro Mapa',
        icon: '🌅',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
        dishTitle: dish,
        desc: 'Recomendación subida en vivo a la comunidad gastronómica de Intermédanos × Bera.',
        likesCount: 1,
        saved: true,
        price: 'Reservar Bera',
        commentsList: ['@comunidad_intermedanos: ¡Tremenda foto!']
      });
      closeModal('post-modal');
      renderSocialCardsInto('discover-social-grid', 'ALL');
      renderSocialCardsInto('full-gastro-grid', 'ALL');
      quickAction('📸 ¡Tu publicación ya está en vivo en el Feed de Pinamar!');
    }

    function filterSocialCards(filter, btn) {
      window.__discoverFilter = filter;
      if (btn) {
        document.querySelectorAll('#discover-pills .solis-pill').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      }
      renderSocialCardsInto('discover-social-grid', filter);
    }

    function filterGastroPage(filter, btn) {
      window.__gastroFilter = filter;
      if (btn) {
        document.querySelectorAll('#gastro-pills .solis-pill').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      }
      renderSocialCardsInto('full-gastro-grid', filter);
    }

    let currentGuiaCat = 'ALL';
    function setGuiaCategory(cat, btn) {
      currentGuiaCat = cat;
      if (btn) {
        document.querySelectorAll('#guia-cat-pills .solis-pill').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      }
      renderFullGuia();
    }

    function openGuiaWithCat(cat) {
      switchTab('guia');
      currentGuiaCat = cat;
      renderFullGuia();
    }

    function jumpSearchFromHero(val) {
      switchTab('guia');
      const inp = document.getElementById('guia-search-input');
      if (inp) {
        inp.value = val || '';
        renderFullGuia();
        inp.focus();
      }
    }

    function renderFullGuia() {
      const q = (document.getElementById('guia-search-input')?.value || '').toLowerCase().trim();
      const box = document.getElementById('guia-directory-list');
      const list = FULL_GUIA_DATA.filter(item => {
        const matchC = currentGuiaCat === 'ALL' || item.cat === currentGuiaCat;
        const matchQ = !q || item.name.toLowerCase().includes(q) || item.addr.toLowerCase().includes(q) || item.info.toLowerCase().includes(q);
        return matchC && matchQ;
      });
      box.innerHTML = list.map(item => {
        const safeName = item.name.replace(/'/g, "\\\\'");
        return '<div class="solis-panel" style="padding:18px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">' +
          '<div>' +
            '<span style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:var(--solis-terracotta);">' + item.badge + '</span>' +
            '<h3 style="font-size:16.5px;font-weight:800;margin:4px 0;">' + item.icon + ' ' + item.name + '</h3>' +
            '<p style="font-size:12.5px;font-weight:700;color:var(--solis-seadeep);margin:0 0 6px;">📍 ' + item.addr + '</p>' +
            '<p style="font-size:12.5px;color:var(--solis-muted);margin:0;line-height:1.45;">' + item.info + '</p>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
            '<button class="terracotta-pill-btn" style="padding:9px 12px;font-size:11.5px;" onclick="focusPinInsideOurWeb(\\'' + item.id + '\\', true)">' +
              '📍 Ver en Nuestro Mapa' +
            '</button>' +
            '<button class="maps-pill-btn" style="padding:9px 12px;font-size:11.5px;" onclick="addPlaceToMyDay(\\'' + safeName + '\\', \\'' + item.addr.replace(/'/g, "\\\\'") + '\\', \\'' + item.id + '\\')">' +
              '🗓️ + Sumar a Mi Día' +
            '</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function switchTab(tabId) {
      const tabs = ['discover', 'gastro', 'mapa', 'midia', 'padok', 'guia'];
      tabs.forEach(t => {
        const el = document.getElementById('tab-' + t);
        if (el) el.classList.toggle('hidden-el', t !== tabId);
      });
      document.querySelectorAll('.desktop-nav__btn').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-tab') === tabId);
      });
      document.querySelectorAll('.dock-item').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-dock') === tabId);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (homeMap) homeMap.invalidateSize();
        if (mainMap) mainMap.invalidateSize();
      }, 120);
    }

    function toggleSolisTheme() {
      const html = document.documentElement;
      const next = html.getAttribute('data-theme') === 'social-dark' ? 'solis-light' : 'social-dark';
      html.setAttribute('data-theme', next);
      document.getElementById('theme-toggle-icon').textContent = next === 'social-dark' ? '☀️' : '🌙';
      quickAction(next === 'social-dark' ? '🌙 Modo Social Dark activado' : '☀️ Modo SOLIS Warm Minimal activado');
    }

    function openSponsorDetail(title, body, ctaText) {
      document.getElementById('story-modal-title').textContent = title;
      document.getElementById('story-modal-body').textContent = body;
      document.getElementById('story-modal-cta').textContent = ctaText + ' →';
      openModal('story-modal');
    }

    function executeHarkVoicePlan() {
      closeModal('hark-modal');
      openBeraBooking('Kota Beach · La Frontera', 'Reserva por Voz Hark', 'p1');
      quickAction('🎙️ Cerebro Hark: Can-Am pedido 15:00 hs + abriendo confirmación de mesa en Kota Beach');
    }

    function signInUser(provider, email) {
      closeModal('login-modal');
      document.getElementById('top-auth-label').textContent = '✓ ' + email.split('@')[0];
      quickAction('✅ Sesión iniciada con ' + provider + ' · Box #114 y Billetera Pixel vinculados');
    }

    function postWazeAlert(txt, lat, lng) {
      closeModal('report-modal');
      switchTab('mapa');
      setTimeout(() => {
        if (mainMap) {
          mainMap.invalidateSize();
          L.marker([lat, lng], {
            icon: L.divIcon({
              className: '',
              html: '<div class="pin-marker" style="background:#E07A5F;width:38px;height:38px;font-size:18px;">⚠️</div>',
              iconSize: [38, 38],
              iconAnchor: [19, 19]
            })
          }).addTo(mainMap).bindPopup('<strong>' + txt + '</strong><br/>Recién reportado por vos en el Mapa.').openPopup();
          mainMap.flyTo([lat, lng], 15);
        }
      }, 140);
      quickAction('✅ Alerta agregada en vivo sobre nuestro Mapa de Médanos');
    }

    function openModal(id) { document.getElementById(id).classList.remove('hidden-el'); }
    function closeModal(id) { document.getElementById(id).classList.add('hidden-el'); }

    function quickAction(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.remove('hidden-el');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => t.classList.add('hidden-el'), 4000);
    }

    window.addEventListener('load', () => {
      initInAppMaps();
    });
    renderTimelines();
    renderSocialCardsInto('discover-social-grid', 'ALL');
    renderSocialCardsInto('full-gastro-grid', 'ALL');
    renderFullGuia();
    setTimeout(initInAppMaps, 250);
  </script>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ ok: true, app: 'intermedanos-pinamar', edition: 'inapp-47-multipin-google-map' }), {
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }
    return new Response(HTML_APP, {
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache' }
    });
  }
};
