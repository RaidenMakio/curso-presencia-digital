import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Image as ImageIcon, Check, Lock, RotateCcw, ArrowRight, Star, Sparkles,
  Volume2, VolumeX, Settings, ArrowLeft, Trash2, Plus, Minus, Save,
  Zap, ListChecks, Columns, ClipboardCheck,
} from "lucide-react";

/* =========================================================================
   NIVELES INCLUIDOS DE FÁBRICA — puedes agregar más desde el propio
   juego (botón de engranaje → modo administrador), sin tocar código.
   ========================================================================= */
const BUILTIN_LEVELS = [
  {
    id: 1, title: "El titular de tu sitio",
    instructions: "Toca una etiqueta y luego el hueco donde va.", decoyCount: 2,
    slots: [
      { id: "l1-s1", tag: "h1", placeholder: "¿Qué etiqueta va aquí?", content: "Ana Pérez — Diseñadora Gráfica" },
      { id: "l1-s2", tag: "p", placeholder: "¿Y aquí?", content: "Creo identidades visuales para marcas que quieren destacar." },
    ],
  },
  {
    id: 2, title: "Preséntate con una imagen",
    instructions: "Toda página necesita una cara y un enlace de contacto.", decoyCount: 2,
    slots: [
      { id: "l2-s1", tag: "img", placeholder: "Falta la etiqueta de imagen", content: "Foto de perfil de Ana" },
      { id: "l2-s2", tag: "a", placeholder: "Falta el enlace", content: "Sígueme en Instagram" },
    ],
  },
  {
    id: 3, title: "Tu lista de servicios",
    instructions: "Cada servicio es un elemento de lista.", decoyCount: 2,
    slots: [
      { id: "l3-s1", tag: "li", placeholder: "Servicio 1", content: "Diseño de logotipos" },
      { id: "l3-s2", tag: "li", placeholder: "Servicio 2", content: "Ilustración digital" },
      { id: "l3-s3", tag: "li", placeholder: "Servicio 3", content: "Branding completo" },
    ],
  },
  {
    id: 4, title: "Invita a tus visitantes a actuar",
    instructions: "Destaca el mensaje y agrega un botón claro.", decoyCount: 3,
    slots: [
      { id: "l4-s1", tag: "strong", placeholder: "Texto destacado", content: "¡Escríbeme hoy mismo!" },
      { id: "l4-s2", tag: "button", placeholder: "Falta el botón", content: "Contactar" },
    ],
  },
  {
    id: 5, title: "Repaso: arma la sección completa",
    instructions: "Última prueba: usa todo lo que aprendiste.", decoyCount: 3,
    slots: [
      { id: "l5-s1", tag: "h2", placeholder: "Encabezado de sección", content: "Mis proyectos recientes" },
      { id: "l5-s2", tag: "p", placeholder: "Texto de apoyo", content: "Una selección de trabajos de los últimos meses." },
      { id: "l5-s3", tag: "img", placeholder: "Imagen", content: "Captura del proyecto" },
      { id: "l5-s4", tag: "a", placeholder: "Enlace", content: "Ver proyecto completo" },
      { id: "l5-s5", tag: "button", placeholder: "Botón", content: "Contratar ahora" },
    ],
  },
];

const PLAYABLE_TAGS = ["h1", "h2", "p", "img", "a", "li", "button", "strong"];
const DECOY_TAGS = ["div", "span", "table", "br", "input", "ul"];
const STORAGE_KEY = "constructor-paginas-niveles-custom";

const MODES = [
  { id: 1, label: "Uno por uno", icon: Zap, desc: "Sabrás al instante si cada etiqueta que colocas es correcta." },
  { id: 2, label: "Todo junto", icon: ListChecks, desc: "Completa todos los huecos primero. Recién al final revisas qué acertaste." },
  { id: 3, label: "Vista dividida", icon: Columns, desc: "Verás la página ya terminada como referencia mientras la reconstruyes." },
];
const modeLabel = (m) => MODES.find((x) => x.id === m)?.label || "";

/* =========================================================================
   Almacenamiento (compartido: todos los que abren este juego ven los
   mismos niveles creados desde el modo administrador)
   ========================================================================= */
async function loadCustomLevels() {
  try {
    const res = await window.storage.get(STORAGE_KEY, true);
    return res ? JSON.parse(res.value) : [];
  } catch (e) { return []; }
}
async function saveCustomLevels(levels) {
  try { await window.storage.set(STORAGE_KEY, JSON.stringify(levels), true); return true; }
  catch (e) { return false; }
}

/* =========================================================================
   Sonido y vibración (sintetizado en el navegador, sin archivos externos)
   ========================================================================= */
function playTone(freqs, type, stepDuration) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * stepDuration;
      const end = start + stepDuration;
      gain.gain.setValueAtTime(0.16, start);
      gain.gain.exponentialRampToValueAtTime(0.001, end);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(end);
    });
  } catch (e) { /* audio no disponible */ }
}
function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* no soportado */ }
}
function feedbackCorrect(soundOn) { if (soundOn) playTone([523.25, 659.25, 783.99], "triangle", 0.09); vibrate([30]); }
function feedbackWrong(soundOn) { if (soundOn) playTone([180, 130], "sawtooth", 0.13); vibrate([60, 40, 60]); }
function feedbackLevelComplete(soundOn) { if (soundOn) playTone([659.25, 783.99, 987.77, 1046.5], "triangle", 0.1); vibrate([30, 30, 30, 60]); }

function seededShuffle(array, seed) {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function buildPieceBank(level, resetKey) {
  const correctPieces = level.slots.map((s) => ({ uid: `${s.id}-correct`, tag: s.tag }));
  const correctTagSet = new Set(level.slots.map((s) => s.tag));
  const decoyPool = DECOY_TAGS.filter((t) => !correctTagSet.has(t));
  const count = Math.min(level.decoyCount || 0, decoyPool.length);
  const shuffledDecoys = seededShuffle(decoyPool, level.id * 17 + resetKey * 3 + 1).slice(0, count);
  const decoyPieces = shuffledDecoys.map((tag) => ({ uid: `decoy-${tag}-${level.id}-${resetKey}`, tag }));
  return seededShuffle([...correctPieces, ...decoyPieces], level.id * 31 + resetKey * 7 + 5);
}

function renderPreview(tag, content) {
  const ink = "#1B2430";
  const teal = "#0F8F7F";
  switch (tag) {
    case "h1": return <h1 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: ink }}>{content}</h1>;
    case "h2": return <h2 className="text-xl md:text-2xl font-bold" style={{ color: ink }}>{content}</h2>;
    case "p": return <p className="text-sm md:text-base leading-relaxed" style={{ color: ink }}>{content}</p>;
    case "img": return (
      <div className="flex items-center gap-2 rounded-lg border-2 border-dashed p-3" style={{ borderColor: teal }}>
        <ImageIcon size={20} style={{ color: teal }} />
        <span className="text-xs md:text-sm" style={{ color: teal }}>{content}</span>
      </div>
    );
    case "a": return <a className="text-sm md:text-base font-semibold underline underline-offset-2" style={{ color: teal }}>{content}</a>;
    case "li": return (
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: ink }} />
        <span className="text-sm md:text-base" style={{ color: ink }}>{content}</span>
      </div>
    );
    case "button": return (
      <button className="rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: teal }}>{content}</button>
    );
    case "strong": return <p className="text-sm md:text-base font-bold" style={{ color: ink }}>{content}</p>;
    default: return <span className="text-sm">{content}</span>;
  }
}

const gridBg = {
  backgroundColor: "#EEF2F6",
  backgroundImage: "linear-gradient(#D7E0E8 1px, transparent 1px), linear-gradient(90deg, #D7E0E8 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

function BrowserChrome({ label }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-0.5 text-center font-mono text-[10px] text-slate-400 border border-slate-200">
        {label}
      </span>
    </div>
  );
}

/* =========================================================================
   MODO JUEGO
   ========================================================================= */
function Game({ levels, soundOn, setSoundOn, onOpenAdmin }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [maxUnlocked, setMaxUnlocked] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [mode, setMode] = useState(null); // null => mostrar selector de dificultad

  // Modo 1 y 3 (feedback inmediato)
  const [filled, setFilled] = useState({});
  // Modo 2 (revisar al final)
  const [assigned, setAssigned] = useState({});
  const [locked, setLocked] = useState({});
  const [wrongFlags, setWrongFlags] = useState({});

  const [selectedUid, setSelectedUid] = useState(null);
  const [shakingSlot, setShakingSlot] = useState(null);
  const [levelMistakes, setLevelMistakes] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const safeIndex = Math.min(levelIndex, levels.length - 1);
  const level = levels[safeIndex];
  const pieces = useMemo(() => buildPieceBank(level, resetKey), [level, resetKey]);

  const usedUids = useMemo(() => {
    if (mode === 2) return new Set(Object.values(assigned));
    return new Set(Object.values(filled).map((f) => f.uid));
  }, [mode, assigned, filled]);

  const levelComplete = mode === 2
    ? level.slots.every((s) => locked[s.id])
    : level.slots.every((s) => filled[s.id]);

  const clearProgress = () => {
    setFilled({}); setAssigned({}); setLocked({}); setWrongFlags({});
    setSelectedUid(null); setShakingSlot(null); setLevelMistakes(0);
  };

  /* ----- Modo 1 y 3: colocación con feedback inmediato ----- */
  const handlePieceTap = useCallback((uid) => {
    if (usedUids.has(uid)) return;
    setSelectedUid((prev) => (prev === uid ? null : uid));
  }, [usedUids]);

  const handleSlotTapImmediate = useCallback((slot) => {
    if (filled[slot.id] || !selectedUid) return;
    const piece = pieces.find((p) => p.uid === selectedUid);
    if (!piece) return;
    if (piece.tag === slot.tag) {
      const willComplete = level.slots.filter((s) => s.id !== slot.id).every((s) => filled[s.id]);
      setFilled((prev) => ({ ...prev, [slot.id]: { uid: piece.uid, tag: piece.tag } }));
      setSelectedUid(null);
      willComplete ? feedbackLevelComplete(soundOn) : feedbackCorrect(soundOn);
    } else {
      setLevelMistakes((m) => m + 1);
      setTotalMistakes((m) => m + 1);
      setShakingSlot(slot.id);
      setSelectedUid(null);
      feedbackWrong(soundOn);
      setTimeout(() => setShakingSlot(null), 420);
    }
  }, [filled, pieces, selectedUid, level, soundOn]);

  /* ----- Modo 2: colocar libremente, revisar todo junto ----- */
  const handleSlotTapMode2 = useCallback((slot) => {
    if (locked[slot.id]) return;
    if (selectedUid) {
      setAssigned((prev) => ({ ...prev, [slot.id]: selectedUid }));
      setWrongFlags((prev) => { const n = { ...prev }; delete n[slot.id]; return n; });
      setSelectedUid(null);
    } else if (assigned[slot.id]) {
      setAssigned((prev) => { const n = { ...prev }; delete n[slot.id]; return n; });
      setWrongFlags((prev) => { const n = { ...prev }; delete n[slot.id]; return n; });
    }
  }, [locked, selectedUid, assigned]);

  const canReview = level.slots.every((s) => locked[s.id] || assigned[s.id]);

  const handleReview = () => {
    const newLocked = { ...locked };
    const newWrong = {};
    level.slots.forEach((s) => {
      if (newLocked[s.id]) return;
      const piece = pieces.find((p) => p.uid === assigned[s.id]);
      if (piece && piece.tag === s.tag) newLocked[s.id] = true;
      else newWrong[s.id] = true;
    });
    const wrongCount = Object.keys(newWrong).length;
    if (wrongCount > 0) { setLevelMistakes((m) => m + wrongCount); setTotalMistakes((m) => m + wrongCount); }
    setLocked(newLocked);
    setWrongFlags(newWrong);
    const allDone = level.slots.every((s) => newLocked[s.id]);
    allDone ? feedbackLevelComplete(soundOn) : feedbackWrong(soundOn);
  };

  /* ----- Navegación entre niveles ----- */
  const restartLevel = () => { clearProgress(); setResetKey((k) => k + 1); };
  const changeMode = () => { clearProgress(); setMode(null); };
  const goNextLevel = () => {
    if (safeIndex === levels.length - 1) { setGameFinished(true); return; }
    const next = safeIndex + 1;
    setLevelIndex(next); setMaxUnlocked((m) => Math.max(m, next));
    clearProgress(); setMode(null);
  };
  const jumpToLevel = (idx) => {
    if (idx > maxUnlocked) return;
    setLevelIndex(idx); clearProgress(); setMode(null); setGameFinished(false);
  };
  const restartGame = () => {
    setLevelIndex(0); setMaxUnlocked(0); clearProgress(); setMode(null);
    setTotalMistakes(0); setGameFinished(false); setResetKey((k) => k + 1);
  };

  const stars = totalMistakes === 0 ? 3 : totalMistakes <= 4 ? 2 : 1;

  if (gameFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={gridBg}>
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
          <Sparkles className="mx-auto mb-3" size={32} style={{ color: "#0F8F7F" }} />
          <h1 className="text-xl font-bold" style={{ color: "#1B2430" }}>¡Completaste el juego!</h1>
          <p className="mt-1 text-sm text-slate-500">Construiste {levels.length} páginas con las etiquetas correctas.</p>
          <div className="mt-4 flex justify-center gap-1">
            {[1, 2, 3].map((n) => <Star key={n} size={28} fill={n <= stars ? "#E8A93B" : "none"} style={{ color: "#E8A93B" }} />)}
          </div>
          <p className="mt-2 text-xs text-slate-400">{totalMistakes} intento(s) fallido(s) en total</p>
          <button onClick={restartGame} className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#0F8F7F" }}>
            <RotateCcw size={16} /> Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const TopBar = (
    <div className="mb-2 flex items-center justify-between">
      <button onClick={() => setSoundOn((s) => !s)} className="rounded-full p-1.5 text-slate-400 hover:text-slate-600" aria-label="Sonido">
        {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#0F8F7F" }}>Constructor de Páginas</p>
      <button onClick={onOpenAdmin} className="rounded-full p-1.5 text-slate-400 hover:text-slate-600" aria-label="Administrar niveles">
        <Settings size={16} />
      </button>
    </div>
  );

  const ProgressDots = (
    <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
      {levels.map((lv, idx) => {
        const done = idx < maxUnlocked;
        const isCurrent = idx === safeIndex;
        const isLockedDot = idx > maxUnlocked;
        return (
          <button key={lv.id} onClick={() => jumpToLevel(idx)} disabled={isLockedDot}
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition"
            style={{
              backgroundColor: isLockedDot ? "#DCE3EA" : done && !isCurrent ? "#0F8F7F" : isCurrent ? "#E8A93B" : "#FFFFFF",
              color: isLockedDot ? "#98A6B3" : done && !isCurrent ? "#FFFFFF" : "#1B2430",
              boxShadow: isCurrent ? "0 0 0 2px #E8A93B" : "none",
            }}>
            {isLockedDot ? <Lock size={12} /> : done && !isCurrent ? <Check size={14} /> : idx + 1}
          </button>
        );
      })}
    </div>
  );

  if (!mode) {
    return (
      <div className="min-h-screen p-4 md:p-8 font-sans" style={gridBg}>
        <div className="mx-auto max-w-md md:max-w-lg">
          {TopBar}
          <h1 className="mb-1 text-center text-lg md:text-xl font-bold" style={{ color: "#1B2430" }}>{level.title}</h1>
          {ProgressDots}
          <p className="mb-4 text-center text-sm text-slate-500">Elige la dificultad para este nivel</p>
          <div className="space-y-3">
            {MODES.map((m) => {
              const Icon = m.icon;
              return (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className="flex w-full items-start gap-3 rounded-2xl bg-white p-4 text-left shadow-md transition hover:shadow-lg">
                  <div className="mt-0.5 rounded-full p-2" style={{ backgroundColor: "#E9F7F4" }}>
                    <Icon size={18} style={{ color: "#0F8F7F" }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#1B2430" }}>{m.label}</p>
                    <p className="text-xs text-slate-500">{m.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const renderSlotsPanel = (interactive) => (
    <div className="space-y-3 p-4 md:p-5">
      {level.slots.map((slot) => {
        if (mode === 2) {
          const isLocked = locked[slot.id];
          const assignedUid = assigned[slot.id];
          const assignedTag = assignedUid ? pieces.find((p) => p.uid === assignedUid)?.tag : null;
          const isWrong = wrongFlags[slot.id];
          if (isLocked) {
            return <div key={slot.id} className="rounded-lg px-3 py-2.5">{renderPreview(slot.tag, slot.content)}</div>;
          }
          return (
            <div key={slot.id} onClick={() => handleSlotTapMode2(slot)}
              className="cursor-pointer rounded-lg border-2 border-dashed px-3 py-2.5 transition-all"
              style={{
                borderColor: isWrong ? "#E4572E" : assignedTag ? "#0F8F7F" : selectedUid ? "#0F8F7F" : "#CBD5E1",
                backgroundColor: isWrong ? "#FDEDE8" : assignedTag ? "#E9F7F4" : "#F8FAFC",
              }}>
              {assignedTag ? (
                <span className="font-mono text-xs md:text-sm font-semibold" style={{ color: isWrong ? "#E4572E" : "#1B2430" }}>{`<${assignedTag}>`}</span>
              ) : (
                <span className="font-mono text-xs md:text-sm" style={{ color: selectedUid ? "#0F8F7F" : "#94A3B8" }}>{slot.placeholder}</span>
              )}
            </div>
          );
        }
        const isFilled = !!filled[slot.id];
        const isShaking = shakingSlot === slot.id;
        return (
          <div key={slot.id} onClick={() => interactive && handleSlotTapImmediate(slot)}
            className={`rounded-lg px-3 py-2.5 transition-all ${isShaking ? "animate-pulse" : ""} ${!isFilled && interactive ? "cursor-pointer border-2 border-dashed" : ""}`}
            style={{
              borderColor: isShaking ? "#E4572E" : selectedUid && !isFilled ? "#0F8F7F" : "#CBD5E1",
              backgroundColor: isShaking ? "#FDEDE8" : isFilled ? "transparent" : "#F8FAFC",
            }}>
            {isFilled ? renderPreview(filled[slot.id].tag, slot.content) : (
              <span className="font-mono text-xs md:text-sm" style={{ color: selectedUid ? "#0F8F7F" : "#94A3B8" }}>{slot.placeholder}</span>
            )}
          </div>
        );
      })}
    </div>
  );

  const referencePanel = (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <BrowserChrome label="referencia (ya terminada)" />
      <div className="space-y-3 p-4 md:p-5">
        {level.slots.map((slot) => (
          <div key={slot.id} className="rounded-lg px-3 py-2.5">{renderPreview(slot.tag, slot.content)}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans" style={gridBg}>
      <div className={`mx-auto ${mode === 3 ? "max-w-md md:max-w-3xl" : "max-w-md md:max-w-lg"}`}>
        {TopBar}
        <h1 className="mb-4 text-center text-lg md:text-xl font-bold" style={{ color: "#1B2430" }}>{level.title}</h1>
        {ProgressDots}

        <div className="mb-3 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>Modo: <strong>{modeLabel(mode)}</strong></span>
          <button onClick={changeMode} className="underline">cambiar</button>
        </div>
        <p className="mb-3 text-center text-sm text-slate-500">{level.instructions}</p>

        {mode === 3 ? (
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {referencePanel}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <BrowserChrome label="tu-sitio.local" />
              {renderSlotsPanel(true)}
            </div>
          </div>
        ) : (
          <div className="mb-5 overflow-hidden rounded-2xl bg-white shadow-lg">
            <BrowserChrome label="tu-sitio.local" />
            {renderSlotsPanel(true)}
          </div>
        )}

        {!levelComplete && (
          <>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">Toca una etiqueta</p>
            <div className="mb-5 flex flex-wrap justify-center gap-2">
              {pieces.map((piece) => {
                if (usedUids.has(piece.uid)) return null;
                const selected = selectedUid === piece.uid;
                return (
                  <button key={piece.uid} onClick={() => handlePieceTap(piece.uid)}
                    className={`rounded-lg border-2 px-3 py-2 font-mono text-sm font-semibold transition-transform ${selected ? "-translate-y-1 shadow-md" : ""}`}
                    style={{ borderColor: selected ? "#0F8F7F" : "#CBD5E1", backgroundColor: selected ? "#E9F7F4" : "#FFFFFF", color: "#1B2430" }}>
                    {`<${piece.tag}>`}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <button onClick={restartLevel} className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-500">
            <RotateCcw size={13} /> Reiniciar nivel
          </button>

          {mode === 2 && !levelComplete ? (
            <button onClick={handleReview} disabled={!canReview}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-40"
              style={{ backgroundColor: "#0F8F7F" }}>
              <ClipboardCheck size={15} /> Revisar respuestas
            </button>
          ) : levelComplete ? (
            <button onClick={goNextLevel} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: "#0F8F7F" }}>
              {safeIndex === levels.length - 1 ? "Ver resultado" : "Siguiente nivel"} <ArrowRight size={15} />
            </button>
          ) : (
            <span className="text-xs text-slate-400">{levelMistakes > 0 ? `${levelMistakes} intento(s) fallido(s)` : " "}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MODO ADMINISTRADOR — crear niveles nuevos sin tocar código
   ========================================================================= */
const emptySlot = () => ({ tag: "h1", placeholder: "", content: "" });

function Admin({ customLevels, setCustomLevels, onBack }) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [decoyCount, setDecoyCount] = useState(2);
  const [slots, setSlots] = useState([emptySlot()]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateSlot = (idx, field, value) => setSlots((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  const addSlot = () => setSlots((prev) => [...prev, emptySlot()]);
  const removeSlot = (idx) => setSlots((prev) => prev.filter((_, i) => i !== idx));
  const resetForm = () => { setTitle(""); setInstructions(""); setDecoyCount(2); setSlots([emptySlot()]); };

  const handleSave = async () => {
    setError("");
    if (!title.trim()) { setError("Ponle un título al nivel."); return; }
    if (slots.some((s) => !s.content.trim())) { setError("Completa el contenido de cada hueco."); return; }
    const id = Date.now();
    const newLevel = {
      id, title: title.trim(),
      instructions: instructions.trim() || "Toca una etiqueta y luego el hueco donde va.",
      decoyCount: Number(decoyCount) || 0,
      slots: slots.map((s, i) => ({
        id: `custom-${id}-s${i}`, tag: s.tag,
        placeholder: s.placeholder.trim() || "¿Qué etiqueta va aquí?",
        content: s.content.trim(),
      })),
    };
    setSaving(true);
    const updated = [...customLevels, newLevel];
    const ok = await saveCustomLevels(updated);
    setSaving(false);
    if (ok) { setCustomLevels(updated); resetForm(); } else { setError("No se pudo guardar. Intenta de nuevo."); }
  };

  const handleDelete = async (id) => {
    const updated = customLevels.filter((lv) => lv.id !== id);
    const ok = await saveCustomLevels(updated);
    if (ok) setCustomLevels(updated);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans" style={gridBg}>
      <div className="mx-auto max-w-md md:max-w-lg">
        <div className="mb-4 flex items-center gap-2">
          <button onClick={onBack} className="rounded-full p-1.5 text-slate-500 hover:text-slate-700" aria-label="Volver al juego">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "#1B2430" }}>Crear nivel nuevo</h1>
        </div>
        <p className="mb-4 text-xs text-slate-400">Los niveles que crees aquí se agregan al final del juego (con las 3 dificultades disponibles automáticamente) y los ve cualquiera que abra este enlace.</p>

        <div className="mb-5 space-y-3 rounded-2xl bg-white p-4 shadow-lg">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Título del nivel</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Tu sección de contacto"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Instrucción para el estudiante</label>
            <input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Ej: Completa el formulario de contacto"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">Etiquetas señuelo (0 a 6)</label>
            <input type="number" min={0} max={6} value={decoyCount} onChange={(e) => setDecoyCount(e.target.value)}
              className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="mb-2 text-xs font-semibold text-slate-500">Huecos de la página</p>
            <div className="space-y-3">
              {slots.map((slot, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Hueco {idx + 1}</span>
                    {slots.length > 1 && (
                      <button onClick={() => removeSlot(idx)} className="text-rose-400 hover:text-rose-600" aria-label="Quitar hueco">
                        <Minus size={15} />
                      </button>
                    )}
                  </div>
                  <div className="mb-2">
                    <label className="mb-1 block text-[11px] text-slate-400">Etiqueta correcta</label>
                    <select value={slot.tag} onChange={(e) => updateSlot(idx, "tag", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-2 py-1.5 font-mono text-sm">
                      {PLAYABLE_TAGS.map((t) => <option key={t} value={t}>{`<${t}>`}</option>)}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="mb-1 block text-[11px] text-slate-400">Placeholder (antes de acertar)</label>
                    <input value={slot.placeholder} onChange={(e) => updateSlot(idx, "placeholder", e.target.value)} placeholder="¿Qué etiqueta va aquí?"
                      className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-slate-400">Contenido (al acertar)</label>
                    <input value={slot.content} onChange={(e) => updateSlot(idx, "content", e.target.value)} placeholder="Texto que se muestra al acertar"
                      className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm" />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addSlot} className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-500">
              <Plus size={13} /> Agregar hueco
            </button>
          </div>

          {error && <p className="text-xs font-semibold text-rose-500">{error}</p>}

          <button onClick={handleSave} disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
            style={{ backgroundColor: "#0F8F7F" }}>
            <Save size={16} /> {saving ? "Guardando..." : "Guardar nivel"}
          </button>
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Niveles personalizados ({customLevels.length})</p>
        <div className="space-y-2">
          {customLevels.length === 0 && <p className="text-sm text-slate-400">Todavía no creaste ninguno.</p>}
          {customLevels.map((lv) => (
            <div key={lv.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 shadow-sm">
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1B2430" }}>{lv.title}</p>
                <p className="text-xs text-slate-400">{lv.slots.length} hueco(s)</p>
              </div>
              <button onClick={() => handleDelete(lv.id)} className="text-slate-400 hover:text-rose-500" aria-label="Eliminar nivel">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENTE RAÍZ
   ========================================================================= */
export default function App() {
  const [mode, setMode] = useState("juego");
  const [soundOn, setSoundOn] = useState(true);
  const [customLevels, setCustomLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadCustomLevels().then((lv) => { if (active) { setCustomLevels(lv); setLoading(false); } });
    return () => { active = false; };
  }, []);

  const allLevels = useMemo(() => [...BUILTIN_LEVELS, ...customLevels], [customLevels]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={gridBg}><p className="text-sm text-slate-400">Cargando niveles...</p></div>;
  }

  return mode === "admin" ? (
    <Admin customLevels={customLevels} setCustomLevels={setCustomLevels} onBack={() => setMode("juego")} />
  ) : (
    <Game levels={allLevels} soundOn={soundOn} setSoundOn={setSoundOn} onOpenAdmin={() => setMode("admin")} />
  );
}
