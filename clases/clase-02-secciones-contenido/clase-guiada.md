# Clase Guiada — Clase 2: Secciones de contenido (inicio, sobre mí/proyecto, galería o servicios)

> Libreto de la clase en vivo — **1 h 50** de contenido dentro de un espacio
> de 2 horas, dejando 5 min de margen al inicio y 5 min al final por
> imprevistos (conexión, arranque tarde, etc.). La guía de estudio va al
> inicio de este mismo documento (ya no es una página aparte). `teoria.md`,
> `banco-preguntas.md` y `examen.md` siguen siendo la fuente canónica de
> cada pieza (numeración de preguntas, rúbrica); este archivo las organiza
> en el tiempo y profundiza la teoría. `tarea.md` queda al final.

**Objetivos de la clase:**
- Aplicar etiquetas HTML para organizar texto, imágenes y listas
- Redactar contenido propio para cada sección

**Entregables oficiales:**
1. Sección "Inicio" con texto propio
2. Sección "Sobre mí/proyecto" completa
3. Sección de galería o servicios con al menos 2 elementos

**Fase pedagógica:** Fase 1 — participación anónima e individual (chat, sin cámara ni nombre real; ver `docs/estrategias_didacticas_curso.md`).

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** El sitio se organiza en bloques (`<section>`) con su propio
título (`<h2>`). Las imágenes van con `<img src="..." alt="...">` y los
listados de servicios o productos con `<ul>`/`<li>`. Cada sección lleva
contenido propio y concreto, no relleno genérico.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Sección "Inicio" con texto propio
- [ ] Sección "Sobre mí/proyecto" completa
- [ ] Sección de galería o servicios con al menos 2 elementos

**Glosario:**

| Término | Definición |
|---|---|
| `<section>` | Etiqueta que agrupa una parte temática de la página. |
| Atributo | Información extra dentro de una etiqueta de apertura (ej. `src`, `alt`). |
| `alt` | Texto alternativo de una imagen; se muestra si no carga o la lee un lector de pantalla. |
| `<ul>` / `<li>` | Lista sin orden y cada uno de sus elementos. |
| Contenido propio | Texto escrito por vos sobre tu proyecto real, no copiado ni genérico. |

## Antes de empezar (checklist del profesor)

- [ ] Tener a mano tu propio archivo `.html` de la Clase 1 (con `<h1>` y `<p>`) para usarlo como base del ejemplo guiado.
- [ ] Tener a mano el ejemplo de Valeria ampliado (más abajo, con las 3 secciones).
- [ ] Preguntas de `banco-preguntas.md` elegidas para los chequeos en vivo: # 1, 2, 4, 13 (Tramo A) y # 6, 9 (Tramo B).
- [ ] Pedirle a alguien que traiga su archivo `.html` de la Clase 1 para el ejemplo guiado (Bloque 3).
- [ ] **Sitios reales:** en los primeros minutos (el margen de 5 min de espera), pedir en el chat que cada estudiante pegue hasta **5 links** de sitios web que le gusten, de su país y del mundo. Mientras corre el Bloque 1, elegir **6** para revisar en el Bloque 2: **3 locales y 3 internacionales**, variados (un portafolio, un negocio, una marca personal, etc.) y que carguen bien.

---

## Bloque 1 — Analogía y diagnóstico: dividir la casa en habitaciones (15 min)

La clase pasada levantamos los **cimientos y las paredes** de la casa: la
estructura mínima de HTML (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
Pero una casa recién construida, sin paredes internas, es un solo ambiente
gigante — un galpón. Nadie sabe dónde está la cocina, dónde el living, dónde
tu cuarto. Es incómodo para vivir y más incómodo todavía para recibir
visitas: la visita entra y no entiende hacia dónde mirar.

Hoy dividimos esa casa en **habitaciones**, cada una con un propósito claro:

- El **living** — lo primero que ve cualquiera que entra. En tu sitio, es la
  sección **Inicio**: quién sos y qué hacés, en una frase.
- Tu **cuarto**, con fotos y objetos personales — cuenta tu historia. En tu
  sitio, es la sección **Sobre mí/proyecto**.
- Una **vitrina o estantería**, donde mostrás lo que hacés u ofrecés
  ordenado, ítem por ítem. En tu sitio, es la sección de **galería o
  servicios**.

En HTML, cada habitación es una etiqueta `<section>`. Así como una casa sin
paredes internas es un galpón incómodo, un sitio sin `<section>` es un
único bloque de texto larguísimo donde nadie encuentra nada. Guardá esta
imagen — la vamos a usar toda la clase: **paredes internas = `<section>`**.

**Antes de ver la teoría**, respondé en el chat (anónimo, como siempre):

1. Si tuvieras que **dividir tu propia página en 2 o 3 partes**, sin saber
   todavía cómo se hace en código, **¿cómo las llamarías?** (pensá en
   habitaciones: ¿qué va primero, qué va después?)
2. Imaginate que una imagen de tu sitio **no carga** (mala conexión, archivo
   roto). ¿Creés que el navegador **muestra algo en su lugar**, o que **queda
   un hueco vacío sin ninguna pista** de qué imagen faltaba?

El profesor lee algunas respuestas en voz alta (anónimas) sin corregir
todavía — solo para generar expectativa antes de la teoría.

**Sitios para más tarde.** Si todavía no lo hiciste, pegá en el chat hasta
5 sitios web reales que te gusten (de tu país y del mundo). Hoy vamos a
revisar 6 en vivo — 3 locales y 3 internacionales — para encontrar en ellos
las "habitaciones" y las etiquetas que vamos a aprender.

## Bloque 2 — Teoría + cuestionario + sitios reales (25 min)

Este bloque va con preguntas seguidas, casi todo el rato: cada concepto se
cierra con un chequeo antes de pasar al siguiente, no se acumulan para el
final. Reparto: teoría de etiquetas ≈10 min, contenido propio ≈5 min y
revisión de sitios reales ≈10 min.

### Tramo A — Etiquetas para organizar texto, imágenes y listas (≈10 min)

Un sitio de una sola sección larga es difícil de leer. Se organiza en
**bloques**, cada uno con su propósito — las habitaciones del Bloque 1:

- `<section>` agrupa una parte temática de la página (ej. "Inicio", "Sobre
  mí", "Servicios"). Usualmente lleva un `id` para poder identificarla:
  `<section id="sobre-mi">`. El `id` es como el cartel en la puerta de la
  habitación: le da un nombre único que después se puede usar para
  encontrarla (por ejemplo, para enlazarla desde un menú, más adelante en
  el curso).
- `<h2>` es el título de cada sección — más chico que el `<h1>` de la Clase
  1, que se usa **una sola vez por página** (es el cartel de la puerta de
  entrada de toda la casa, no de cada habitación).

**Chequeo rápido:** pregunta # 1 de `banco-preguntas.md` (votación en vivo
en el chat).

- `<img>` muestra una imagen. Es distinta a las etiquetas que ya conocés:
  **no tiene etiqueta de cierre** (no existe `</img>`) y necesita dos
  **atributos** — información extra que va dentro de la misma etiqueta de
  apertura:
  ```html
  <img src="foto-perfil.jpg" alt="Foto de perfil de Valeria">
  ```
  - `src` (*source*, "fuente") — de dónde sale la imagen: el nombre del
    archivo o un link.
  - `alt` (*alternative*, "alternativo") — texto alternativo. Se muestra si
    la imagen no carga, y lo leen los lectores de pantalla que usan las
    personas con discapacidad visual. **Nunca se deja vacío**: si tu `alt`
    está vacío o dice "imagen", esa persona no se entera de qué hay ahí.

**Chequeo rápido:** pregunta # 2 de `banco-preguntas.md` (votación en vivo
en el chat).

- `<ul>` (*unordered list*, lista sin orden) y `<li>` (*list item*, cada
  elemento de la lista) organizan varios ítems similares — perfecto para
  servicios o productos, donde no importa el orden en que aparecen:
  ```html
  <ul>
    <li>Diseño de logotipos</li>
    <li>Ilustración digital</li>
  </ul>
  ```

Un **atributo** siempre va en pares `nombre="valor"`, dentro de la etiqueta
de apertura, y una etiqueta puede tener más de uno (como `<img>`, que
siempre necesita `src` y `alt` juntos).

#### Ejemplo práctico

```html
<section id="galeria">
  <h2>Mis servicios</h2>
  <ul>
    <li>Sesión de retrato — 45 min</li>
    <li>Cobertura de evento — medio día</li>
  </ul>
  <img src="ejemplo-retrato.jpg" alt="Ejemplo de sesión de retrato">
</section>
```

**Chequeo rápido:** preguntas # 4 y # 13 de `banco-preguntas.md`, una
diapositiva por pregunta (votación en vivo en el chat).

### Tramo B — Redactar contenido propio para cada sección (≈5 min)

Tener las etiquetas correctas no alcanza: cada sección necesita **texto que
hable de vos y tu proyecto real**, no relleno genérico ("Lorem ipsum" o
frases copiadas de internet). Una habitación vacía o llena de cajas sin
etiquetar tampoco sirve de mucho. Guía rápida por sección:

- **Inicio:** una frase corta que diga quién sos y qué hacés — es lo primero
  que lee cualquiera, el "living" de tu casa.
- **Sobre mí/proyecto:** 2 a 4 frases con tu historia o la del proyecto: qué
  te motivó, qué ofrecés, por qué confiar en vos.
- **Galería/servicios:** al menos 2 elementos **concretos**. "Hago cosas
  variadas" no dice nada; "Diseño de logotipos" sí.

Fijate que esto conecta directo con tu **brief** de la Clase 1 (¿qué querés
mostrar? ¿a quién? ¿qué querés que hagan?): el contenido de cada sección
tiene que responder a esas mismas tres preguntas, ahora repartido en
habitaciones distintas.

#### Ejemplo práctico

Valeria (fotógrafa) ya tenía su Clase 1 lista. Así queda dividida en
secciones:

```html
<section id="inicio">
  <h1>Valeria Pérez — Fotógrafa</h1>
  <p>Capturo momentos únicos en cumpleaños, quince años y eventos pequeños.</p>
</section>

<section id="sobre-mi">
  <h2>Sobre mí</h2>
  <p>Empecé a fotografiar hace 3 años en cumpleaños de amigos. Hoy trabajo
  con luz natural y edición simple para que las fotos se vean auténticas,
  no sobreeditadas.</p>
</section>

<section id="galeria">
  <h2>Mis servicios</h2>
  <ul>
    <li>Sesión de retrato — 45 min</li>
    <li>Cobertura de evento — medio día</li>
  </ul>
</section>
```

Notá que el `<h1>` de la Clase 1 **no desaparece**: se queda adentro de la
sección Inicio, porque sigue siendo el único título principal de toda la
página.

**Chequeo rápido:** preguntas # 6 y # 9 de `banco-preguntas.md`, una
diapositiva por pregunta (votación en vivo en el chat).

### Tramo C — Revisión de sitios reales (≈10 min)

Ahora miramos la teoría **en el mundo real**. Con los links que pegaron al
inicio, el profesor abre **6 sitios — 3 locales y 3 internacionales — de a
uno, ≈1,5 min por sitio**, compartiendo pantalla. Para cada uno, entre
todos identificamos:

1. **Habitaciones:** ¿qué secciones tiene y cómo se llaman? (inicio, sobre
   nosotros, servicios/productos, contacto…)
2. **Título principal:** ¿cuál es el `<h1>`? ¿Es uno solo?
3. **Listas:** ¿dónde hay `<ul>`/`<li>`? (el menú, los servicios, los
   productos…)
4. **Imágenes:** ¿cuáles hay y qué tienen en el `alt`?
5. **Contenido:** ¿es concreto o genérico? ¿Se entiende quién es y qué
   hace en 5 segundos?

**Cómo mirar el código real.** Clic derecho → *Inspeccionar* (o `F12`) para
ver las etiquetas de un elemento; `Ctrl+U` abre el código fuente completo, y
con `Ctrl+F` se busca `<section`, `<h1`, `<img` o `<li`.

**Ojo, dato importante:** muchos sitios reales **no usan `<section>`**: usan
otras etiquetas (`<div>`, `<header>`, `<nav>`, `<footer>`…). No pasa nada.
Identificamos la habitación **por su función**, no por el nombre de la
etiqueta — y eso es justo lo que vamos a hacer nosotros con las nuestras.

Los estudiantes participan por el chat ("yo veo 4 habitaciones") y el
profesor confirma mirando el código. Con esto cerramos la teoría y pasamos a
construir.

## Bloque 3 — Del ejemplo a tu sitio (45 min)

**Ejemplo guiado con un/a estudiante (≈15 min).** Se pide un/a voluntario/a
que traiga su archivo `.html` de la Clase 1 (con su `<h1>` y `<p>` de la
Clase 1). En vivo, el profesor:

1. Junto al/la estudiante, envuelve su `<h1>` y `<p>` existentes dentro de
   `<section id="inicio">...</section>` — mostrando que nada se pierde, solo
   se ordena.
2. Le pregunta en voz alta las 2-4 frases de su historia y arma junto a
   el/la estudiante la sección `<section id="sobre-mi">`, con su `<h2>` y el
   texto real.
3. Le pregunta qué 2 elementos concretos puede listar (servicios, productos,
   piezas de portafolio) y arma la tercera sección con `<ul>`/`<li>` o
   `<img>` según corresponda a su proyecto.
4. El resto del grupo sigue el proceso por pantalla compartida y puede
   sugerir en el chat.

El objetivo es que todos vean el archivo de la Clase 1 **crecer** en vivo,
sección por sección, antes de hacerlo cada uno con el suyo.

**Práctica: construyamos el sitio (≈30 min).** Ahora cada estudiante hace
lo mismo con su propio archivo `.html`:

1. Envuelve su `<h1>` y `<p>` existentes en `<section id="inicio">`.
2. Agrega `<section id="sobre-mi">` con `<h2>Sobre mí</h2>` y 2-4 frases
   propias.
3. Agrega una tercera sección de galería o servicios con `<h2>` y al menos 2
   elementos (`<ul>`/`<li>` o `<img>` con `alt`, según su proyecto).

El profesor va respondiendo dudas por el chat a medida que aparecen, sin
exponer a nadie frente al grupo entero (seguimos en Fase 1).

Esto avanza directamente los 3 entregables de la clase. Quien no llegue a
terminar, lo termina como tarea (ver el cierre de este documento).

## Bloque 4 — Dudas y preguntas (10 min)

Preguntas disparadoras si el grupo queda callado:

- "¿A alguien el `<img>` no le mostró la imagen? ¿Revisaron que `src` tenga
  el nombre exacto del archivo?"
- "¿Qué le pusieron en el `alt` de su imagen? Compartan un ejemplo en el
  chat."
- "¿A alguien le costó pensar los 2 elementos concretos de su galería o
  servicios? Pensemos uno juntos en vivo."

---

## Cierre de clase — Examen

Vamos a responder juntos 6 preguntas para cerrar lo que vimos hoy.
Respondé en el chat y después vemos la respuesta entre todos: # 1, 2, 4, 6,
9 y 13 de `banco-preguntas.md`. Ver `examen.md` para el detalle completo
(rúbrica y ejercicio práctico).

**Así se evalúa la tarea de hoy:** las 6 preguntas respondidas juntos en
clase valen 60 puntos; tu archivo `.html` con las 3 secciones (Inicio,
Sobre mí/proyecto, galería o servicios) vale 40 puntos — ver el detalle en
`examen.md`.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: quien no terminó el
Bloque 3 en clase, termina en casa sus 3 secciones — Inicio, Sobre
mí/proyecto y galería o servicios, cada una con contenido propio y no
genérico. Ese es el entregable oficial de la Clase 2 y lo que se revisa al
empezar la Clase 3.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
