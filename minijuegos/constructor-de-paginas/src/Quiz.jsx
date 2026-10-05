import React, { useMemo, useState } from "react";
import { Home, RotateCcw, ClipboardCheck, Check, X, ArrowRight } from "lucide-react";

const gridBg = {
  backgroundColor: "#EEF2F6",
  backgroundImage: "linear-gradient(#D7E0E8 1px, transparent 1px), linear-gradient(90deg, #D7E0E8 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

/** "`<h1>`" -> <code>&lt;h1&gt;</code>, resto como texto plano */
function withCode(text) {
  const parts = String(text).split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em]" style={{ color: "#0F8F7F" }}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function isOptionCorrect(option, correct, type) {
  if (type === "opcion_multiple") return option.startsWith(correct + ")");
  return option === correct;
}

/* =========================================================================
   SELECCIÓN DE CLASE
   ========================================================================= */
export function QuizLevelSelect({ levels, onPick, onBackToMenu }) {
  return (
    <div className="min-h-screen p-4 md:p-8 font-sans" style={gridBg}>
      <div className="mx-auto max-w-md md:max-w-lg">
        <div className="mb-2 flex items-center justify-between">
          <button onClick={onBackToMenu} className="rounded-full p-1.5 text-slate-400 hover:text-slate-600" aria-label="Volver al menú">
            <Home size={16} />
          </button>
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#0F8F7F" }}>Banco de preguntas</p>
          <span className="w-6" />
        </div>
        <h1 className="mb-6 text-center text-xl font-bold md:text-2xl" style={{ color: "#1B2430" }}>¿Qué clase repasamos?</h1>
        <div className="space-y-3">
          {levels.map((lv) => (
            <button key={lv.id} onClick={() => onPick(lv.id)}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-md transition hover:shadow-lg disabled:opacity-40"
              disabled={lv.questions.length === 0}>
              <div className="rounded-full p-2.5" style={{ backgroundColor: "#E9F7F4" }}>
                <ClipboardCheck size={20} style={{ color: "#0F8F7F" }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: "#1B2430" }}>{lv.title}</p>
                <p className="text-xs text-slate-500">{lv.questions.length} preguntas</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   JUEGO — Banco de preguntas
   ========================================================================= */
export function QuizGame({ level, onBackToSelect, onBackToMenu }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState(null); // opción elegida (opción múltiple / V-F)
  const [shortAnswer, setShortAnswer] = useState("");
  const [revealed, setRevealed] = useState(false); // respuesta corta: ¿mostró la respuesta?
  const [finished, setFinished] = useState(false);

  const questions = level.questions;
  const q = questions[index];
  const total = questions.length;

  const resetQuestionState = () => {
    setAnswered(false); setChosen(null); setShortAnswer(""); setRevealed(false);
  };

  const restart = () => {
    setIndex(0); setScore(0); setFinished(false); resetQuestionState();
  };

  const goNext = () => {
    if (index + 1 >= total) { setFinished(true); return; }
    setIndex((i) => i + 1);
    resetQuestionState();
  };

  const pickOption = (opt) => {
    if (answered) return;
    setChosen(opt);
    setAnswered(true);
    if (isOptionCorrect(opt, q.correct, q.type)) setScore((s) => s + 1);
  };

  const selfGrade = (ok) => {
    if (answered) return;
    setAnswered(true);
    if (ok) setScore((s) => s + 1);
  };

  const TopBar = (
    <div className="mb-2 flex items-center justify-between">
      <button onClick={onBackToSelect} className="rounded-full p-1.5 text-slate-400 hover:text-slate-600" aria-label="Elegir otra clase">
        <Home size={16} />
      </button>
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#0F8F7F" }}>{level.title}</p>
      <span className="w-6" />
    </div>
  );

  if (finished) {
    const pct = total ? Math.round((score / total) * 100) : 0;
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={gridBg}>
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
          <ClipboardCheck className="mx-auto mb-3" size={32} style={{ color: "#0F8F7F" }} />
          <h1 className="text-xl font-bold" style={{ color: "#1B2430" }}>¡Terminaste el repaso!</h1>
          <p className="mt-2 text-3xl font-bold" style={{ color: "#0F8F7F" }}>{score} / {total}</p>
          <p className="text-sm text-slate-500">{pct}% correcto</p>
          <div className="mt-6 flex flex-col gap-2">
            <button onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#0F8F7F" }}>
              <RotateCcw size={16} /> Repetir esta clase
            </button>
            <button onClick={onBackToSelect} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-slate-500">
              Elegir otra clase
            </button>
            <button onClick={onBackToMenu} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-slate-400">
              <Home size={14} /> Menú principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={gridBg}>
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
          <p className="text-sm text-slate-500">Esta clase todavía no tiene preguntas cargadas.</p>
          <button onClick={onBackToSelect} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#0F8F7F" }}>
            Elegir otra clase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans" style={gridBg}>
      <div className="mx-auto max-w-md md:max-w-lg">
        {TopBar}
        <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
          <span>Pregunta {index + 1} / {total}</span>
          <span>Puntaje: {score}</span>
        </div>
        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full transition-all" style={{ width: `${(index / total) * 100}%`, backgroundColor: "#E8A93B" }} />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-md">
          {q.topic && (
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">{q.topic}</p>
          )}
          <p className="mb-4 text-base font-bold md:text-lg" style={{ color: "#1B2430" }}>{withCode(q.text)}</p>

          {q.type !== "respuesta_corta" && q.options && (
            <div className="space-y-2">
              {q.options.map((opt) => {
                const isCorrectOpt = isOptionCorrect(opt, q.correct, q.type);
                const isChosen = chosen === opt;
                let style = { borderColor: "#E2E8F0", backgroundColor: "#FFFFFF", color: "#1B2430" };
                if (answered && isCorrectOpt) style = { borderColor: "#0F8F7F", backgroundColor: "#E9F7F4", color: "#0F8F7F" };
                else if (answered && isChosen && !isCorrectOpt) style = { borderColor: "#E4572E", backgroundColor: "#FDECEA", color: "#C0392B" };
                return (
                  <button key={opt} onClick={() => pickOption(opt)} disabled={answered}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border-2 px-4 py-2.5 text-left text-sm font-semibold transition disabled:cursor-default"
                    style={style}>
                    <span>{withCode(opt)}</span>
                    {answered && isCorrectOpt && <Check size={16} />}
                    {answered && isChosen && !isCorrectOpt && <X size={16} />}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "respuesta_corta" && (
            <div>
              {!revealed ? (
                <>
                  <input value={shortAnswer} onChange={(e) => setShortAnswer(e.target.value)}
                    placeholder="Escribí tu respuesta..."
                    className="mb-3 w-full rounded-xl border-2 px-4 py-2.5 text-sm" style={{ borderColor: "#E2E8F0" }} />
                  <button onClick={() => setRevealed(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#0F8F7F" }}>
                    Ver respuesta
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3 rounded-xl p-3 text-sm" style={{ backgroundColor: "#E9F7F4", color: "#0F8F7F" }}>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">Respuesta esperada</p>
                    {withCode(q.correct)}
                  </div>
                  {!answered ? (
                    <div className="flex gap-2">
                      <button onClick={() => selfGrade(true)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#0F8F7F" }}>
                        <Check size={16} /> Acerté
                      </button>
                      <button onClick={() => selfGrade(false)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#E4572E" }}>
                        <X size={16} /> Fallé
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">Marcado. Seguí a la próxima.</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {answered && (
          <button onClick={goNext}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#1B2430" }}>
            {index + 1 >= total ? "Ver resultado" : "Siguiente"} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
