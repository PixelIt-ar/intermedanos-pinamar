// Arma dist/ a partir de src/ y public/. Wrangler lo corre solo antes de `wrangler dev` y
// `wrangler deploy` (ver "build" en wrangler.jsonc); también se puede correr con `npm run build`.
//
//   src/pagina/index.html + parciales  ->  dist/index.html
//   src/js/main.js + módulos            ->  dist/app.js   (esbuild)
//   src/estilos/index.css + secciones   ->  dist/app.css  (esbuild)
//   public/                             ->  dist/         (tal cual: fotos y logo)
//
// Después corre chequeos que el navegador no avisaría hasta que alguien toque el botón:
// íconos inexistentes, funciones que el HTML llama y no están en window, imports que faltan
// e ids repetidos. Si alguno falla, el build falla y wrangler no publica.
import { build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(RAIZ, 'src');
const DIST = join(RAIZ, 'dist');
const leer = (p) => readFileSync(p, 'utf8');

// ---------------------------------------------------------------- armado
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(RAIZ, 'public'), DIST, { recursive: true });

await build({
  entryPoints: [join(SRC, 'js', 'main.js')],
  outfile: join(DIST, 'app.js'),
  bundle: true,
  format: 'esm',
  charset: 'utf8',
  logLevel: 'warning',
});
await build({
  entryPoints: [join(SRC, 'estilos', 'index.css')],
  outfile: join(DIST, 'app.css'),
  bundle: true,
  charset: 'utf8',
  logLevel: 'warning',
});

// <!-- incluir: ruta --> se reemplaza por ese archivo de src/pagina/, con la misma sangría.
const PAGINA = join(SRC, 'pagina');
function armar(ruta, pila = []) {
  const abs = join(PAGINA, ruta);
  if (!existsSync(abs)) throw new Error('No existe src/pagina/' + ruta + (pila.length ? ' (lo incluye ' + pila.at(-1) + ')' : ''));
  if (pila.includes(ruta)) throw new Error('Inclusión circular: ' + pila.concat(ruta).join(' -> '));
  return leer(abs).replace(/\s+$/, '').split(/\r?\n/).map((linea) => {
    const m = /^(\s*)<!-- incluir: (\S+) -->\s*$/.exec(linea);
    if (!m) return linea;
    return armar(m[2], pila.concat(ruta)).split('\n').map((l) => (l ? m[1] + l : l)).join('\n');
  }).join('\n');
}
const html = armar('index.html') + '\n';
writeFileSync(join(DIST, 'index.html'), html);

// ---------------------------------------------------------------- chequeos
const errores = [];
const modulos = archivos(join(SRC, 'js')).filter((p) => p.endsWith('.js'));
const fuentes = Object.fromEntries(modulos.map((p) => [relative(SRC, p).replaceAll('\\', '/'), leer(p)]));
const todoElJs = Object.values(fuentes).join('\n');

// 1) Íconos: cada #i-nombre, icon('nombre') o icon: 'nombre' tiene que existir en src/pagina/iconos.html
const simbolos = new Set([...html.matchAll(/<symbol id="i-([a-z0-9-]+)"/g)].map((m) => m[1]));
const usados = new Set([
  ...[...(html + todoElJs).matchAll(/#i-([a-z0-9-]+)/g)].map((m) => m[1]),
  ...[...todoElJs.matchAll(/icon\(\s*'([a-z0-9-]+)'\s*\)/g)].map((m) => m[1]),
  ...[...todoElJs.matchAll(/icon: '([a-z0-9-]+)'/g)].map((m) => m[1]),
]);
for (const n of usados) if (!simbolos.has(n)) errores.push('Ícono inexistente: i-' + n + ' (sumalo a src/pagina/iconos.html)');

// 2) Lo que llaman los onclick="..." del HTML y de las cadenas del JS tiene que estar en window (main.js)
const main = fuentes['js/main.js'];
const puente = /Object\.assign\(window, \{([^}]*)\}\)/.exec(main);
const enWindow = new Set(puente ? puente[1].split(',').map((s) => s.trim()).filter(Boolean) : []);
const topNivel = {}; // nombre -> módulo que lo declara
for (const [mod, src] of Object.entries(fuentes)) {
  for (const m of src.matchAll(/^(?:export\s+)?(?:async\s+)?(?:function\*?|const|let|var|class)\s+([A-Za-z_$][\w$]*)/gm)) {
    if (topNivel[m[1]]) errores.push(m[1] + ' está declarado en ' + topNivel[m[1]] + ' y en ' + mod);
    topNivel[m[1]] = mod;
  }
}
const handlers = [...html.matchAll(/ on[a-z]+="([^"]*)"/g)].map((m) => m[1])
  .concat([...todoElJs.matchAll(/on[a-z]+="([A-Za-z_$][\w$]*)\(/g)].map((m) => m[1] + '('));
for (const h of handlers) {
  for (const m of h.matchAll(/(?<![\w$.])([A-Za-z_$][\w$]*)\s*\(/g)) {
    if (topNivel[m[1]] && !enWindow.has(m[1])) errores.push(m[1] + '() se llama desde un onclick pero no está en Object.assign(window, ...) de src/js/main.js');
  }
}

// 3) Imports que faltan: un nombre de otro módulo usado sin importarlo daría ReferenceError recién al ejecutarse.
//    (No mira dentro de los ${...} de los template literals.)
for (const [mod, src] of Object.entries(fuentes)) {
  const importados = new Set();
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from/g)) {
    m[1].split(',').map((s) => s.trim().split(/\s+as\s+/).pop()).filter(Boolean).forEach((n) => importados.add(n));
  }
  for (const n of referencias(src)) {
    if (topNivel[n] && topNivel[n] !== mod && !importados.has(n)) errores.push(mod + ' usa ' + n + ' sin importarlo de ' + topNivel[n]);
  }
}

// 4) ids repetidos en el HTML
const vistos = new Set();
for (const m of html.matchAll(/ id="([^"]+)"/g)) {
  if (vistos.has(m[1])) errores.push('id repetido en el HTML: ' + m[1]);
  vistos.add(m[1]);
}

if (errores.length) {
  console.error('\nEl build falló:\n- ' + [...new Set(errores)].join('\n- ') + '\n');
  process.exit(1);
}
const kb = (f) => (statSync(join(DIST, f)).size / 1024).toFixed(0) + ' KB';
console.log('dist listo · index.html ' + kb('index.html') + ' · app.js ' + kb('app.js') + ' · app.css ' + kb('app.css') +
  ' · ' + modulos.length + ' módulos · ' + simbolos.size + ' íconos');

// ---------------------------------------------------------------- utilidades
function archivos(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? archivos(join(dir, e.name)) : [join(dir, e.name)]));
}

// Identificadores que usa el código, sin comentarios, cadenas, propiedades (a.b) ni claves de objeto.
function referencias(code) {
  const s = sinCadenas(code), set = new Set();
  for (const m of s.matchAll(/[A-Za-z_$][\w$]*/g)) {
    const a = m.index, b = a + m[0].length;
    if (a > 0 && /[\w$]/.test(s[a - 1])) continue;
    if (s[a - 1] === '.' && !(s[a - 2] === '.' && s[a - 3] === '.')) continue;
    let k = b; while (/\s/.test(s[k] || '')) k++;
    let p = a - 1; while (p >= 0 && /\s/.test(s[p])) p--;
    if (s[k] === ':' && (s[p] === '{' || s[p] === ',')) continue;
    set.add(m[0]);
  }
  return set;
}
function sinCadenas(code) {
  let o = '', i = 0, prev = '';
  while (i < code.length) {
    const c = code[i], n = code[i + 1];
    if (c === '/' && n === '/') { while (i < code.length && code[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { const j = code.indexOf('*/', i + 2); i = j < 0 ? code.length : j + 2; o += ' '; continue; }
    if (c === "'" || c === '"' || c === '`') {
      let j = i + 1;
      while (j < code.length && code[j] !== c) { if (code[j] === '\\') j++; j++; }
      o += c + c; i = j + 1; prev = c; continue;
    }
    if (c === '/' && (prev === '' || '(,=:[!&|?{};'.includes(prev))) { // regex literal
      let j = i + 1, clase = false;
      while (j < code.length && (code[j] !== '/' || clase)) {
        if (code[j] === '\\') j++; else if (code[j] === '[') clase = true; else if (code[j] === ']') clase = false;
        j++;
      }
      j++; while (/[a-z]/i.test(code[j] || '')) j++;
      o += '/r/'; i = j; prev = 'r'; continue;
    }
    o += c; if (!/\s/.test(c)) prev = c; i++;
  }
  return o;
}
