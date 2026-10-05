# Clase Guiada — Clase 3: Estilo visual (CSS): colores y tipografía

> Libreto de la clase en vivo — **1 h 50** de contenido dentro de un espacio
> de 2 horas, dejando 5 min de margen al inicio y 5 min al final por
> imprevistos (conexión, arranque tarde, etc.). La guía de estudio va al
> inicio de este mismo documento (ya no es una página aparte). `teoria.md`,
> `banco-preguntas.md` y `examen.md` siguen siendo la fuente canónica de
> cada pieza (numeración de preguntas, rúbrica); este archivo las organiza
> en el tiempo y profundiza la teoría. `tarea.md` queda al final.

**Objetivos de la clase:**
- Vincular CSS al HTML
- Definir y aplicar una identidad visual coherente (colores y tipografía)

**Entregables oficiales:**
1. Paleta de colores definida y aplicada
2. Tipografía elegida y aplicada
3. Archivo CSS vinculado correctamente

**Fase pedagógica:** Fase 2 (ver `docs/estrategias_didacticas_curso.md`). En esta versión de la clase la práctica sigue siendo individual, con las dudas por el chat y sin salas.

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** CSS se vincula al HTML con `<link rel="stylesheet" href="...">`
dentro del `<head>`. Cada regla CSS tiene selector, propiedad y valor. La
identidad visual coherente usa pocos elementos repetidos siempre igual: 2-3
colores máximo (principal, texto, fondo) y máximo 2 tipografías.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Paleta de colores definida y aplicada
- [ ] Tipografía elegida y aplicada
- [ ] Archivo CSS vinculado correctamente

**Glosario:**

| Término | Definición |
|---|---|
| CSS | Lenguaje que define la apariencia visual del HTML (colores, tipografía, espaciados). |
| Selector | Parte de una regla CSS que indica a qué etiqueta(s) o clase aplica. |
| Propiedad / valor | Qué característica visual se cambia y a qué se cambia (ej. `color: #2b2b2b`). |
| `class` | Atributo HTML que marca una etiqueta específica para poder aplicarle estilos aparte. |
| Contraste | Diferencia entre el color de texto y el de fondo, necesaria para que se lea bien. |
| Fuente web-safe | Tipografía ya instalada en casi todos los dispositivos (ej. Arial, Georgia). |

## Antes de empezar (checklist del profesor)

- [ ] Tener a mano el archivo `.html` de la Clase 2 de un voluntario/a (con sus 3 secciones) para el ejemplo guiado del Bloque 3.
- [ ] Tener a mano el ejemplo de Valeria con sus 3 secciones, sin estilos, para mostrar el "antes y después".
- [ ] Preguntas de `banco-preguntas.md` elegidas para los chequeos en vivo: # 1, 9, 2, 6 (Tramo A) y # 5, 13 (Tramo B).
- [ ] Recordarle al grupo que tenga el `.html` y una carpeta donde guardar también el `style.css`: los dos archivos tienen que quedar **en la misma carpeta**.

---

## Bloque 1 — Analogía y diagnóstico: decorar la casa (15 min)

En la Clase 1 levantamos los **cimientos y las paredes**. En la Clase 2
dividimos la casa en **habitaciones** (`<section>`). Hoy le toca a lo que
más se nota cuando alguien entra: la **decoración** — la pintura, los
muebles, el estilo.

Pensá en dos casas con las mismas habitaciones. En la primera, cada
habitación se pintó de un color distinto porque "ese color me gustaba", hay
cuatro estilos de sillas mezclados y el cartel de la puerta cambia de letra
en cada cuarto. Es una casa cansadora: la visita no sabe si está en un solo
lugar o en cinco. En la segunda, se eligieron **tres colores** y **un solo
estilo de mueble** y se repitieron en todas partes. Tiene personalidad, se
recuerda, se siente "de alguien". Eso es una **identidad visual coherente**:
**pocos elementos, repetidos siempre igual**.

Ahora, ¿cómo se decora una casa de manera ordenada? Con un **manual de
decoración**: una hoja que dice "todas las paredes van de este color",
"todos los carteles usan esta letra". Quien decora no anda cambiando
habitación por habitación: lee el manual y aplica cada regla donde
corresponde. En una página web:

- El **manual de decoración** es el archivo **CSS** (`style.css`).
- **Avisarle al decorador que el manual existe** es la etiqueta `<link>`
  del `<head>`.
- **Cada regla del manual** ("los títulos van en este color y esta letra")
  se aplica a toda la página de una sola vez.

Guardá esta imagen — la usamos toda la clase: **decoración = CSS**,
**manual = `style.css`**, **avisar que existe = `<link>`**.

**Antes de ver la teoría**, respondé en el chat (anónimo, como siempre):

1. Si tuvieras que elegir los colores de tu sitio, **¿cuántos usarías?**
   A) 1 · B) 2 o 3 · C) 5 o más · D) Los que me gusten, sin límite.
2. HTML ya dice **qué es** cada parte de la página. ¿Dónde creés que se
   guarda **cómo se ve**? A) En el mismo archivo, mezclado con el texto ·
   B) En un archivo aparte que se conecta al HTML.

No hay respuesta correcta todavía: el profesor lee algunas respuestas en
voz alta (anónimas) sin corregir, solo para generar expectativa antes de la
teoría.

## Bloque 2 — Teoría + cuestionario (25 min)

Este bloque va con preguntas seguidas, casi todo el rato: cada concepto se
cierra con un chequeo antes de pasar al siguiente, no se acumulan para el
final. Reparto: vincular CSS ≈12 min e identidad visual ≈13 min.

### Tramo A — Vincular CSS al HTML (≈12 min)

CSS (*Cascading Style Sheets*, "hojas de estilo en cascada") define cómo se
**ve** lo que HTML ya organizó: colores, tipografía, espaciados. HTML dice
*qué es* cada cosa; CSS dice *cómo se ve*. Sin CSS, la página se muestra en
su versión "pura": letra con serifa, texto negro sobre blanco, todo pegado a
la izquierda. Con CSS, la misma página tiene personalidad.

**Se escribe en un archivo aparte** (por ejemplo `style.css`) y se conecta
con una etiqueta en el `<head>` del HTML:

```html
<head>
  <title>Valeria Fotografía</title>
  <link rel="stylesheet" href="style.css">
</head>
```

- `rel="stylesheet"` le dice al navegador "esto es una hoja de estilos".
- `href="style.css"` indica **dónde está** el archivo — igual que el `src`
  de una imagen. Si el nombre no coincide exactamente, o el archivo está en
  otra carpeta, la página se ve sin estilos.
- Va **dentro del `<head>`**, nunca en el `<body>`. `<link>` no tiene
  etiqueta de cierre, como `<img>`.

**Chequeo rápido:** pregunta # 1 de `banco-preguntas.md` (votación en vivo
en el chat).

Dentro del archivo CSS, todo se escribe en **reglas**, y cada regla tiene
tres partes:

```css
h1 {
  color: #2b2b2b;
  font-family: Georgia, serif;
}
```

- **Selector** (`h1`) — a qué etiqueta(s) le aplica la regla.
- **Propiedad** (`color`, `font-family`) — qué característica visual se
  cambia.
- **Valor** (`#2b2b2b`, `Georgia, serif`) — a qué se cambia.

Las propiedades y valores van entre llaves `{ }`, con `:` entre propiedad y
valor y `;` al final de cada línea. Un solo `;` olvidado puede hacer que
la regla siguiente no se aplique.

**Chequeo rápido:** pregunta # 9 de `banco-preguntas.md` (¿cuál es el
selector en `h1 { color: #b23a48; }`?) y después la # 2 (las 3 partes de
una regla), una diapositiva por pregunta.

A veces querés estilar **solo una** etiqueta y no todas las de su tipo. Para
eso se la marca con el atributo `class` (el mismo tipo de atributo que
`src` o `alt` de la Clase 2) y en CSS se apunta con un punto:

```html
<p class="destacado">¡Escribime hoy mismo!</p>
```
```css
.destacado {
  color: #b23a48;
}
```

**Chequeo rápido:** pregunta # 6 de `banco-preguntas.md` (votación en vivo
en el chat).

**Tres errores frecuentes** al vincular (los vamos a ver seguido en la
práctica):
1. El `.html` y el `.css` **no están en la misma carpeta**.
2. El nombre no coincide (`style.css` vs `Style.css` vs `estilos.css`).
3. Falta `rel="stylesheet"` o el `<link>` quedó en el `<body>`.

### Tramo B — Identidad visual coherente (≈13 min)

Volvemos a las dos casas: una identidad coherente usa **pocos elementos,
repetidos siempre igual**. No es agregar todos los colores que gustan.

**Paleta de colores — 2 o 3 colores como máximo**, cada uno con un rol:
- Un **color principal**, para títulos o acentos: lo que da personalidad.
- Un **color de texto**, generalmente oscuro, para que se lea bien.
- Un **color de fondo**, generalmente claro o neutro.

**Chequeo rápido:** pregunta # 5 de `banco-preguntas.md` (votación en vivo
en el chat).

**Contraste.** El texto tiene que **leerse**. Por eso importa la diferencia
entre el color del texto y el del fondo: texto oscuro sobre fondo claro (o
al revés) se lee bien; gris clarito sobre blanco, o blanco sobre amarillo
claro, cansa la vista o directamente no se lee — y peor todavía si el texto
y el fondo son casi el mismo color.

**Chequeo rápido:** pregunta # 13 de `banco-preguntas.md` (¿qué combinación
tiene mejor contraste?).

**Tipografía — máximo 2 fuentes**: una para títulos y otra para el texto (o
la misma para ambos). Podés usar una fuente **web-safe** (ya instalada en
casi todos los dispositivos, como `Arial`, `Georgia` o `Verdana`) o
importar una de Google Fonts. Para empezar, una web-safe es lo más simple y
no depende de internet.

**Dónde aplicarlo.** Lo más cómodo es definir el color de fondo, el color
de texto y la fuente principal **una sola vez en `body`**: todo lo que está
adentro lo hereda. Después, solo los títulos y los elementos destacados
llevan su regla propia. Así se aplica a toda la página de una vez y es
mucho más fácil mantenerla coherente.

#### Ejemplo práctico

```css
body {
  background-color: #faf7f2;
  color: #2b2b2b;
  font-family: Verdana, sans-serif;
}

h1, h2 {
  color: #b23a48;
  font-family: Georgia, serif;
}
```

Con esto, toda la página comparte el mismo fondo, el mismo color de texto, y
los títulos siempre resaltan con el mismo color y la misma tipografía — eso
es identidad visual coherente. Fijate también que `h1, h2` con una coma
aplica la misma regla a las dos etiquetas.

## Bloque 3 — Del ejemplo a tu sitio (45 min)

**Ejemplo guiado con un/a estudiante (≈15 min).** Se pide un/a voluntario/a
que traiga su archivo `.html` de la Clase 2 (con sus 3 secciones). En vivo,
el profesor:

1. Repasa con el/la estudiante su **brief**: ¿qué transmite su proyecto?
   ¿alegre, serio, elegante, cercano? Con eso elige juntos **3 colores**
   (principal, texto y fondo), los anotan y **verifican el contraste** entre
   texto y fondo.
2. Crea `style.css` **en la misma carpeta** que el `.html` y agrega el
   `<link>` en el `<head>`. Prueba con una sola regla (por ejemplo,
   `body { background-color: ... }`) para confirmar que está vinculado
   antes de seguir.
3. Aplica la paleta y la tipografía al `body`, a `h1, h2` y a un elemento
   destacado con `class`.
4. El resto del grupo sigue por pantalla compartida y puede sugerir en el
   chat.

El objetivo es que todos vean el archivo de la Clase 2 **cambiar de cara**
con pocas líneas, y que el truco de "probar con una regla antes de seguir"
quede claro antes de hacerlo cada uno.

**Práctica: construyamos el sitio (≈30 min).** Ahora cada estudiante hace lo
mismo con su propio proyecto:

1. Define su propia paleta de 2-3 colores y su tipografía, acordes a su
   proyecto (no copiar la de Valeria ni la del voluntario).
2. Crea su archivo `style.css` y lo vincula en el `<head>` de su `.html`
   con `<link rel="stylesheet" href="style.css">`.
3. Aplica paleta y tipografía al menos al `body`, a los títulos (`h1`/`h2`)
   y a algún elemento destacado.

El profesor va respondiendo dudas por el chat a medida que aparecen, sin
exponer a nadie frente al grupo entero. Esto avanza directamente los 3
entregables de la clase. Quien no llegue a terminar, lo termina como tarea
(ver el cierre de este documento).

## Bloque 4 — Dudas y preguntas (10 min)

Preguntas disparadoras si el grupo queda callado:

- "¿A alguien no se le aplicaron los estilos? ¿Revisaron que el `href`
  coincida con el nombre del archivo y que estén en la misma carpeta?"
- "¿Qué 3 colores eligieron y por qué? ¿Se lee bien el texto sobre el
  fondo?"
- "¿Cuál fue la parte más difícil: elegir colores, elegir la tipografía o
  escribir las reglas? Resolvámosla juntos en vivo."

---

## Cierre de clase — Examen (15 min)

Vamos a responder juntos 6 preguntas para cerrar lo que vimos hoy.
Respondé en el chat y después vemos la respuesta entre todos: # 1, 2, 5, 6,
9 y 13 de `banco-preguntas.md`. Ver `examen.md` para el detalle completo
(rúbrica y ejercicio práctico).

**Así se evalúa la tarea de hoy:** las 6 preguntas respondidas juntos en
clase valen 60 puntos; tu `.html` + `.css` vale 40 puntos (CSS vinculado
correctamente 15, paleta aplicada 15, tipografía aplicada 10) — ver el
detalle en `examen.md`.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: quien no terminó el
Bloque 3 en clase, termina en casa su `style.css` — vinculado en el `<head>`,
con su paleta de 2-3 colores y su tipografía aplicadas de forma consistente
en todo el sitio (fondo, texto y títulos). Ese es el entregable oficial de
la Clase 3 y lo que se revisa al empezar la Clase 4.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
