# Clase Guiada — Clase 8: Publicación y presentación final

> Libreto de la clase en vivo — **1 h 50** de contenido dentro de un espacio
> de 2 horas, dejando 5 min de margen al inicio y 5 min al final por
> imprevistos (conexión, arranque tarde, etc.). La guía de estudio va al
> inicio de este mismo documento (ya no es una página aparte). `teoria.md`
> y `banco-preguntas.md` siguen siendo la fuente canónica de cada pieza;
> este archivo las organiza en el tiempo. `tarea.md` queda al final.
>
> **Última clase del curso — menos teoría, más práctica.** El Bloque 2 baja
> a 15 min y el Bloque 3 sube a 55 min, con más tiempo real para publicar
> sin apuro. **El cierre de hoy es el `examenes/final.md`**, el examen
> integrador de las 8 clases — 16 preguntas, 2 por clase (3.75 pts c/u =
> 60) + el ejercicio práctico integrador sobre tu sitio publicado (40 pts,
> 8 ítems de 5 pts, uno por clase) = **100 puntos**. `examen.md` (Clase 8
> sola, 6 preguntas) es un **extra opcional**: no se usa en el cierre en
> vivo ni suma a esta nota, solo sirve como repaso extra si alguien quiere
> practicar más.
>
> Cierra la Fase 3 (parejas por chat, sin sala, ver
> `docs/estrategias_didacticas_curso.md`). Charla conversatoria de cierre:
> "Presentación del sitio", con el link real. Si el tiempo no alcanza para
> que todos presenten en vivo, quienes no llegaron comparten su link y su
> guion en el chat general apenas termina la clase.

**Objetivos de la clase:**
- Aprender el proceso de publicación gratuita del sitio
- Presentar y compartir el resultado final

**Entregables oficiales:**
1. Sitio publicado con link funcional
2. Presentación del sitio ante el grupo
3. Link compartido en redes sociales propias

**Fase pedagógica:** Fase 3 (ver `docs/estrategias_didacticas_curso.md`), última clase. Presentación en cadena en parejas por chat, y conversatorio final de grupo completo.

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** publicar gratis con **Netlify Drop** es arrastrar la carpeta
del proyecto y obtener un **link público**. Antes de publicar hay que
revisar que el archivo principal se llame **`index.html`** y que las
imágenes estén bien referenciadas. La presentación final sigue una
estructura corta de **4 partes**: quién sos, recorrido del sitio, qué
aprendiste, y el link para visitarlo.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Sitio publicado con link funcional
- [ ] Presentación del sitio ante el grupo
- [ ] Link compartido en redes sociales propias

**Glosario:**

| Término | Definición |
|---|---|
| Publicar / deploy | Subir el sitio a un servicio que le da un link público accesible desde cualquier navegador. |
| Hosting | Servicio que aloja los archivos del sitio y los sirve por internet (ej. Netlify). |
| `index.html` | Nombre estándar del archivo principal que el navegador abre automáticamente. |
| Link público | La URL con la que cualquiera puede abrir tu sitio publicado. |
| Presentación | Recorrido corto y estructurado del sitio, mostrado al grupo. |

## Antes de empezar (checklist del profesor)

- [ ] Preparar un **sitio de prueba** descartable (no el proyecto de nadie) para la demo en vivo de Netlify Drop.
- [ ] Recordar con anticipación que cada estudiante traiga su **versión casi final de la Clase 7** (`index.html` + `style.css` + imágenes, todo en la misma carpeta).
- [ ] Preguntas de `banco-preguntas.md` de Clase 8 elegidas para los chequeos en vivo del Bloque 2: # 1, 2, 3, 9 (Tramo A) y # 5, 10 (Tramo B).
- [ ] **Tener a mano `../../examenes/final.md`** para el cierre: 16 preguntas (2 por clase) citadas por banco y clase — la lista completa, con el texto de cada una, está más abajo en "Cierre de clase".
- [ ] Definir de antemano las parejas para la "presentación en cadena" (distintas a las anteriores) y avisar que es por chat, sin sala.
- [ ] Pedir 3-4 voluntarios/as para presentar en vivo en el conversatorio de cierre — se puede pedir desde antes de la clase.

---

## Bloque 1 — Analogía y diagnóstico (15 min)

La casa está lista: **cimientos** (Clase 1), **habitaciones** (Clase 2),
**decoración** (Clase 3), se **acomoda según el cuarto** (Clase 4), tiene
**cartel** (Clase 5), **puertas y timbre** (Clase 6) y ya pasó el
**recorrido de inspección** (Clase 7). Hoy es el **día de la inauguración**.

Una casa terminada, pero sin dirección, no la puede visitar nadie: está
"lista" solo en teoría. Hoy hacemos tres cosas: le damos a la casa una
**dirección real en el mapa** para que cualquiera pueda llegar, **recibimos
visitas** y les mostramos un recorrido breve, y les damos la dirección para
que la compartan con más gente.

En una página web:

- **Darle una dirección real en el mapa** es **publicar** tu sitio: subirlo
  a un servicio (Netlify Drop) que le da un **link público**.
- **La puerta principal, donde toca primero quien llega** es tu archivo
  **`index.html`** — por eso se llama siempre igual.
- **Mostrar el recorrido a las visitas** es tu **presentación** de 1
  minuto.
- **Dar la dirección para que la compartan** es **compartir el link** en
  tus redes.

Guardá esta imagen — la usamos toda la clase: **dirección real = link
público**, **puerta principal = `index.html`**, **recorrido a las visitas =
presentación**.

**Antes de ver la teoría**, respondé en el chat (anónimo, como siempre):

1. ¿Alguna vez armaste algo (un dibujo, un video, un proyecto) y no se lo
   mostraste a nadie? ¿Por qué?
2. ¿Qué esperás sentir cuando alguien de afuera abra **tu** sitio por
   primera vez? A) Nervios · B) Orgullo · C) Las dos cosas.

No hay respuesta correcta todavía: el profesor lee algunas respuestas en
voz alta (anónimas) sin corregir, solo para generar expectativa antes de la
teoría.

## Bloque 2 — Lo esencial + cuestionario (15 min)

Bloque corto: solo lo que necesitás para publicar y presentar **ya mismo**
en el Bloque 3. Reparto: publicación ≈9 min, presentación ≈6 min.

### Tramo A — Publicación gratuita (≈9 min)

Publicar = subir tu sitio a un servicio que da un **link público**.
**Netlify Drop**, en 3 pasos: entrás a la página, **arrastrás la carpeta**
de tu proyecto al área indicada, y en segundos tenés tu link.

**Antes de publicar, revisar:** el archivo principal se llame
**`index.html`**, las imágenes estén bien referenciadas, y sea la
**versión casi final** de la Clase 7. Otras opciones (más avanzadas, para
cuando se sepa Git): GitHub Pages, Vercel.

**Chequeo rápido:** pregunta # 1 (¿qué te da publicar?), # 2 (¿cómo se
sube a Netlify Drop?), # 3 (¿cómo debe llamarse el archivo principal?) y
# 9 (nombrá otra opción gratuita).

### Tramo B — Presentar y compartir (≈6 min)

Presentación de **1 minuto**, 4 partes: **quién sos** (≈10 seg),
**recorrido del sitio** (≈30 seg), **qué aprendiste** (≈10 seg) y **el
link** (≈10 seg). Después, se comparte el link en las redes propias — el
cierre real del curso.

**Chequeo rápido:** pregunta # 5 (¿las 4 partes?) y # 10 (¿cuál dura
más?).

## Bloque 3 — Publicás y presentás (55 min)

### Demo guiada del profesor (≈10 min)

El profesor publica en vivo un **sitio de prueba** (no el proyecto de
nadie) con Netlify Drop: arrastra la carpeta, muestra el link generado, lo
abre en otra pestaña para confirmar que funciona. Todos siguen el proceso
en su propia pantalla, con un archivo de prueba, antes de hacerlo con su
sitio real.

### Publicá tu sitio real, con calma (≈25 min)

Más tiempo que de costumbre, porque es el paso más importante de la clase:

1. Revisá que tu archivo principal se llame `index.html` y que las
   imágenes estén bien referenciadas.
2. Publicá tu **versión casi final** de la Clase 7 con Netlify Drop.
3. Conseguí tu link público y **abrilo en otra pestaña** (o desde tu
   celular) para confirmar que funciona.
4. Si algo no carga bien, revisalo con calma: es el momento de resolverlo,
   con el profesor circulando por el chat.
5. Armá tu **guion de presentación** de 1 minuto con las 4 partes.

### Presentación en cadena, por chat (≈10 min)

Sin sala aparte. Cada pareja (distinta a las anteriores) comparte su link
real con la otra en el chat, junto con una frase de su guion. Reciben un
comentario corto de vuelta — practican mostrar el sitio **antes** de la
presentación al grupo completo.

### Conversatorio — "Presentación del sitio" (≈10 min)

Charla conversatoria de grupo completo, cierre del curso. 3-4 voluntarios/as
presentan en vivo, con las 4 partes de la estructura (≈1 min cada uno). El
grupo reacciona con el formato *Me gusta… / Me confunde… / Yo probaría…*
después de cada presentación.

Cierre: **quienes no llegaron a presentar en vivo comparten su link y su
guion en el chat general apenas termina la clase** — así todo el grupo
puede visitar todos los sitios, aunque no todos hayan presentado de viva
voz.

## Bloque 4 — Dudas y cierre del curso (10 min)

Preguntas disparadoras si el grupo queda callado:

- "¿Tu link abre bien desde **otro dispositivo o navegador**, no solo el
  tuyo?"
- "¿Ya compartiste tu link en alguna red social? Si no, ¿en cuál lo vas a
  compartir hoy?"
- "De todo el curso, ¿qué fue lo que más te costó? ¿Y lo que más
  disfrutaste?"

El profesor cierra agradeciendo el curso y recordando que **cada sitio
publicado hoy sigue siendo de cada estudiante** — pueden seguir
editándolo después.

---

## Cierre de clase — Examen final integrador (15 min)

Hoy no repasamos solo la Clase 8: repasamos **las 8 clases juntas**. Son
**16 preguntas** (2 por clase, tomadas de cada `banco-preguntas.md`), una
por diapositiva, en ronda rápida — respondé en el chat con una letra (o tu
respuesta corta) y enseguida vemos la respuesta entre todos. El detalle
completo (rúbrica y ejercicio práctico integrador) está en
`../../examenes/final.md`.

| Clase | Preguntas (del banco de esa clase) |
|---|---|
| 1 — Definición del proyecto + HTML | # 2, 5 |
| 2 — Secciones de contenido | # 1, 6 |
| 3 — Estilo visual (CSS) | # 2, 7 |
| 4 — Diseño responsive | # 1, 7 |
| 5 — Banner/logo con IA | # 2, 7 |
| 6 — Enlaces, redes y contacto | # 1, 7 |
| 7 — Ajustes finales | # 1, 6 |
| 8 — Publicación y presentación | # 1, 5 |

**Así se evalúa, sobre 100:** las 16 preguntas valen 60 puntos (3.75
c/u). El ejercicio práctico integrador vale 40 puntos, sobre tu sitio real
publicado, un ítem de 5 pts por cada clase: estructura HTML + secciones
(Clases 1-2), CSS con paleta y tipografía (Clase 3), responsive (Clase 4),
banner/logo con IA (Clase 5), enlaces y contacto (Clase 6), correcciones
aplicadas (Clase 7), y link público funcional (Clase 8) — el detalle exacto
de los 8 ítems está en `../../examenes/final.md`.

**Extra opcional:** si a alguien le queda tiempo o quiere repasar más, el
`examen.md` de cada clase (6 preguntas de esa clase sola) sigue disponible
como práctica libre — no es obligatorio y no suma a esta nota.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: si todavía no lo
hiciste, compartí tu link en al menos una red social propia y guardá una
captura de pantalla como evidencia. Si no llegaste a presentar en vivo,
compartí tu link y tu guion en el chat general del curso. Ese es el
entregable oficial de la Clase 8, y el cierre del curso.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
