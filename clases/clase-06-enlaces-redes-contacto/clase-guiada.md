# Clase Guiada — Clase 6: Enlaces, redes sociales y contacto

> Libreto de la clase en vivo — **1 h 50** de contenido dentro de un espacio
> de 2 horas, dejando 5 min de margen al inicio y 5 min al final por
> imprevistos (conexión, arranque tarde, etc.). La guía de estudio va al
> inicio de este mismo documento (ya no es una página aparte). `teoria.md`,
> `banco-preguntas.md` y `examen.md` siguen siendo la fuente canónica de
> cada pieza (numeración de preguntas, rúbrica); este archivo las organiza
> en el tiempo. `tarea.md` queda al final.
>
> **Desde la Clase 6, menos teoría y más práctica:** el Bloque 2 baja a 15
> min (lo esencial + los mismos chequeos de siempre) y el Bloque 3 sube a
> 55 min, con más tiempo real para armar tu sitio. Sigue la **Fase 3**
> (parejas, ver `docs/estrategias_didacticas_curso.md`), con pareja
> **distinta a la de la Clase 5** y por chat, sin sala aparte. Charla
> conversatoria: "¿Cómo contactarías a esta persona?" (Bloque 3).

**Objetivos de la clase:**
- Crear enlaces funcionales e íconos de redes sociales
- Incorporar una vía de contacto clara

**Entregables oficiales:**
1. Enlaces a redes sociales funcionando
2. Sección o botón de contacto
3. Verificación del funcionamiento de todos los enlaces

**Fase pedagógica:** Fase 3 (ver `docs/estrategias_didacticas_curso.md`). Trabajo en parejas por chat (pareja rotada, distinta a la de la Clase 5), sin sala de video separada. La conversatoria siempre es de grupo completo.

## Guía de estudio rápida

Antes de arrancar, así se resume la clase de hoy — volvé a esta sección
cuando quieras repasar.

**Resumen:** un enlace se crea con `<a href="...">`, y para enlaces
externos conviene sumar `target="_blank" rel="noopener noreferrer"`. Los
errores más comunes son olvidar el `https://` o dejar `href="#"` sin
completar. El contacto se resuelve **sin backend** con `mailto:` (correo),
`wa.me/` (WhatsApp, con código de país y sin espacios) o `tel:` (llamada),
siempre en un lugar **visible y fácil de encontrar**.

**Checklist de autoevaluación** (para el final de la clase):
- [ ] Enlaces a redes sociales funcionando
- [ ] Sección o botón de contacto
- [ ] Verificación del funcionamiento de todos los enlaces

**Glosario:**

| Término | Definición |
|---|---|
| `href` | Atributo de `<a>` que indica a dónde lleva el enlace. |
| `target="_blank"` | Hace que el enlace abra en una pestaña nueva. |
| `rel="noopener noreferrer"` | Atributo de seguridad recomendado junto a `target="_blank"`. |
| `mailto:` | Prefijo de `href` que abre el cliente de correo del visitante. |
| `wa.me/` | Servicio de enlaces directos a un chat de WhatsApp. |
| `tel:` | Prefijo de `href` que abre la app de llamadas con el número precargado. |

## Antes de empezar (checklist del profesor)

- [ ] Tener a mano el sitio de Valeria (con su banner de la Clase 5) para el ejemplo guiado.
- [ ] Preparar una lista de 4-5 enlaces de ejemplo **con errores a propósito** (URL sin `https://`, `href="#"` sin completar, número de WhatsApp mal formateado) para el pair-checking.
- [ ] Tener 2-3 links reales (locales e internacionales) con distinta forma de mostrar el contacto, para el conversatorio.
- [ ] Preguntas de `banco-preguntas.md` elegidas para los chequeos en vivo: # 1, 2, 7 (Tramo A) y # 6, 8, 13 (Tramo B). Son las mismas seis del examen de cierre.
- [ ] Avisar que las parejas de hoy son **distintas** a las de la Clase 5, y siguen siendo por chat, sin sala aparte.

---

## Bloque 1 — Analogía y diagnóstico (15 min)

La casa ya tiene **cimientos** (Clase 1), **habitaciones** (Clase 2),
**decoración** (Clase 3), se **acomoda según el cuarto** (Clase 4) y tiene
su **cartel en la puerta** (Clase 5). Hoy le toca a dos cosas que toda casa
necesita: **puertas hacia otros lugares** y un **timbre que funcione**.

Pensá en tu casa con carteles que apuntan a otros lugares: "A 2 cuadras,
la plaza", "A la vuelta, el club". Si el cartel dice "plaza" pero el camino
te lleva a un terreno baldío, es un cartel **roto** — peor que no tener
cartel, porque genera desconfianza. Y toda casa necesita un **timbre o
buzón** visible desde la calle: si está escondido en el patio trasero,
nadie te encuentra para avisarte que llegó.

En una página web:

- **Los carteles que llevan a otro lugar** son los **enlaces** (`<a
  href="...">`), por ejemplo a tus redes sociales.
- **Un cartel roto** es un enlace mal armado: sin `https://`, con la URL
  mal copiada, o un `href="#"` sin completar.
- **El timbre o buzón, visible desde la calle** es tu **sección de
  contacto**: tiene que estar a la vista, no escondida al final.

Guardá esta imagen — la usamos toda la clase: **carteles que llevan a otro
lugar = enlaces**, **cartel roto = enlace mal armado**, **timbre visible =
contacto claro**.

**Antes de ver la teoría**, respondé en el chat (anónimo, como siempre):

1. ¿Alguna vez hiciste clic en un botón o enlace de una página y **no pasó
   nada**? ¿Qué creés que falló?
2. ¿Dónde esperás encontrar la forma de contactar a alguien en su sitio
   web? A) Al final de todo, bien escondida · B) En un lugar visible, fácil
   de encontrar · C) No me fijo.

No hay respuesta correcta todavía: el profesor lee algunas respuestas en
voz alta (anónimas) sin corregir, solo para generar expectativa antes de la
teoría.

## Bloque 2 — Lo esencial + cuestionario (15 min)

Bloque corto: solo lo que necesitás para armar tus enlaces y tu contacto
**ya mismo** en el Bloque 3. Cada concepto se cierra con un chequeo de una
pregunta. Reparto: enlaces y redes ≈7 min, contacto ≈8 min.

### Tramo A — Enlaces y redes sociales (≈7 min)

Un enlace se crea con `<a href="...">texto o ícono</a>`. Para enlaces a
**otro sitio** (como Instagram), sumá `target="_blank" rel="noopener
noreferrer"` — abre en pestaña nueva y evita que esa pestaña manipule tu
página:

```html
<a href="https://instagram.com/valeria.foto" target="_blank" rel="noopener noreferrer">
  📷 Instagram
</a>
```

Un emoji simple alcanza como ícono, sin dependencias extra. **Tres
errores frecuentes** ("cartel roto"): olvidar el `https://`, copiar mal la
URL, o dejar `href="#"` sin completar.

**Chequeo rápido:** pregunta # 1 (¿qué atributo indica a dónde lleva?),
después # 2 (¿qué hace `target="_blank"`?) y # 7 (¿por qué sumar
`rel="noopener noreferrer"`?) — una diapositiva por pregunta.

### Tramo B — Una vía de contacto clara (≈8 min)

Sin backend, con **enlaces directos**:

- **Correo:** `<a href="mailto:valeria@correo.com">Escribime</a>`.
- **WhatsApp:** `<a href="https://wa.me/59171234567">Escribime</a>` — con
  código de país, **sin espacios ni símbolos**.
- **Teléfono:** `<a href="tel:+59171234567">Llamame</a>`.

Tiene que estar **visible y fácil de encontrar** — su propia sección o un
botón destacado, no escondido al final de un párrafo.

**Chequeo rápido:** pregunta # 6 (¿qué servicio para WhatsApp?), # 8 (¿cómo
va el número?) y # 13 (¿para qué sirve `tel:`?).

#### Ejemplo práctico

```html
<section id="contacto">
  <h2>Contacto</h2>
  <a href="https://wa.me/59171234567" class="boton-contacto">💬 Escribime por WhatsApp</a>
  <a href="mailto:valeria@correo.com">✉️ valeria@correo.com</a>
  <div class="redes">
    <a href="https://instagram.com/valeria.foto" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
  </div>
</section>
```

## Bloque 3 — Armá tu sitio (55 min)

### Ejemplo guiado (≈10 min)

Con el sitio de Valeria, el profesor hace en vivo:

1. Agrega el enlace real a su Instagram, con `target="_blank" rel="noopener
   noreferrer"`.
2. Crea la sección `contacto` con un botón de WhatsApp (`wa.me/`), su
   correo (`mailto:`) y el ícono de su red social.
3. **Prueba cada enlace** haciendo clic: ¿abre el destino correcto? ¿en
   pestaña nueva los externos?

### Conversatorio — "¿Cómo contactarías a esta persona?" (≈10 min)

Charla conversatoria de grupo completo (voz o chat, nadie obligado). El
profesor comparte en pantalla 2-3 sitios reales (locales e internacionales)
con distinta forma de mostrar el contacto:

1. Para cada sitio: "¿Cómo contactarías a esta persona? ¿Lo encontraste
   fácil o tuviste que buscar?"
2. El grupo comenta con el formato *Me gusta… / Me confunde… / Yo
   probaría…*.
3. El profesor conecta con la teoría: ¿el contacto estaba visible? ¿usaba
   `wa.me/`, `mailto:`, un formulario?

Cierre (30 seg): cada uno elige **qué vía de contacto** va a usar en su
propio sitio, a partir de lo conversado.

### Pair-checking cronometrado por chat (≈7 min)

En pareja (por chat, sin sala aparte, distinta pareja que en la Clase 5),
reciben una lista de enlaces de ejemplo con **errores a propósito** (URL
sin `https://`, `href="#"` sin completar, número de WhatsApp mal
formateado) y deben encontrar y corregir cada error juntos.

### Ahora tu propio sitio (≈28 min)

Con más tiempo que en clases anteriores para armar todo con calma:

1. Agregá los enlaces reales a tus redes sociales (o las del proyecto), con
   `target="_blank" rel="noopener noreferrer"`.
2. Agregá una sección o botón de contacto con al menos una vía directa
   (`mailto:`, `wa.me/` o `tel:`), en un lugar visible.
3. **Verificá** haciendo clic en cada enlace que efectivamente lleva a
   donde corresponde, en celular y en computadora.
4. Si te sobra tiempo, repasá también el resto de tu sitio (paleta,
   textos, imágenes) — hoy tenés más minutos para construir.

El profesor va respondiendo dudas por el chat a medida que aparecen. Esto
avanza directamente los 3 entregables de la clase.

## Bloque 4 — Dudas y preguntas (10 min)

Preguntas disparadoras si el grupo queda callado:

- "¿A alguien le quedó un enlace roto? ¿Le faltaba el `https://`, o era un
  `href="#"` sin completar?"
- "¿Tu contacto queda visible apenas alguien entra, o hay que buscarlo?"
- "¿Probaste cada enlace haciendo clic, uno por uno?"

---

## Cierre de clase — Examen (15 min)

Vamos a responder juntos 6 preguntas para cerrar lo que vimos hoy.
Respondé en el chat y después vemos la respuesta entre todos: # 1, 2, 6, 7,
8 y 13 de `banco-preguntas.md`. Ver `examen.md` para el detalle completo
(rúbrica y ejercicio práctico).

**Así se evalúa la tarea de hoy:** las 6 preguntas respondidas juntos en
clase valen 60 puntos; tu sitio vale 40 puntos (enlaces a redes funcionando
15, sección/botón de contacto visible 15, sin enlaces rotos 10) — ver el
detalle en `examen.md`.

---

## Tarea en casa

Ver `tarea.md` para el detalle completo. En resumen: quien no terminó el
Bloque 3 en clase, termina en casa sus enlaces a redes sociales (con
`target="_blank" rel="noopener noreferrer"`) y su sección o botón de
contacto (`mailto:`, `wa.me/` o `tel:`), y verifica haciendo clic que cada
uno abre el destino correcto. Ese es el entregable oficial de la Clase 6 y
lo que se revisa al empezar la Clase 7.

---

## Para profundizar (opcional)

Lecturas, cheatsheets y herramientas para repasar con calma en [Recursos de la clase](recursos.md). No hacen falta para la tarea.
