#!/usr/bin/env node
// Arma el "libro digital" del curso (clases 1-8, sin bonus-ia) a partir de
// cada clase-guiada.md + su banco-preguntas.md, y lo pasa a PDF con Edge
// headless (print-to-pdf). Sin dependencias npm.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CLASES_DIR = join(ROOT, 'clases');
const OUT_DIR = join(ROOT, 'dist-pdf');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const CLASES = [
  'clase-01-definicion-proyecto-html',
  'clase-02-secciones-contenido',
  'clase-03-estilo-visual-css',
  'clase-04-diseno-responsive',
  'clase-05-banner-logo-ia',
  'clase-06-enlaces-redes-contacto',
  'clase-07-ajustes-finales',
  'clase-08-publicacion-presentacion',
];

// ---------- markdown -> html (subconjunto usado en clase-guiada.md) ----------

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return s;
}

function splitRow(line) {
  return line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
}

function renderTable(buf) {
  const rows = buf.map(splitRow);
  const header = rows[0];
  const body = rows.slice(2);
  let out = '<table><thead><tr>' + header.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
  for (const r of body) out += '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
  out += '</tbody></table>\n';
  return out;
}

const BLOCK_START = /^(\s*#{1,6}\s|\s*>\s?|\s*\|| {0,3}```| {0,3}-{3,}\s*$|\s*-\s|\s*\d+\.\s)/;

function render(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let i = 0;
  const listStack = []; // {type, indent}

  function closeLists(toIndent = -1) {
    while (listStack.length && listStack[listStack.length - 1].indent > toIndent) {
      html += `</${listStack.pop().type}>\n`;
    }
  }

  function ensureList(type, indent) {
    if (!listStack.length || listStack[listStack.length - 1].indent < indent) {
      listStack.push({ type, indent });
      html += `<${type}>\n`;
    } else if (listStack[listStack.length - 1].indent > indent) {
      closeLists(indent - 1);
      listStack.push({ type, indent });
      html += `<${type}>\n`;
    }
    // misma indentación: continúa la lista abierta
  }

  while (i < lines.length) {
    const line = lines[i];

    const fence = line.match(/^ {0,3}```(\w*)/);
    if (fence) {
      closeLists();
      const buf = [];
      i++;
      while (i < lines.length && !/^ {0,3}```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      html += `<pre class="code"><code>${esc(buf.join('\n'))}</code></pre>\n`;
      continue;
    }

    if (/^\s*$/.test(line)) {
      closeLists();
      i++;
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      closeLists();
      const level = h[1].length;
      html += `<h${level}>${inline(h[2])}</h${level}>\n`;
      i++;
      continue;
    }

    if (/^ {0,3}-{3,}\s*$/.test(line)) {
      closeLists();
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeLists();
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      html += `<blockquote>${buf.map((l) => `<p>${inline(l)}</p>`).join('')}</blockquote>\n`;
      continue;
    }

    if (/^\s*\|/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      html += renderTable(buf);
      continue;
    }

    const cb = line.match(/^(\s*)-\s\[( |x|X)\]\s+(.*)$/);
    if (cb) {
      ensureList('ul', cb[1].length);
      const checked = cb[2].trim() !== '';
      html += `<li class="task">${checked ? '\u2611' : '\u2610'} ${inline(cb[3])}</li>\n`;
      i++;
      continue;
    }

    const ul = line.match(/^(\s*)-\s+(.*)$/);
    if (ul) {
      ensureList('ul', ul[1].length);
      html += `<li>${inline(ul[2])}</li>\n`;
      i++;
      continue;
    }

    const ol = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (ol) {
      ensureList('ol', ol[1].length);
      html += `<li>${inline(ol[3])}</li>\n`;
      i++;
      continue;
    }

    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !BLOCK_START.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    closeLists();
    html += `<p>${inline(buf.join(' '))}</p>\n`;
  }
  closeLists();
  return html;
}

// ---------- banco de preguntas: tabla filtrada + respuestas ----------

function parseBanco(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n').filter((l) => /^\s*\|/.test(l));
  const rows = lines.map(splitRow);
  // fila 0 = encabezado, fila 1 = separador ---
  const data = rows.slice(2);
  // columnas: # | Pregunta | Tipo | Opciones | Respuesta correcta | Tema | Dificultad
  return data.map((r) => ({
    n: r[0],
    pregunta: r[1],
    tipo: r[2],
    opciones: r[3],
    respuesta: r[4],
    tema: r[5],
    dificultad: r[6],
  }));
}

function renderBancoImprimible(preguntas) {
  let out = '<table class="banco"><thead><tr><th>#</th><th>Pregunta</th><th>Tipo</th><th>Opciones</th></tr></thead><tbody>';
  for (const p of preguntas) {
    out += `<tr><td>${esc(p.n)}</td><td>${inline(p.pregunta)}</td><td>${esc(p.tipo)}</td><td>${inline(p.opciones)}</td></tr>`;
  }
  out += '</tbody></table>\n';
  return out;
}

function renderRespuestas(claseLabel, preguntas) {
  let out = `<h3>${esc(claseLabel)}</h3>\n<table class="respuestas"><thead><tr><th>#</th><th>Respuesta correcta</th></tr></thead><tbody>`;
  for (const p of preguntas) {
    out += `<tr><td>${esc(p.n)}</td><td>${inline(p.respuesta)}</td></tr>`;
  }
  out += '</tbody></table>\n';
  return out;
}

// ---------- armado del libro ----------

function claseTitulo(md) {
  const m = md.match(/^#\s+Clase Guiada\s+—\s+(.*)$/m);
  return m ? m[1].trim() : '';
}

let chapters = '';
let toc = '';
let respuestasAll = '';

CLASES.forEach((slug, idx) => {
  const n = idx + 1;
  const dir = join(CLASES_DIR, slug);
  const guiadaMd = readFileSync(join(dir, 'clase-guiada.md'), 'utf8');
  const bancoMd = readFileSync(join(dir, 'banco-preguntas.md'), 'utf8');
  const titulo = claseTitulo(guiadaMd) || `Clase ${n}`;
  const preguntas = parseBanco(bancoMd);

  toc += `<li><a href="#clase-${n}">Clase ${n} — ${esc(titulo)}</a></li>\n`;

  chapters += `<section class="chapter" id="clase-${n}">\n`;
  chapters += render(guiadaMd);
  chapters += `<h2>Banco de preguntas para repasar</h2>\n`;
  chapters += `<p class="nota">Respondé por escrito o mentalmente. Las respuestas están en el apéndice final del libro.</p>\n`;
  chapters += renderBancoImprimible(preguntas);
  chapters += '</section>\n';

  respuestasAll += renderRespuestas(`Clase ${n} — ${titulo}`, preguntas);
});

const css = `
@page { size: A4; margin: 22mm 18mm; }
* { box-sizing: border-box; }
body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; line-height: 1.5; font-size: 12.5pt; }
h1, h2, h3, h4 { font-family: 'Segoe UI', Arial, sans-serif; color: #0f2a4a; break-after: avoid; }
h1 { font-size: 22pt; margin-top: 0; }
h2 { font-size: 16pt; margin-top: 1.6em; border-bottom: 2px solid #0f2a4a; padding-bottom: 4px; }
h3 { font-size: 13pt; margin-top: 1.3em; }
h4 { font-size: 11.5pt; }
code { font-family: Consolas, monospace; background: #f1f3f5; padding: 1px 4px; border-radius: 3px; font-size: 0.92em; }
pre.code { background: #0f1b2b; color: #e6edf3; padding: 10px 12px; border-radius: 6px; overflow-wrap: break-word; white-space: pre-wrap; font-size: 10pt; }
pre.code code { background: none; color: inherit; padding: 0; }
blockquote { border-left: 4px solid #0f2a4a; margin: 1em 0; padding: 0.3em 1em; background: #f6f8fa; color: #333; }
table { width: 100%; border-collapse: collapse; margin: 0.8em 0; font-size: 10.5pt; }
table, th, td { border: 1px solid #ccc; }
th, td { padding: 5px 7px; text-align: left; vertical-align: top; }
thead { background: #0f2a4a; color: #fff; }
tr { break-inside: avoid; }
table.banco td:nth-child(1), table.respuestas td:nth-child(1) { width: 2.5em; text-align: center; }
ul, ol { padding-left: 1.4em; }
li { margin: 0.2em 0; }
li.task { list-style: none; margin-left: -1.4em; padding-left: 0; }
.nota { font-style: italic; color: #555; }
.cover { break-after: page; text-align: center; padding-top: 30%; }
.cover h1 { font-size: 30pt; }
.toc { break-after: page; }
.toc ol { list-style: decimal; }
.chapter { break-before: page; }
.respuestas-chapter { break-before: page; }
`;

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Crea tu Presencia Digital — Libro del curso</title>
<style>${css}</style>
</head>
<body>

<section class="cover">
<h1>Crea tu Presencia Digital</h1>
<p>Libro del curso — Clases 1 a 8</p>
<p class="nota">Teoría, ejemplos y banco de preguntas de repaso de cada clase.</p>
</section>

<section class="toc">
<h2>Índice</h2>
<ol>
${toc}
<li><a href="#respuestas">Respuestas del banco de preguntas</a></li>
</ol>
</section>

${chapters}

<section class="chapter respuestas-chapter" id="respuestas">
<h1>Respuestas del banco de preguntas</h1>
${respuestasAll}
</section>

</body>
</html>`;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
const htmlPath = join(OUT_DIR, 'libro.html');
writeFileSync(htmlPath, html, 'utf8');

const pdfPath = join(OUT_DIR, 'curso-presencia-digital.pdf');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

const res = spawnSync(EDGE, [
  '--headless=new',
  '--disable-gpu',
  `--print-to-pdf=${pdfPath}`,
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=20000',
  fileUrl,
], { stdio: 'inherit' });

if (res.status !== 0) {
  console.error('Edge print-to-pdf falló, código', res.status);
  process.exit(1);
}

console.log('PDF generado en', pdfPath);
