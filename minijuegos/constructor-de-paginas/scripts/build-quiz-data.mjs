// Genera src/quizData.generated.js a partir de los bancos de preguntas del
// curso (clases/clase-0N-*/banco-preguntas.md). Un nivel = una clase.
// No editar el archivo generado a mano: correr `pnpm run generate:quiz`
// (o `pnpm run dev` / `pnpm run build`, que ya lo llaman antes).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const clasesDir = resolve(here, "..", "..", "..", "clases");
const outFile = resolve(here, "..", "src", "quizData.generated.js");

function splitRow(line) {
  // quita el "| " inicial y el " |" final, separa por "|" (no hay pipes
  // literales dentro de las celdas en estos bancos de preguntas)
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((c) => c.trim());
}

function splitOptions(cell) {
  if (!cell || cell === "—" || cell === "-") return null;
  if (/^verdadero\s*\/\s*falso$/i.test(cell)) return ["Verdadero", "Falso"];
  const parts = cell.split(/\s(?=[A-D]\))/).map((s) => s.trim()).filter(Boolean);
  if (parts.length && /^[A-D]\)/.test(parts[0])) return parts;
  return null;
}

function typeOf(cell) {
  const t = cell.toLowerCase();
  if (t.includes("opción múltiple") || t.includes("opcion multiple")) return "opcion_multiple";
  if (t.includes("verdadero")) return "verdadero_falso";
  if (t.includes("respuesta corta")) return "respuesta_corta";
  return "otro";
}

function parseBanco(md) {
  const lines = md.split(/\r?\n/);
  const questions = [];
  for (const line of lines) {
    if (!line.trim().startsWith("|")) continue;
    const cells = splitRow(line);
    if (cells.length < 7) continue;
    const n = parseInt(cells[0], 10);
    if (!Number.isInteger(n)) continue; // salta encabezado y separador
    const [, text, tipoCell, opcionesCell, correctaCell, tema, dificultad] = cells;
    const type = typeOf(tipoCell);
    const options = splitOptions(opcionesCell);
    questions.push({
      n,
      text,
      type,
      options,
      correct: correctaCell,
      topic: tema,
      difficulty: dificultad,
    });
  }
  return questions;
}

const dirs = readdirSync(clasesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^clase-\d+/.test(d.name))
  .map((d) => d.name)
  .sort();

const levels = [];
const warnings = [];

for (const dir of dirs) {
  const bancoPath = join(clasesDir, dir, "banco-preguntas.md");
  let md;
  try {
    md = readFileSync(bancoPath, "utf8");
  } catch {
    continue; // esta clase todavía no tiene banco-preguntas.md
  }
  const titleMatch = md.match(/^#\s*Banco de Preguntas\s*—\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : dir;
  const questions = parseBanco(md);
  questions.forEach((q) => {
    if (q.type === "opcion_multiple" && (!q.options || q.options.length < 2)) {
      warnings.push(`${dir} #${q.n}: opción múltiple sin opciones parseadas`);
    }
  });
  levels.push({ id: dir, title, questions });
}

const header = `// GENERADO por scripts/build-quiz-data.mjs — no editar a mano.
// Fuente: clases/clase-0N-*/banco-preguntas.md (una fila de la tabla = una pregunta).
// Para editar una pregunta, editá el banco-preguntas.md de esa clase y volvé a generar.
`;
writeFileSync(outFile, `${header}export const QUIZ_LEVELS = ${JSON.stringify(levels, null, 2)};\n`, "utf8");

const totalQ = levels.reduce((s, l) => s + l.questions.length, 0);
console.log(`quizData.generated.js: ${levels.length} niveles, ${totalQ} preguntas.`);
if (warnings.length) {
  console.warn("Avisos:");
  warnings.forEach((w) => console.warn("  - " + w));
}
