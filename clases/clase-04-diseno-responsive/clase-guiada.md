# Clase Guiada — Clase 4: Diseño responsive (celular y computadora)

> Libreto de la clase en vivo — **1 h 50** de contenido dentro de un espacio
> de 2 horas, dejando 5 min de margen al inicio y 5 min al final por
> imprevistos (conexión, arranque tarde, etc.). La guía de estudio va al
> inicio de este mismo documento (ya no es una página aparte). `teoria.md`,
> `banco-preguntas.md` y `examen.md` siguen siendo la fuente canónica de
> cada pieza (numeración de preguntas, rúbrica); este archivo las organiza
> en el tiempo y profundiza la teoría. `tarea.md` queda al final.
>
> **Novedad desde esta clase: charlas conversatorias.** Momentos breves donde
> el grupo mira sitios concretos y conversa con un formato guiado, y uso de
> IA como ayudante. Las reglas y el plan de las clases 4-8 están en
> `docs/estrategias_didacticas_curso.md`.

**Objetivos de la clase:**
- Aprender el uso básico de media queries y unidades flexibles
- Verificar la visualización del sitio en distintos dispositivos

**Entregables oficiales:**
1. Sitio ajustado en vista celular
2. Sitio ajustado en vista computadora
3. Corrección de espaciados/tamaños

**Fase pedagógica:** Fase 2 (ver `docs/estrategias_didacticas_curso.md`), sin salas: los grupos de 4 se reemplazan por **conversatorios de grupo completo** (voz o chat, sin obligar a nadie) y la práctica es individual.

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** un sitio responsive necesita la etiqueta `<meta name="viewport">`
en el `<head>`, media queries en CSS (`@media (max-width: ...)`) para aplicar
estilos distintos según el ancho de pantalla, y unidades flexibles (`%`,
`rem`, `vw`/`vh`) en vez de tamaños fijos en `px`. Se verifica con las
DevTools del navegador y, siempre que se pueda, en un celular real.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Sitio ajustado en vista celular
- [ ] Sitio ajustado en vista computadora
- [ ] Corrección de espaciados/tamaños

**Glosario:**

| Término | Definición |
|---|---|
| Responsive | Diseño que se adapta bien tanto a pantallas chicas (celular) como grandes (computadora). |
| Viewport | Meta etiqueta que le dice al navegador de celular que use el ancho real de la pantalla. |
| Media query | Regla CSS que aplica estilos distintos según el ancho de la pantalla (`@media`). |
| Unidad relativa | Medida que se adapta al contexto (`%`, `rem`, `vw`, `vh`), en vez de fija como `px`. |
| Breakpoint | El ancho de pantalla donde una media query cambia el diseño (ej. `600px`). |
| DevTools | Herramientas del navegador (`F12`) que permiten simular pantallas de distintos tamaños. |

## Antes de empezar (checklist del profesor)

- [ ] Tener a mano el sitio de Valeria (HTML + CSS de la Clase 3) **sin** viewport, con una imagen de ancho fijo `600px` y un botón chico, para el ejemplo del Bloque 3.
- [ ] Pedir con anticipación (en el chat o al empezar) **2 voluntarios/as** que compartan su sitio de la Clase 3 en el Bloque 3. Nadie está obligado: si nadie se ofrece, usar el sitio de Valeria y el del voluntario del ejemplo guiado.
- [ ] Preguntas de `banco-preguntas.md` elegidas para los chequeos en vivo: # 1, 2, 6 (Tramo A) y # 7, 12, 9 (Tramo B). Son las mismas 6 del examen de cierre.
- [ ] Tener abierta la ventana de un asistente de IA (Gemini, Copilot, ChatGPT, Claude…) para mostrar el paso a paso en el Bloque 3, y conocer sus límites gratuitos.
- [ ] Recordar a todo el grupo que tenga a mano **su sitio de la Clase 3** (`.html` + `style.css` en la misma carpeta) y un navegador con DevTools (`F12`).
- [ ] Tener a mano las reglas de la charla conversatoria (están en la diapositiva y abajo) para decirlas en voz alta la primera vez.

---

## Bloque 1 — Analogía, diagnóstico y primer conversatorio (15 min)

Ya tenemos la casa: **cimientos** (Clase 1), **habitaciones** (Clase 2) y
**decoración** (Clase 3). Hoy nos preguntamos algo que hasta ahora no
miramos: **¿para qué tamaño de cuarto se armó esa decoración?** (≈5 min)

Pensá en una **mudanza**. Tenés los mismos muebles: sillón, mesa, cama. En
una casa grande los ponés uno al lado del otro y sobra lugar. En un
departamento chico, la misma mesa contra la pared, el sillón pegado a la
cama y todo **en fila**. Los muebles no cambian; cambia **cómo los acomodás
según el tamaño del cuarto**. Si en el departamento chico dejaras todo como
en la casa grande, no podrías ni pasar.

Una página web es lo mismo. El contenido (texto, imágenes, botones) son los
muebles; la pantalla —celular, tablet o computadora— es el cuarto. En web:

- **El cuarto** es la pantalla del dispositivo.
- **Decirle al arquitecto el tamaño real del cuarto** es la etiqueta
  `<meta name="viewport">` (sin ella, el celular "se hace el grande").
- **"Si el cuarto es chico, acomodalo así"** es una **media query** (`@media`).
- **Muebles que se estiran o achican para entrar** son las **unidades
  flexibles** (`%`, `rem`, `vw`), en vez de muebles de tamaño fijo (`px`).

Guardá esta imagen — la usamos toda la clase: **pantalla = cuarto**,
**viewport = decirle el tamaño real**, **media query = "si es chico,
acomodalo así"**.

**Antes de ver la teoría**, respondé en el chat (anónimo, como siempre) (≈4 min):

1. Abrís tu sitio en el **celular**. ¿Qué creés que pasa?
   A) Se ve igual que en la compu, pero chiquito · B) Se adapta solo, sin que
   yo haga nada · C) Depende de lo que yo haya escrito.
2. ¿De qué dispositivo creés que viene la mayoría de las visitas a un sitio
   como el tuyo? A) Computadora · B) Celular · C) Mitad y mitad.

No hay respuesta correcta todavía: el profesor lee algunas en voz alta
(anónimas) sin corregir.

### Conversatorio 1 — "Mi peor momento con una página en el celular" (≈6 min)

Primera charla conversatoria del curso. Decir las **reglas** en voz alta:

1. Hablamos del **sitio**, no de la persona.
2. Comentamos con el formato *Me gusta… / Me confunde… / Yo probaría…*
   (hoy lo usamos poco, en la Clase 7 lo usamos completo).
3. **Nadie está obligado a hablar**: quien prefiera, escribe en el chat.

Pregunta de apertura: **"Acordate de una página que te costó usar en el
celular: ¿qué pasaba exactamente?"** (texto diminuto, botones difíciles de
tocar, imagen que se sale, había que hacer zoom y arrastrar…). Se da la
palabra a 2-3 personas o se leen respuestas del chat. El profesor **anota
en una lista visible** los problemas que van saliendo — esa lista es la
**checklist de revisión** que se usa en el Bloque 3.

Cierre (30 seg): "Cada uno de esos problemas tiene arreglo, y hoy los vamos
a ver."

## Bloque 2 — Teoría + cuestionario (25 min)

Este bloque va con preguntas seguidas, casi todo el rato: cada concepto se
cierra con un chequeo antes de pasar al siguiente. Reparto: viewport y
media queries ≈12 min, unidades flexibles y verificación ≈13 min.

### Tramo A — Viewport y media queries (≈12 min)

Un sitio **responsive** se ve bien tanto en celular como en computadora, sin
que el texto quede gigante o las imágenes se corten. Dos piezas lo hacen
posible.

**1. La etiqueta viewport**, en el `<head>`, le dice al navegador del celular
que use el **ancho real** de la pantalla en vez de simular una de escritorio:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Sin esta línea, ningún ajuste responsive funciona bien en celular: el
navegador muestra la página como si fuera de escritorio y la **achica** para
que entre. Va siempre, en toda página, junto a `charset` y `title`.

**Chequeo rápido:** pregunta # 1 de `banco-preguntas.md` (votación en vivo
en el chat).

**2. Media queries**, en el CSS, aplican reglas distintas según el ancho de
la pantalla:

```css
/* Estilos por defecto (para pantallas grandes) */
h1 {
  font-size: 40px;
}

/* Solo se aplica si la pantalla mide 600px de ancho o menos */
@media (max-width: 600px) {
  h1 {
    font-size: 28px;
  }
}
```

- `@media` = "acomodá los muebles según el cuarto".
- `(max-width: 600px)` = la **condición**: "600px de ancho **o menos**".
- Adentro van reglas normales, que **pisan** a las de afuera solo cuando la
  condición se cumple.
- Ese ancho donde cambia el diseño se llama **breakpoint**.

**Chequeo rápido:** pregunta # 2 (¿qué palabra clave aplica estilos según el
ancho?) y después la # 6 (¿cuándo se aplican los estilos de
`@media (max-width: 600px)`?), una diapositiva por pregunta.

**Errores frecuentes** al escribir media queries:
1. Poner la media query **arriba** de la regla que quiere pisar: como el CSS
   se lee de arriba abajo, la que va **después** gana. Las media queries van
   al final del archivo.
2. Olvidar las llaves de cierre: `@media` tiene **dos pares** de llaves (una
   para la media query, otra para cada regla adentro).
3. Olvidar el viewport y pensar que "la media query no funciona".

### Tramo B — Unidades flexibles y cómo verificar (≈13 min)

Las medidas fijas (`px`) no se adaptan: un ancho de `500px` en un celular de
360px se sale de la pantalla. Las **unidades flexibles** sí:

- `%` — relativo al **elemento contenedor** (`width: 90%` = el 90 % de su
  caja madre).
- `rem` — relativo al tamaño de fuente **base** de la página; sirve para
  textos y espaciados que escalan juntos.
- `vw` / `vh` — relativo al ancho / alto de la **ventana** del navegador
  (`50vw` = la mitad del ancho de la ventana).

**Chequeo rápido:** pregunta # 7 (¿cuál es una unidad relativa?) y después la
# 12 (diferencia entre `vw` y `%`).

Una combinación muy útil, para las imágenes de una galería:

```css
.galeria img {
  width: 100%;
  max-width: 400px;
}
```

`width: 100%` la adapta al ancho disponible; `max-width: 400px` evita que
en pantallas grandes crezca demasiado.

**Verificar en distintos dispositivos.** No alcanza con "se ve bien en mi
compu": hay que revisarlo como lo va a ver quien lo abra desde el celular.

1. **DevTools** (`F12`, o clic derecho → *Inspeccionar*; ícono de celular /
   tablet): simulan pantallas de distintos tamaños sin necesitar otro
   dispositivo.
2. **Celular real**, siempre que se pueda: el simulador ayuda pero no
   reemplaza al dispositivo verdadero.
3. Revisar en ambos: que el texto se lea **sin hacer zoom**, que las
   imágenes **no se corten ni desborden**, y que botones y enlaces sean
   **fáciles de tocar con el dedo**.

**Chequeo rápido:** pregunta # 9 (¿las DevTools reemplazan por completo
probar en un celular real?).

#### Ejemplo práctico

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
</head>
```

```css
.galeria img {
  width: 100%;
  max-width: 400px;
}

@media (max-width: 600px) {
  body {
    font-size: 16px;
  }
  .galeria img {
    max-width: 100%;
  }
}
```

Con esto las imágenes nunca pasan de 400px en pantallas grandes, pero
ocupan todo el ancho disponible en celular, y el texto queda cómodo de leer
en pantallas chicas.

## Bloque 3 — Del ejemplo a tu sitio (45 min)

### Ejemplo guiado (≈10 min)

Con el sitio de Valeria (o el de un/a voluntario/a), el profesor hace en
vivo:

1. Abre el sitio con `F12` → **modo celular** (ancho ≈ 375px). Junto con el
   grupo lista **qué se ve mal**: (a) todo se ve diminuto (falta viewport),
   (b) una imagen se sale de la pantalla (ancho fijo), (c) el botón es muy
   chico para tocarlo.
2. Agrega el **viewport** en el `<head>` y recarga. Cambia el tamaño del
   texto.
3. Cambia el ancho fijo de la imagen por `width: 100%; max-width: 600px;`.
4. Agrega **una media query** al final de `style.css` que agrande el botón
   y ajuste el título en pantallas de 600px o menos.
5. Vuelve a mirar en **modo celular y modo computadora**: ¿se arregló y no
   se rompió nada?

### Conversatorio 2 — "Mirando sitios en el celular" (≈10 min)

Dos voluntarios/as **comparten su sitio de la Clase 3** en el celular
simulado (DevTools, modo celular), **antes de arreglarlo**. Es mejor así:
vemos problemas reales, sin ensayar.

Para cada sitio (≈4-5 min):
1. La persona dice en una frase **qué transmite su proyecto**.
2. El grupo mira el sitio y comenta con el formato *Me gusta… / Me
   confunde… / Yo probaría…* (voz o chat).
3. El profesor conecta cada comentario con la teoría: "esto se arregla con
   el viewport / con `%` / con una media query".

Regla de oro: **comentarios sobre el sitio, no sobre la persona.** Si nadie
se anima, se usa el sitio de Valeria o se leen comentarios anónimos del chat.

Cierre (30 seg): cada uno anota en su cuaderno **qué le llevó de esta
conversación para su propio sitio**.

### Práctica: ahora tu sitio, con una IA de ayudante (≈25 min)

Cada estudiante hace lo mismo con su propio proyecto:

1. **Diagnóstico propio (≈5 min).** Abrí tu sitio en `F12` → modo celular.
   Anotá **3 cosas que se ven mal** (texto, imágenes, botones, espaciados).
   Después probalo también en modo computadora.
2. **Arreglo base (≈5 min).** Poné el `<meta name="viewport">` en el
   `<head>` si todavía no lo tenés y cambiá los anchos fijos que desbordan
   por `%` o `max-width`.
3. **Ayudante de IA (≈10 min).** Para el problema que no supiste resolver,
   pedile ayuda a un asistente de IA con esta plantilla:

   > Soy estudiante de un curso de HTML y CSS. Mi sitio se ve mal en celular:
   > *[describí el problema con tus palabras: "la imagen se sale de la
   > pantalla", "el texto es muy chico"…]*. Este es mi CSS: *[pegá solo el CSS
   > relevante]*. Explicame en pocas palabras qué causa el problema y dame
   > **una** media query para pantallas de hasta 600px, con comentarios que
   > expliquen cada línea. No cambies nada más.

   **Reglas de uso de la IA** (van en la diapositiva):
   - **Primero intentá vos** y anotá qué falla; después preguntá.
   - **Pedí explicación**, no solo el código. **Pegá solo lo que entendés.**
   - **Probalo** en DevTools: la IA puede equivocarse con total seguridad.
   - **No pegues datos personales** (teléfono, dirección, correo).
4. **Verificación (≈5 min).** Volvé a mirar en modo celular y modo
   computadora: ¿se arregló? ¿se rompió algo? Anotá **qué te respondió la
   IA y si te sirvió** — lo conversamos en el Bloque 4.

El profesor va respondiendo dudas por el chat y circulando por la
pantalla compartida de quien quiera mostrar. Esto avanza los 3 entregables
de la clase. Quien no llegue a terminar, lo termina como tarea.

## Bloque 4 — Dudas y conversatorio final (10 min)

### Conversatorio 3 — "Qué nos dijo la IA" (≈7 min)

Preguntas para abrir la charla (voz o chat):

- "¿Alguien le pidió ayuda a la IA? **¿Qué le pidieron y qué les
  respondió?**"
- "¿Le hicieron caso tal cual? ¿Había algo que **no entendieron** o que
  **no funcionó**?"
- "¿La IA usó `px` o `%`? ¿Puso el breakpoint en `600px` como vimos hoy?
  Comparen con lo que aprendimos."
- "¿En qué situación **no** confiarían en lo que responde la IA?"

El profesor cierra con la idea central: **la IA es un ayudante, no quien
decide.** Sirve para explicar y sugerir; quien verifica y se hace cargo del
sitio sos vos. En la Clase 5 volvemos a usar IA, esta vez para crear
imágenes.

### Dudas (≈3 min)

Si el grupo queda callado:

- "¿A alguien le sigue desbordando una imagen? ¿Revisaron el `max-width` y
  que la media query esté al final del archivo?"
- "¿Se ve bien en modo celular **y** en modo computadora, o arreglaron uno y
  se rompió el otro?"

---

## Cierre de clase — Examen (15 min)

Vamos a responder juntos 6 preguntas para cerrar lo que vimos hoy.
Respondé en el chat y después vemos la respuesta entre todos: # 1, 2, 6, 7,
9 y 12 de `banco-preguntas.md`. Ver `examen.md` para el detalle completo
(rúbrica y ejercicio práctico).

**Así se evalúa la tarea de hoy:** las 6 preguntas respondidas juntos en
clase valen 60 puntos; tu sitio vale 40 puntos (viewport presente 10,
media query funcional 15, sin errores visuales en celular ni computadora
15) — ver el detalle en `examen.md`.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: quien no terminó el
Bloque 3 en clase, termina en casa su sitio ajustado — con el viewport en el
`<head>`, al menos una media query funcional y sin texto cortado ni imágenes
desbordadas, revisado en modo celular y en modo computadora. Ese es el
entregable oficial de la Clase 4 y lo que se revisa al empezar la Clase 5.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
