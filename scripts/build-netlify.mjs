// Arma netlify-dist/ con SOLO lo que se publica del sitio de clases:
// home, buscador, y por clase: clase guiada, presentación e imágenes.
// El banco de preguntas se publica como JUEGO (minijuegos/constructor-de-paginas
// compilado en netlify-dist/juegos/), no como el .md con preguntas y respuestas.
// Teoría, tarea, examen, banco .md, README y plantillas NO se copian
// (lista blanca: un archivo nuevo no se publica por accidente).
//
// Uso: npm run build

import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'clases');
const destino = join(raiz, 'netlify-dist');

// Archivos sueltos de la raíz del sitio y carpetas de recursos compartidos
const base = ['index.htm', 'inicio.md', '_sidebar.md', '_redirects', 'assets'];
// Archivos que se publican dentro de cada carpeta clase-XX-*/ (si existen)
const porClase = ['clase-guiada.md', 'presentacion.html', 'recursos.md', 'guia-estudio.md'];
// Bonus aparte del curso (clases/bonus-ia/): solo estas páginas se publican
const bonus = { carpeta: 'bonus-ia', paginas: ['guia.md', 'plantilla-sitio.md', 'cheatsheet.md'] };
// Imágenes de la clase: se copia la carpeta img/ menos el LEEME interno
const carpetaImg = 'img';

function copiar(de, a) {
  cpSync(de, a, { recursive: true, filter: (f) => !f.endsWith('LEEME.md') });
}

const juegos = join(raiz, 'minijuegos', 'constructor-de-paginas');

function correr(cmd, cwd) {
  const r = spawnSync(cmd, { cwd, stdio: 'inherit', shell: true });
  if (r.status !== 0) throw new Error(`Falló: ${cmd} (en ${cwd})`);
}

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });

// Juego (banco de preguntas): instala dependencias si faltan y compila.
// `pnpm run build` regenera src/quizData.generated.js desde los banco-preguntas.md.
if (!existsSync(join(juegos, 'node_modules', 'vite'))) {
  correr('npx --yes pnpm@10 install --frozen-lockfile', juegos);
}
correr('npx --yes pnpm@10 run build', juegos);
cpSync(join(juegos, 'dist'), join(destino, 'juegos'), { recursive: true });

for (const nombre of base) {
  const de = join(origen, nombre);
  if (!existsSync(de)) throw new Error(`Falta clases/${nombre}`);
  copiar(de, join(destino, nombre));
}

const clases = readdirSync(origen).filter(
  (n) => /^clase-\d+/.test(n) && statSync(join(origen, n)).isDirectory(),
);
for (const clase of clases) {
  for (const nombre of [...porClase, carpetaImg]) {
    const de = join(origen, clase, nombre);
    if (existsSync(de)) copiar(de, join(destino, clase, nombre));
  }
}

for (const nombre of bonus.paginas) {
  const de = join(origen, bonus.carpeta, nombre);
  if (!existsSync(de)) throw new Error(`Falta clases/${bonus.carpeta}/${nombre}`);
  copiar(de, join(destino, bonus.carpeta, nombre));
}

// Verificación: todo link del menú y del inicio debe existir en lo publicado
const faltan = [];
for (const doc of ['_sidebar.md', 'inicio.md']) {
  const texto = readFileSync(join(destino, doc), 'utf8');
  const links = [
    ...[...texto.matchAll(/\]\(([^)\s]+)/g)].map((m) => m[1]),
    ...[...texto.matchAll(/href="([^"]+)"/g)].map((m) => m[1]),
  ].filter((l) => !/^(https?:|#|\/$)/.test(l));
  for (const l of links) if (!existsSync(join(destino, l.split('?')[0]))) faltan.push(`${doc} -> ${l}`);
}

const archivos = [];
(function recorrer(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    statSync(p).isDirectory() ? recorrer(p) : archivos.push(p);
  }
})(destino);
const kb = Math.round(archivos.reduce((s, f) => s + statSync(f).size, 0) / 1024);

console.log(`netlify-dist/ listo: ${archivos.length} archivos, ${kb} KB`);
for (const c of clases) {
  const hay = archivos.filter((f) => relative(destino, f).startsWith(c)).length;
  console.log(`  ${c}: ${hay} archivos`);
}
if (faltan.length) {
  console.error('\nLinks rotos (el menú apunta a archivos que no se publican):');
  for (const f of faltan) console.error('  - ' + f);
  process.exit(1);
}
