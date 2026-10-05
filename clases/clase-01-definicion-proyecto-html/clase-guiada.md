# Clase Guiada — Clase 1: Definición del proyecto + estructura básica (HTML)

> Libreto de las 2 horas de clase en vivo. La guía de estudio va al inicio
> de este mismo documento (ya no es una página aparte). `teoria.md`,
> `banco-preguntas.md` y `examen.md` siguen siendo la fuente canónica de
> cada pieza (numeración de preguntas, rúbrica); este archivo las organiza
> en el tiempo y profundiza la teoría. `tarea.md` queda al final.

**Objetivos de la clase:**
- Definir la idea de proyecto (portafolio, emprendimiento o marca personal)
- Aprender la estructura básica de una página web con HTML

**Entregables oficiales:**
1. Idea de proyecto definida por escrito
2. Primer archivo HTML con estructura mínima
3. Boceto/esquema de las secciones del sitio

**Fase pedagógica:** Fase 1 — participación anónima e individual (chat, sin cámara ni nombre real; ver `docs/estrategias_didacticas_curso.md`).

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** Antes de programar, definís tu proyecto respondiendo qué
querés mostrar, a quién y qué querés que haga quien lo visita. Después
aprendés que HTML organiza el contenido con etiquetas de apertura y
cierre, y que toda página tiene la misma estructura mínima:
`<!DOCTYPE html>`, `<html>`, `<head>` y `<body>`.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Idea de proyecto definida por escrito
- [ ] Primer archivo HTML con estructura mínima
- [ ] Boceto/esquema de las secciones del sitio

**Glosario:**

| Término | Definición |
|---|---|
| HTML | Lenguaje que estructura el contenido de una página web usando etiquetas. |
| Etiqueta | Palabra entre `<` y `>` que marca el inicio o el fin de un elemento (ej. `<p>` y `</p>`). |
| Elemento | El bloque completo formado por etiqueta de apertura + contenido + etiqueta de cierre. |
| Anidamiento | Poner una etiqueta dentro de otra; la que se abre última se cierra primera. |
| `<head>` | Sección de la página con información que el navegador usa pero no se ve directamente (ej. título de la pestaña). |
| `<body>` | Sección de la página donde va todo el contenido visible. |

## Antes de empezar (checklist del profesor)

- [ ] Tener a mano el ejemplo de Valeria (fotógrafa) para ilustrar en vivo.
- [ ] Preguntas de `banco-preguntas.md` elegidas para los chequeos en vivo: # 3, 8, 4, 6.
- [ ] Minijuego "Constructor de páginas" (`minijuegos/constructor-de-paginas/`), **Nivel 1 — "El titular de tu sitio"**, modo "Uno por uno", listo para compartir pantalla.
- [ ] Sala de Teams con chat habilitado para respuestas anónimas.

---

## Bloque 1 — Analogía: construir una casa para visitas (15 min)

Imaginá que te encargan construir una casa, pero antes de poner un solo
ladrillo tenés que responder: **¿para quién es esta casa y para qué la van a
usar?** No es lo mismo construir una casa para recibir clientes de un
negocio, que una casa-estudio para mostrar tu arte, que tu propia casa donde
simplemente vivís y recibís visitas ocasionales. La respuesta cambia cuántos
ambientes necesitás, dónde va la entrada principal, qué es lo primero que ve
alguien al abrir la puerta.

Un sitio web es exactamente eso: una casa digital. Antes de "poner ladrillos"
(código) necesitás saber **para quién es** y **para qué la van a usar**. Esa
es la primera mitad de la clase de hoy: el plano de tu casa antes de
construirla.

La segunda mitad tiene que ver con **cómo se arma físicamente cualquier
casa**, sin importar su propósito: toda casa tiene una estructura mínima que
la sostiene — cimientos, paredes, techo — antes de pensar en el color de las
paredes o los muebles (eso viene después, en la Clase 3, con CSS). En una
página web, esa estructura mínima se escribe en **HTML**. Así como una casa
sin cimientos no se sostiene, una página sin la estructura mínima de HTML no
funciona, sin importar cuán lindo la quieras decorar más adelante.

Guardá esta analogía — la vamos a usar todo el resto de la clase: **plano de
la casa = definir el proyecto**, **cimientos y paredes = estructura HTML**.

## Bloque 2 — ¿Qué creés vos? (5 min)

Antes de ver la teoría, respondé en el chat (nadie va a saber quién escribió
qué — escribí lo que pienses, no hay respuesta incorrecta todavía):

1. Si tuvieras que armar una página web de vos mismo hoy, sin saber nada de
   código, **¿qué es lo primero que pondrías?**
2. Cuando abrís cualquier página web en tu celular, ¿creés que **todo el
   contenido está "suelto" en un solo bloque**, o creés que el navegador
   **sabe distinguir qué es un título, qué es un párrafo y qué es una
   imagen**? ¿Por qué creés eso?

El profesor lee 3-4 respuestas en voz alta (anónimas) sin corregir todavía —
solo para generar expectativa antes de la teoría.

## Bloque 3 — Teoría + cuestionario (30 min)

### Tramo A — Definir la idea de tu proyecto (≈12 min)

Un sitio web sin un propósito claro termina siendo una mezcla de cosas sin
sentido para quien lo visita — es la casa sin plano del Bloque 1. En este
curso vas a elegir uno de estos tres tipos de proyecto:

- **Portafolio** — mostrás tu trabajo (fotos, diseños, escritos, música, lo
  que hagas) para que otros lo vean y potencialmente te contraten o te
  sigan. La casa es una "sala de exhibición": lo central es que se vea bien
  tu trabajo.
- **Emprendimiento** — presentás un producto o servicio propio que la gente
  pueda conocer, pedir o comprar (una marca de ropa, servicio de clases
  particulares, repostería, etc.). La casa es un "local": lo central es que
  quede claro qué vendés y cómo te contactan para comprarlo.
- **Marca personal** — un sitio centrado en vos: quién sos, qué hacés, tus
  redes, tu historia. Útil si todavía no tenés "algo que vender" pero
  querés tener presencia online. La casa es tu "carta de presentación":
  lo central es que quien te visite entienda quién sos rápido.

Ningún tipo es "mejor" que otro — depende de qué tenés hoy para mostrar. Si
dudás entre dos, elegí el que tenga más contenido real disponible ahora
mismo (fotos que ya sacaste, un producto que ya existe): vas a trabajar con
ese contenido las próximas 7 clases, así que conviene que sea algo que ya
tenés, no algo que "algún día vas a tener".

Para elegir y afinar la idea, respondé por escrito estas tres preguntas
guía — este es tu **brief**, el resumen que vas a usar en cada clase
siguiente para decidir qué contenido, qué colores y qué estructura le da tu
sitio:

1. **¿Qué querés mostrar?** (tus fotos, tu emprendimiento, tus habilidades,
   tu historia...)
2. **¿A quién?** (compañeros de colegio, clientes potenciales, familia,
   cualquiera que busque lo que hacés)
3. **¿Qué querés que haga la persona que lo visita?** (que te contacte, que
   te siga en redes, que te contrate, que simplemente te conozca)

#### Ejemplo práctico

Valeria quiere mostrar sus fotografías para que la contraten en eventos.

| Pregunta guía | Respuesta de Valeria |
|---|---|
| ¿Qué querés mostrar? | Mis mejores fotos de retratos y eventos |
| ¿A quién? | Personas que organizan cumpleaños, quince años o eventos pequeños en mi ciudad |
| ¿Qué querés que hagan? | Que me escriban por WhatsApp para cotizar una sesión |

Con esas tres respuestas, Valeria ya sabe que su proyecto es un
**portafolio** (objetivo: que la vean y la contraten, no vender un producto
fijo con precio cerrado).

Fijate que las tres respuestas están **conectadas**: si Valeria hubiera
dicho "a cualquiera, de cualquier parte del mundo", ya no tendría sentido
que el objetivo sea "que me escriban por WhatsApp para una sesión en mi
ciudad". Cuando armes tu brief, revisá que las tres respuestas cuenten la
misma historia.

### Chequeo rápido

Pregunta # 3 y # 8 de `banco-preguntas.md` (votación en vivo en el chat).

### Tramo B — La estructura básica de una página web con HTML (≈18 min)

HTML (**HyperText Markup Language**) es el lenguaje que le dice al
navegador **qué es** cada parte del contenido de una página: esto es un
título, esto es un párrafo, esto es una imagen. HTML no dice de qué color
es ni qué tan grande — eso es trabajo de CSS, que vas a ver en la Clase 3.
Por ahora, no te preocupes por cómo se ve: preocupate por qué **es** cada
cosa.

HTML se escribe con **etiquetas**: palabras entre `<` y `>` que "envuelven"
un contenido.

```html
<p>Esto es un párrafo.</p>
```

- `<p>` es la etiqueta de **apertura**.
- `</p>` (con la barra `/`) es la etiqueta de **cierre** — la barra es lo
  único que las distingue.
- Lo que está en el medio es el **contenido**.
- Todo el bloque (`<p>...</p>`) es un **elemento**.

Las etiquetas se pueden anidar (poner unas dentro de otras). Pensá en cajas
dentro de cajas: si metés una caja chica dentro de una grande, tenés que
cerrar primero la chica antes de cerrar la grande — no podés cerrar la caja
grande y dejar la chica "colgando" afuera. Con etiquetas es la misma regla:
la que se abrió **última** se cierra **primera**.

```html
<p>Hola, soy <strong>Valeria</strong>, fotógrafa.</p>
```

Acá `<strong>` (que resalta el texto en negrita) se abrió después de `<p>`,
así que se cierra antes que `<p>`. Si lo escribieras al revés
(`<p>Hola, soy <strong>Valeria</p>, fotógrafa.</strong>`) el navegador no
sabe dónde termina cada cosa y el resultado se rompe.

Toda página HTML tiene una **estructura mínima obligatoria**, siempre
igual — son los "cimientos y paredes" de la analogía del Bloque 1:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Título que aparece en la pestaña del navegador</title>
  </head>
  <body>
    <!-- Todo lo que se ve en la página va acá adentro -->
  </body>
</html>
```

- `<!DOCTYPE html>` le dice al navegador "esto es HTML5" — va siempre
  primero, y es la única línea de todo el documento que **no se cierra**
  (no existe `</!DOCTYPE>`).
- `<html>` envuelve **toda** la página — es la "caja más grande", todo lo
  demás va anidado adentro.
- `<head>` guarda información que el navegador necesita pero el usuario no
  ve directamente en la página (el título de la pestaña, más adelante el
  link al CSS). Pensalo como los planos y permisos de la casa: existen,
  importan, pero nadie que entra a visitarte los ve colgados en la pared.
- `<body>` es donde va **todo el contenido visible**: títulos, textos,
  imágenes, botones. Es la casa por dentro, donde vive todo lo que sí se
  ve.
- `<!-- así se escribe un comentario -->`: el navegador lo ignora
  completamente, sirve solo para dejarte notas a vos mismo en el código.

Dos errores comunes de principiante para evitar desde ya:

1. **Olvidar la etiqueta de cierre.** Si abrís `<p>` y te olvidás el
   `</p>`, el navegador va a asumir que todo lo que sigue (títulos,
   imágenes, lo que sea) sigue "adentro" de ese párrafo, y el resultado se
   ve raro sin que sea obvio por qué.
2. **Escribir contenido visible fuera de `<body>`.** Si ponés un `<h1>`
   dentro de `<head>` por error, el navegador simplemente no lo va a
   mostrar — y vas a pensar que "no funciona" cuando en realidad está en el
   lugar equivocado de la casa.

#### Ejemplo práctico

Estructura mínima con contenido real de Valeria:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Valeria Fotografía</title>
  </head>
  <body>
    <h1>Valeria Pérez — Fotógrafa</h1>
    <p>Capturo momentos únicos en cumpleaños, quince años y eventos pequeños.</p>
  </body>
</html>
```

`<h1>` es la etiqueta para el título/encabezado más importante de la
página — vas a usarla una sola vez por página, para lo más relevante (el
"cartel en la puerta de entrada" de tu casa digital).

### Chequeo rápido

Pregunta # 4 y # 6 de `banco-preguntas.md` (votación en vivo en el chat).

## Bloque 4 — Ejemplo guiado con un/a estudiante (20 min)

Se pide un/a voluntario/a (o dos, si el tiempo alcanza). En vivo, el
profesor:

1. Le hace las 3 preguntas guía del brief en voz alta y escribe las
   respuestas en pantalla, tal como las va diciendo el/la estudiante — sin
   apurar, dejando que piense.
2. Con esas respuestas ya escritas, arma junto al/la estudiante el archivo
   `.html` con la estructura mínima, narrando en voz alta qué hace cada
   etiqueta a medida que la escribe (igual que en el ejemplo de Valeria,
   pero ahora con el proyecto real del voluntario).
3. El resto del grupo sigue el proceso por pantalla compartida y puede
   sugerir en el chat (ej. "yo pondría eso en el `<h1>`").

El objetivo de este bloque no es que el voluntario "lo haga perfecto", sino
que todo el grupo vea el camino completo — de responder 3 preguntas a tener
un archivo `.html` real — antes de hacerlo cada uno por su cuenta.

## Bloque 5 — Práctica en clase: construyamos el sitio (35 min)

Ahora cada estudiante hace lo mismo con su propio proyecto:

1. Responde por escrito (en un documento propio, no en el chat grupal) las
   3 preguntas guía del brief.
2. Crea su propio archivo `.html` con la estructura mínima y agrega un
   `<h1>` con el nombre de su proyecto y un `<p>` que lo describa — contenido
   propio, no el ejemplo de Valeria ni el del voluntario del Bloque 4.

El profesor circula abriendo salas o mensajes privados en Teams para resolver
dudas 1 a 1, sin exponer a nadie frente al grupo entero (seguimos en Fase 1).
Quien termine antes puede repasar el minijuego "Constructor de páginas",
Nivel 1, sobre el ejemplo del juego (no sobre su proyecto).

Esto avanza directamente los entregables 1 y 2 de la clase. Quien no llegue
a terminar, lo termina como tarea (ver el cierre de este documento).

## Bloque 6 — Dudas y preguntas (10 min)

Preguntas disparadoras si el grupo queda callado:

- "¿A alguien le pasó que el navegador no mostraba algo que sí habían
  escrito? ¿Dónde estaba el error?"
- "¿Alguien todavía no tiene claro si su proyecto es portafolio,
  emprendimiento o marca personal? Repasemos ese caso en vivo."
- "¿Qué parte de la estructura mínima (`<!DOCTYPE>`, `<html>`, `<head>`,
  `<body>`) les generó más dudas?"

---

## Cierre de clase — Examen

Ver `examen.md` para el detalle completo (preguntas del banco, ejercicio
práctico y rúbrica). Se aplica acá, al cierre de la clase, como cuestionario
relámpago sobre lo recién practicado: 6 preguntas del banco (# 1, 2, 6, 7, 8,
10) más la revisión del mismo archivo `.html` que cada estudiante armó en el
Bloque 5.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: quien no terminó el
Bloque 5 en clase, termina en casa su brief escrito y su archivo `.html` con
la estructura mínima, `<h1>` y `<p>` con contenido propio. Ese es el
entregable oficial de la Clase 1 y lo que se revisa en el examen y al
empezar la Clase 2.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
