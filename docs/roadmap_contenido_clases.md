# Roadmap — Contenido de Clase (Curso B: Crea tu Presencia Digital)

**Generado:** 2026-09-01
**Complementa a:** `temario_curso_presencia_digital.md` (objetivos/entregables ya definidos, fuente de verdad para AC), `estrategias_didacticas_curso.md` (fases pedagógicas 1-2 / 3-4 / 5-8), `ecosistema_herramientas_curso.md` (Razzia/QuizLive elegidos para dinámica tipo Kahoot).
**No reemplaza** ningún roadmap anterior — es el primero de este tipo en el repo.

## Estado real verificado (2026-09-01)

- `docs/`, `infraestructura/` y `minijuegos/constructor-de-paginas/` existen y están completos según su propio README.
- **No existe ninguna carpeta de contenido de clase.** Cero teoría, guías de estudio, bancos de preguntas, tareas o exámenes en el repo — el temario define objetivos/entregables pero no hay desarrollo de ese contenido todavía.
- `minijuegos/constructor-de-paginas/` es la única app de minijuego (React + Vite + Tailwind, patrón de `BUILTIN_LEVELS` editable en `src/App.jsx`).
- Herramienta tipo Kahoot ya decidida en `ecosistema_herramientas_curso.md` (Razzia/QuizLive) — **no se construye una app propia para eso**, se alimenta a mano desde el banco de preguntas de cada clase.

## Principio de diseño: curso de 2 semanas, sin sobrecarga

El curso completo (8 clases) se dicta en 2 semanas. Las tareas y los ejercicios
prácticos de los exámenes **no son ejercicios sueltos** — son el mismo proyecto
web que el estudiante viene armando desde la Clase 1, avanzado un paso por
clase. Un examen de clase revisa el archivo/entregable real que el estudiante
ya entregó en `tarea.md`, no le pide crear algo nuevo aparte. Esto ya quedó
reflejado en `clases/_plantillas/tarea.template.md` y `examen.template.md`
(Fase 0) y en Clase 1 (Fase 1) — aplica igual para clases 2-8.

## Decisión de arquitectura (confirmada con el usuario)

Modelo híbrido para minijuegos:
- **Motor propio (un solo motor, un solo repo de app):** se extiende `minijuegos/constructor-de-paginas/` agregando **Ahorcado** como segundo modo de juego seleccionable, reusando el mismo motor/UI/almacenamiento que ya existe. No se crean apps nuevas por clase ni por juego.
- **Selección múltiple estilo Kahoot:** no se construye — se juega en Razzia/QuizLive (self-hosted, ya elegido) cargando manualmente un subconjunto del banco de preguntas de la clase correspondiente.

## Convención de carpetas de contenido

```
clases/
├── _plantillas/                     ← plantillas + convención de AC (Fase 0)
│   ├── teoria.template.md
│   ├── guia-estudio.template.md
│   ├── banco-preguntas.template.md
│   ├── tarea.template.md
│   └── examen.template.md
├── clase-01-definicion-proyecto-html/
│   ├── teoria.md
│   ├── guia-estudio.md
│   ├── banco-preguntas.md
│   ├── tarea.md
│   └── examen.md
├── clase-02-secciones-contenido/
├── clase-03-estilo-visual-css/
├── clase-04-diseno-responsive/
├── clase-05-banner-logo-ia/
├── clase-06-enlaces-redes-contacto/
├── clase-07-ajustes-finales/
├── clase-08-publicacion-presentacion/
examenes/
├── medio-curso.md        ← después de clase 4 (fin Fase 2 pedagógica)
├── final.md               ← después de clase 8
└── practico.md             ← rúbrica del proyecto entregado clase a clase
```

Los 8 slugs de carpeta salen directo de los títulos de clase en `temario_curso_presencia_digital.md`.

---

## Fase 0 — Plantillas y convenciones (bloquea todo lo demás)

### 0.1 Crear estructura de carpetas
- AC1: `clases/_plantillas/`, las 8 carpetas `clases/clase-0N-*/` y `examenes/` existen → `ls clases/` lista 9 entradas, `ls examenes/` lista 0 archivos (vacía, se llena en fases 2-4).

### 0.2 Definir plantilla + patrón de AC para `teoria.md`
- AC1: `clases/_plantillas/teoria.template.md` existe con un encabezado `## <objetivo específico>` por cada objetivo específico que liste el temario para una clase genérica, más una sección `## Ejemplo práctico` por objetivo.
- AC2 (patrón de AC reusado en fases 1-3, no repetir prosa por clase): un `teoria.md` de clase está "hecho" cuando tiene un `##` por cada objetivo específico de esa clase en el temario (mismo texto o equivalente) y al menos un bloque de código o caso concreto por objetivo.

### 0.3 Definir plantilla + patrón de AC para `guia-estudio.md`
- AC1: `clases/_plantillas/guia-estudio.template.md` existe con 3 secciones fijas: `## Resumen rápido`, `## Checklist de autoevaluación` (un ítem por entregable de la clase), `## Glosario` (mínimo 5 términos).
- AC2 (patrón): una `guia-estudio.md` de clase está "hecha" cuando el checklist tiene exactamente un ítem por cada entregable listado en el temario para esa clase, y el glosario tiene ≥5 términos.

### 0.4 Definir formato del banco de preguntas
- AC1: `clases/_plantillas/banco-preguntas.template.md` define una tabla markdown con columnas exactas: `# | Pregunta | Tipo | Opciones | Respuesta correcta | Tema | Dificultad`. `Tipo` ∈ {opción múltiple, verdadero/falso, respuesta corta}. `Dificultad` ∈ {básico, intermedio, avanzado}.
- AC2 (patrón): un `banco-preguntas.md` de clase está "hecho" cuando tiene entre 10 y 20 filas, cubre las 3 dificultades y al menos 2 temas distintos dentro de la clase. El profesor arma cuestionarios cortos (2-5 preguntas) citando los `#` de fila que quiere usar — sin script, selección manual.

### 0.5 Definir plantilla de `tarea.md` (tarea interactiva)
- AC1: `clases/_plantillas/tarea.template.md` tiene 3 secciones: `## Qué jugar` (referencia al modo del motor de minijuegos o a la sesión Razzia/QuizLive con qué filas del banco usar), `## Instrucciones`, `## Entregable` (ligado 1:1 a un entregable oficial del temario).
- AC2 (patrón): una `tarea.md` de clase está "hecha" cuando su sección `## Entregable` cita textualmente al menos uno de los entregables oficiales de esa clase en el temario.

### 0.6 Definir plantilla de `examen.md` (examen de clase)
- AC1: `clases/_plantillas/examen.template.md` tiene: 5-8 preguntas citadas por `#` desde el banco de esa clase, 1 ejercicio práctico ligado a un entregable oficial, y una rúbrica cuyos puntajes suman 100.
- AC2 (patrón): un `examen.md` de clase está "hecho" cuando sus preguntas citadas existen en el `banco-preguntas.md` de la misma clase (mismo `#`) y la rúbrica suma exactamente 100.

---

## Fase 1 — Piloto: Clase 1 completa

Objetivo: validar las 5 plantillas con contenido real antes de replicar x7. Todas las tareas dependen de Fase 0 completa.

### 1.1 `clases/clase-01-definicion-proyecto-html/teoria.md`
- AC: cumple patrón 0.2 para los objetivos de Clase 1 (definir idea de proyecto, estructura básica HTML).

### 1.2 `clases/clase-01-definicion-proyecto-html/guia-estudio.md`
- AC: cumple patrón 0.3 (checklist con los 3 entregables de Clase 1).

### 1.3 `clases/clase-01-definicion-proyecto-html/banco-preguntas.md`
- AC: cumple patrón 0.4 (10-20 preguntas sobre estructura HTML y definición de proyecto).

### 1.4 `clases/clase-01-definicion-proyecto-html/tarea.md`
- AC: cumple patrón 0.5. Dado que Clase 1 es Fase 1 pedagógica (participación anónima), la tarea debe referenciar Razzia/QuizLive para el repaso tipo Kahoot, no exposición individual.

### 1.5 `clases/clase-01-definicion-proyecto-html/examen.md`
- AC: cumple patrón 0.6.

### 1.6 Revisión de piloto
- AC: releer las plantillas de Fase 0 contra el resultado de 1.1-1.5 y ajustar si algún AC resultó ambiguo en la práctica, antes de replicar en Fase 2. Documentar el ajuste (si hubo) en `clases/_plantillas/`.
- **Estado (2026-09-01): completo.** Clase 1 (1.1-1.5) hecha y verificada contra los patrones 0.2-0.6. Ningún patrón resultó ambiguo — no hizo falta ajustar plantillas. Fase 2 puede arrancar replicando el mismo proceso para clases 2-4.

---

## Fase 2 — Clases 2-4 + Examen de medio curso

Las 3 clases son independientes entre sí (pueden ir en paralelo). El examen de medio curso depende de que las 4 clases (1-4) tengan su `banco-preguntas.md`.

### 2.1 Clase 2 — Secciones de contenido
- AC: `clases/clase-02-secciones-contenido/{teoria,guia-estudio,banco-preguntas,tarea,examen}.md` cumplen los patrones 0.2-0.6 para los objetivos/entregables de Clase 2 del temario.

### 2.2 Clase 3 — Estilo visual (CSS)
- AC: mismo patrón que 2.1, para Clase 3.

### 2.3 Clase 4 — Diseño responsive
- AC: mismo patrón que 2.1, para Clase 4.

### 2.4 `examenes/medio-curso.md`
- Depende de: 1.1-1.5, 2.1, 2.2, 2.3.
- AC1: documento con 15-20 preguntas citadas por `#` desde los bancos de clases 1-4 (proporcional: ~4-5 por clase), más un ejercicio práctico que pida entregar el sitio con las secciones de las clases 1-4 completas.
- AC2: rúbrica suma 100, con peso explícito por clase de origen de las preguntas.

**Estado (2026-09-01): Fase 2 completa.** Clases 2-4 y el examen de medio curso (20 preguntas, 5 por clase) hechos y verificados contra los patrones 0.2-0.6. También se agregó a las plantillas de Fase 0 la separación explícita "ejercicio en clase (guiado, sobre ejemplo)" vs "tarea (avance real del proyecto)" — regla de diseño por el curso de 2 semanas, aplicada retroactivamente en Clase 1. Fase 3 (clases 5-8 + minijuego Ahorcado) es el siguiente paso.

---

## Fase 3 — Clases 5-8 + Minijuego Ahorcado

Las 4 clases son independientes entre sí y de la Fase 2 (pueden ir en paralelo con Fase 2 si hay capacidad). El minijuego Ahorcado solo depende de Fase 0 (puede arrancar en paralelo a cualquier fase de contenido).

### 3.1 Clase 5 — Banner/logo con IA generativa
- AC: cumple patrones 0.2-0.6 para Clase 5. Nota: es la primera clase de Fase 3 pedagógica (parejas) — `tarea.md` debe reflejar pair-checking cronometrado, no trabajo individual ni grupal de 4.

### 3.2 Clase 6 — Enlaces, redes sociales y contacto
- AC: cumple patrones 0.2-0.6 para Clase 6.

### 3.3 Clase 7 — Ajustes finales y práctica guiada
- AC: cumple patrones 0.2-0.6 para Clase 7. `tarea.md` debe incorporar feedback estructurado entre pares (plantilla "1 cosa que me gustó" + "1 sugerencia" ya definida en `estrategias_didacticas_curso.md`).

### 3.4 Clase 8 — Publicación y presentación final
- AC: cumple patrones 0.2-0.6 para Clase 8.

### 3.5 Minijuego Ahorcado — motor extendido
- AC1: `minijuegos/constructor-de-paginas/src/App.jsx` (o un archivo nuevo importado desde ahí, ej. `src/engines/Ahorcado.jsx`) agrega un modo "Ahorcado" seleccionable desde la pantalla de selección de modo existente, sin romper los 3 modos actuales (`npm run dev` levanta y los 3 modos previos siguen jugables).
- AC2: estructura de niveles de Ahorcado por clase (`WORDS_BY_CLASS` o equivalente), con palabras/términos clave tomados de los `banco-preguntas.md` y `guia-estudio.md` (glosario) de cada una de las 8 clases — mínimo 5 palabras por clase.
- AC3: `minijuegos/constructor-de-paginas/README.md` actualizado documentando el nuevo modo (mismo nivel de detalle que los 3 modos existentes).
- Unit test primordial: función pura de evaluación de intento de letra (¿la letra está en la palabra? ¿quedan intentos?) — es lógica de negocio aislable sin mockear UI. Si el proyecto no tiene test runner instalado, esta tarea primero agrega uno (ej. Vitest, ya compatible con el Vite existente) con AC reproducible (`npm run test` corre y pasa) antes de escribir el test de la función.

**Estado (2026-09-01): Fase 3 completa.** Clases 5-8 hechas y verificadas contra los patrones 0.2-0.6. El proyecto resultó ser **pnpm** (no npm) — se usó `pnpm add -D vitest` y `pnpm run test`/`pnpm run build`. Ahorcado implementado como pantalla de selector de juego en la raíz de `App.jsx` (Constructor de páginas / Ahorcado), reusando sonido/vibración/almacenamiento del motor existente; 8 niveles de fábrica (uno por clase, 6 palabras c/u) en `HANGMAN_BUILTIN_LEVELS`, con modo administrador propio (`HangmanAdmin`) para crear listas de palabras nuevas. Lógica pura extraída a `src/hangmanLogic.js` con 5 tests en Vitest, todos pasando. `pnpm run build` compila sin errores. **Limitación conocida:** no se probó visualmente en navegador dentro de este entorno (sin herramienta de captura/browser automation disponible) — se verificó por build limpio, servidor de desarrollo sirviendo sin error de transformación, y tests unitarios. Recomendado abrir `pnpm run dev` y jugar ambos modos manualmente antes de usar en clase. Fase 4 (examen final + examen práctico) es el siguiente paso.

---

## Fase 4 — Examen final + Examen práctico

Depende de: Fases 1-3 completas (todos los bancos de preguntas de las 8 clases, y todos los entregables oficiales listados).

### 4.1 `examenes/final.md`
- AC1: documento con 20-25 preguntas citadas por `#` desde los bancos de las 8 clases (proporcional, ~2-3 por clase), más un ejercicio práctico integrador.
- AC2: rúbrica suma 100, con peso explícito por clase de origen.

### 4.2 `examenes/practico.md`
- AC1: rúbrica que mapea, uno a uno, cada uno de los 24 entregables oficiales del temario (3 por clase × 8 clases) a un criterio de aceptación verificable sobre el sitio publicado del estudiante (ej. "Clase 1 - Entregable 2: existe un archivo HTML con estructura mínima válida" → verificable abriendo el link entregado).
- AC2: puntaje total suma 100, distribuido por clase (no necesariamente parejo — Fase 3 pedagógica/clases finales pueden pesar más al ser las que integran todo).
- AC3: incluye instrucción de entrega (link del sitio publicado, mismo formato que pide `Clase 8 - Entregable 1` en el temario).

**Estado (2026-09-01): Fase 4 completa — roadmap cerrado.** `examenes/final.md` (24 preguntas, 3 por clase + ejercicio integrador de 8 ítems) y `examenes/practico.md` (24 entregables mapeados 1:1, pesos 10/10/10/10/10/10/15/25 por clase, clases 7 y 8 más pesadas por ser las que integran/cierran el proyecto) hechos y verificados. Las 8 clases (teoría, guía, banco, tarea, examen), el minijuego Ahorcado y los 3 exámenes transversales (medio curso, final, práctico) están completos. Pendiente real: solo el backlog de la sección siguiente.

---

## Backlog (sin AC todavía — fuera de este roadmap)

Ya señalados como pendientes en `README.md` del repo, no se desarrollan en este roadmap:
- Despliegue real de Razzia/QuizLive en el VPS (`infraestructura/`).
- Candado de clases / ruta de progreso vía LMS (LearnHouse o Frappe LMS, sin decidir aún).
- Contraseña opcional para el modo administrador del minijuego.
- Contenido equivalente para el Curso "IA para Estudiantes + Asistente Personal".
