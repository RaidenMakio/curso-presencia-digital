# Clase Guiada — Clase 5: Banner/logo con IA generativa de imágenes

> Libreto de la clase en vivo — **1 h 50** de contenido dentro de un espacio
> de 2 horas, dejando 5 min de margen al inicio y 5 min al final por
> imprevistos (conexión, arranque tarde, etc.). La guía de estudio va al
> inicio de este mismo documento (ya no es una página aparte). `teoria.md`,
> `banco-preguntas.md` y `examen.md` siguen siendo la fuente canónica de
> cada pieza (numeración de preguntas, rúbrica); este archivo las organiza
> en el tiempo y profundiza la teoría. `tarea.md` queda al final.
>
> **Arranca la Fase 3** (parejas, ver `docs/estrategias_didacticas_curso.md`)
> y la primera **charla conversatoria** con imágenes propias: "Prompts que
> funcionaron y prompts que no" (Bloque 3). Sin salas: las parejas trabajan
> **por chat** (mensajes directos o un hilo), no en una sala de video aparte.

**Objetivos de la clase:**
- Escribir prompts efectivos para generación de imágenes con IA
- Integrar la imagen generada al diseño del sitio

**Entregables oficiales:**
1. Banner o logo generado con IA
2. Imagen optimizada e insertada en el sitio
3. Ajuste de tamaño/posición del banner

**Fase pedagógica:** Fase 3 (ver `docs/estrategias_didacticas_curso.md`). Trabajo en parejas por chat, sin sala de video separada. La conversatoria siempre es de grupo completo.

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** un buen prompt combina **sujeto + estilo + colores + formato**,
usando los colores de tu paleta de la Clase 3, y evita pedir texto dentro de
la imagen (las IA todavía lo dibujan mal). Una vez generada, se **optimiza**
(comprimir, idealmente `.webp`) y se **inserta** con `<img>` + `alt`
descriptivo, ajustando tamaño con `width`/`max-width` y `object-fit`.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Banner o logo generado con IA
- [ ] Imagen optimizada e insertada en el sitio
- [ ] Ajuste de tamaño/posición del banner

**Glosario:**

| Término | Definición |
|---|---|
| Prompt | Instrucción de texto que se le da a una IA generativa para crear una imagen. |
| IA generativa de imágenes | Herramienta que crea imágenes nuevas a partir de un prompt (ej. Bing Image Creator, ChatGPT, Gemini). |
| Optimizar una imagen | Reducir su peso (KB/MB) sin perder calidad visible, para que el sitio cargue rápido. |
| `.webp` | Formato de imagen que suele pesar menos que `.png`/`.jpg` con calidad similar. |
| `object-fit` | Propiedad CSS que controla cómo una imagen llena su espacio sin deformarse. |

## Antes de empezar (checklist del profesor)

- [ ] Tener a mano el sitio de Valeria (con su paleta `#faf7f2` / `#b23a48` de la Clase 3) para el ejemplo guiado.
- [ ] Tener abierta una herramienta de generación de imágenes (ej. Bing Image Creator, ChatGPT o Gemini) para generar en vivo durante el ejemplo guiado.
- [ ] Preguntas de `banco-preguntas.md` elegidas para los chequeos en vivo: # 1, 2 (Tramo A) y # 6, 8, 9, 11 (Tramo B). Son las mismas seis del examen de cierre.
- [ ] Avisar que hoy las parejas se arman **por chat** (no hay sala de video aparte): cada quien escribe su prompt y su compañero/a responde en el mismo hilo.
- [ ] Recordar que cada estudiante necesita **su paleta de colores de la Clase 3** a mano.

---

## Bloque 1 — Analogía y diagnóstico (15 min)

Repasemos la casa: **cimientos** (Clase 1), **habitaciones** (Clase 2),
**decoración** (Clase 3) y ya sabemos **acomodarla según el tamaño del
cuarto** (Clase 4). Hoy le toca a algo que se ve **antes de entrar**: el
**cartel de la puerta**, la vidriera.

Imaginá que contratás a un **pintor de carteles carísimo y rapidísimo**: en
segundos te pinta cualquier cartel que le pidas. El problema es que **no lee
la mente**. Si le decís "pintame algo lindo", te pinta *cualquier cosa*
linda — no necesariamente la tuya. Si le decís "un cartel con una cámara de
fotos, estilo simple, en rojo y crema, bien ancho para la entrada", te pinta
exactamente eso. Y hay algo que este pintor hace mal todavía: **escribir
letras**. Si le pedís que escriba tu nombre en el cartel, es probable que
salgan letras raras o mal formadas. Para el texto, mejor pintarlo vos
después, con tus propias herramientas.

En una página web:

- **El pintor rapidísimo** es la **IA generativa de imágenes**.
- **Las instrucciones que le das** son el **prompt**.
- **El cartel/vidriera de la casa** es tu **banner o logo**.
- **"Que escriba mejor mi nombre yo"** es: el texto se agrega **después, con
  CSS**, no se le pide a la IA que lo dibuje.

Guardá esta imagen — la usamos toda la clase: **pintor = IA**,
**instrucciones = prompt**, **cartel = banner/logo**.

**Antes de ver la teoría**, respondé en el chat (anónimo, como siempre):

1. Si le pedís a una IA "hacéme una imagen linda para mi sitio", ¿qué
   esperás que pase? A) Sale perfecta para mi proyecto, tal cual la imaginé
   · B) Sale algo genérico que después tengo que ajustar o volver a pedir ·
   C) No tengo idea.
2. ¿Confiarías en que una IA escriba bien un texto (como tu nombre) *dentro*
   de una imagen? Sí / No.

No hay respuesta correcta todavía: el profesor lee algunas respuestas en
voz alta (anónimas) sin corregir, solo para generar expectativa antes de la
teoría.

## Bloque 2 — Teoría + cuestionario (25 min)

Este bloque va con preguntas seguidas, casi todo el rato: cada concepto se
cierra con un chequeo antes de pasar al siguiente. Reparto: prompts
efectivos ≈12 min, integrar la imagen al sitio ≈13 min.

### Tramo A — Prompts efectivos (≈12 min)

Un **prompt** es la instrucción de texto que le das a una IA generativa de
imágenes (Bing Image Creator, ChatGPT, Gemini…) para que cree una imagen.
Un prompt vago da un resultado vago: cuantos más detalles concretos
incluyas, mejor sale.

**Chequeo rápido:** pregunta # 1 de `banco-preguntas.md` (¿qué es un
prompt?), votación en vivo en el chat.

La fórmula que usamos en el curso tiene **4 partes**:

```
SUJETO + ESTILO + COLORES + CONTEXTO/FORMATO
```

- **Sujeto:** qué se ve en la imagen (una cámara de fotos, un ícono de
  repostería, tus iniciales).
- **Estilo:** cómo se ve (minimalista, flat design, acuarela, línea simple,
  moderno).
- **Colores:** los mismos de tu paleta de la Clase 3, así el banner combina
  con el resto del sitio.
- **Contexto/formato:** para qué es (banner horizontal ancho, logo
  cuadrado) y qué evitar.

**Chequeo rápido:** pregunta # 2 de `banco-preguntas.md` (¿cuáles son las 4
partes de la fórmula?).

#### Ejemplo práctico

Prompt de Valeria, usando su paleta de la Clase 3 (`#faf7f2` fondo,
`#b23a48` acento):

> "Banner minimalista para sitio de fotografía, estilo flat design con
> líneas simples, una cámara fotográfica como elemento central, colores
> tierra: fondo crema `#faf7f2` y acento rojizo `#b23a48`, formato
> horizontal ancho, sin texto."

**Un prompt vago** ("hacéme una imagen bonita para mi sitio") no incluye
sujeto, ni estilo, ni colores, ni formato: el resultado depende de la
suerte. Comparado con el de Valeria, ¿cuál te da más control sobre el
resultado?

**Tip importante:** pedí siempre **sin texto**. Las IA de imágenes todavía
generan mal el texto dentro de la imagen (letras deformadas o mal escritas).
Si necesitás texto, escribilo después con CSS sobre la imagen.

### Tramo B — Integrar la imagen al sitio (≈13 min)

Generada la imagen, faltan dos pasos: **optimizarla** e **insertarla bien**.

**1. Optimizar.** Las imágenes de IA suelen pesar mucho. Antes de subirla:
comprimila (herramientas online gratuitas) y, si podés, exportala en
`.webp` — pesa menos que `.png`/`.jpg` con calidad similar. Un sitio con
imágenes livianas carga más rápido.

**Chequeo rápido:** pregunta # 8 de `banco-preguntas.md` (¿qué formato pesa
menos?).

**2. Insertar con `<img>` y `alt`.**

```html
<img src="banner.webp" alt="Banner de Valeria Fotografía, cámara sobre fondo crema" class="banner">
```

El `alt` describe la imagen igual que en la Clase 2 — **nunca se deja
vacío**, ni siquiera en un banner decorativo.

**Chequeo rápido:** pregunta # 6 de `banco-preguntas.md` (¿qué atributo
nunca debe faltar?).

**3. Ajustar tamaño y posición con CSS.**

```css
.banner {
  width: 100%;
  max-width: 1200px;
  object-fit: cover;
}
```

- `width: 100%` la adapta al ancho disponible (como en la Clase 4).
- `max-width` evita que crezca de más en pantallas grandes.
- `object-fit: cover` recorta la imagen para que llene el espacio **sin
  deformarse**.

**Chequeo rápido:** pregunta # 9 de `banco-preguntas.md` (¿qué propiedad
controla cómo una imagen llena su espacio?).

**¿Y si necesito texto sobre el banner?** Se agrega **después**, con HTML y
CSS — por ejemplo un `<h1>` posicionado sobre la imagen — nunca pidiéndole
a la IA que lo dibuje.

**Chequeo rápido:** pregunta # 11 de `banco-preguntas.md` (¿cuál es la
forma correcta de agregar texto?).

#### Ejemplo práctico

```html
<section id="inicio">
  <img src="banner.webp" alt="Banner de Valeria Fotografía" class="banner">
  <h1>Valeria Pérez — Fotógrafa</h1>
  <p>Capturo momentos únicos en cumpleaños, quince años y eventos pequeños.</p>
</section>
```

## Bloque 3 — Del ejemplo a tu sitio (45 min)

### Ejemplo guiado (≈10 min)

Con el sitio de Valeria, el profesor hace en vivo:

1. **Arma el prompt** junto con el grupo, siguiendo la fórmula: sujeto
   (cámara), estilo (flat design, líneas simples), colores (`#faf7f2` /
   `#b23a48`, los de su paleta), formato (banner horizontal, sin texto).
2. **Genera la imagen** en una herramienta de IA, en vivo.
3. **La optimiza** (comprime, si se puede exporta `.webp`).
4. **La inserta** con `<img>` + `alt` descriptivo, dentro de la sección
   `inicio`, y ajusta con `width`, `max-width` y `object-fit: cover`.
5. Verifica que el banner se vea bien y no desborde en modo celular y
   computadora (como en la Clase 4).

### Práctica en parejas y con tu propio prompt (≈20 min)

**Pair-checking cronometrado por chat (≈6 min).** En pareja (por chat, sin
sala aparte), sobre un caso ficticio de ejemplo (no el proyecto propio
todavía), escriben juntos un prompt siguiendo la fórmula sujeto + estilo +
colores + formato. Cada pareja comparte su prompt en el chat general.

**Ahora tu propio proyecto (≈14 min):**

1. Escribí tu propio prompt para el banner o logo de tu proyecto, usando los
   colores de **tu** paleta de la Clase 3.
2. Generá la imagen con una herramienta de IA.
3. Optimizala e insertala en tu sitio con `<img>` + `alt` descriptivo.
4. Ajustá el tamaño y la posición con CSS (`width`/`max-width`,
   `object-fit`) para que se vea bien en celular y computadora.

El profesor va respondiendo dudas por el chat a medida que aparecen. Esto
avanza directamente los 3 entregables de la clase.

### Conversatorio — "Prompts que funcionaron y prompts que no" (≈11 min)

Charla conversatoria de grupo completo (voz o chat, nadie obligado):

1. La persona comparte su **prompt** y el **resultado** que le dio la IA.
2. El grupo comenta con el formato *Me gusta… / Me confunde… / Yo
   probaría…*.
3. El profesor conecta con la fórmula: ¿qué parte del prompt faltaba o
   sobraba? ¿el resultado combina con la paleta del sitio?

Cierre (30 seg): cada uno anota **qué le llevó** para reescribir su propio
prompt y volver a generar si hace falta.

## Bloque 4 — Dudas y preguntas (10 min)

Preguntas disparadoras si el grupo queda callado:

- "¿A alguien le salió texto raro o deformado en la imagen? ¿Qué le pediste
  a la IA?"
- "¿El color de tu banner combina con el resto de tu sitio? Si no, ¿qué le
  cambiarías al prompt?"
- "¿Se ve bien tu banner en modo celular **y** en modo computadora?"

---

## Cierre de clase — Examen (15 min)

Vamos a responder juntos 6 preguntas para cerrar lo que vimos hoy.
Respondé en el chat y después vemos la respuesta entre todos: # 1, 2, 6, 8,
9 y 11 de `banco-preguntas.md`. Ver `examen.md` para el detalle completo
(rúbrica y ejercicio práctico).

**Así se evalúa la tarea de hoy:** las 6 preguntas respondidas juntos en
clase valen 60 puntos; tu sitio vale 40 puntos (imagen generada con IA
presente 15, `<img>` con `alt` descriptivo 10, tamaño/posición ajustados sin
desborde 15) — ver el detalle en `examen.md`.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: quien no terminó el
Bloque 3 en clase, termina en casa su banner o logo — generado con IA,
optimizado, insertado con `<img>` + `alt` descriptivo y ajustado con CSS
para que no desborde en ninguna vista. Ese es el entregable oficial de la
Clase 5 y lo que se revisa al empezar la Clase 6.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
