# Teoría — Clase 1: Definición del proyecto + estructura básica (HTML)

## Definir la idea de tu proyecto

Antes de escribir una sola línea de código, necesitás saber **qué** vas a construir. Un sitio web sin un propósito claro termina siendo una mezcla de cosas sin sentido para quien lo visita.

En este curso vas a elegir uno de estos tres tipos de proyecto:

- **Portafolio** — mostrás tu trabajo (fotos, diseños, escritos, música, lo que hagas) para que otros lo vean y potencialmente te contraten o te sigan.
- **Emprendimiento** — presentás un producto o servicio propio que la gente pueda conocer, pedir o comprar (una marca de ropa, servicio de clases particulares, repostería, etc.).
- **Marca personal** — un sitio centrado en vos: quién sos, qué hacés, tus redes, tu historia. Útil si todavía no tenés "algo que vender" pero querés tener presencia online.

Para elegir y afinar la idea, respondé por escrito estas tres preguntas guía:

1. **¿Qué querés mostrar?** (tus fotos, tu emprendimiento, tus habilidades, tu historia...)
2. **¿A quién?** (compañeros de colegio, clientes potenciales, familia, cualquiera que busque lo que hacés)
3. **¿Qué querés que haga la persona que lo visita?** (que te contacte, que te siga en redes, que te contrate, que simplemente te conozca)

Estas tres respuestas son tu **brief** — el resumen que vas a usar en cada clase siguiente para decidir qué contenido, qué colores y qué estructura le da tu sitio. Si no tenés claro esto todavía, es normal — para eso es esta clase.

### Ejemplo práctico

Valeria quiere mostrar sus fotografías para que la contraten en eventos.

| Pregunta guía | Respuesta de Valeria |
|---|---|
| ¿Qué querés mostrar? | Mis mejores fotos de retratos y eventos |
| ¿A quién? | Personas que organizan cumpleaños, quince años o eventos pequeños en mi ciudad |
| ¿Qué querés que hagan? | Que me escriban por WhatsApp para cotizar una sesión |

Con esas tres respuestas, Valeria ya sabe que su proyecto es un **portafolio** (objetivo: que la vean y la contraten, no vender un producto fijo).

---

## Aprender la estructura básica de una página web con HTML

HTML (**HyperText Markup Language**) es el lenguaje que le dice al navegador **qué es** cada parte del contenido de una página: esto es un título, esto es un párrafo, esto es una imagen. No define colores ni tamaños — eso es trabajo de CSS, que vas a ver en la Clase 3.

HTML se escribe con **etiquetas**: palabras entre `<` y `>` que "envuelven" un contenido.

```html
<p>Esto es un párrafo.</p>
```

- `<p>` es la etiqueta de **apertura**.
- `</p>` (con la barra `/`) es la etiqueta de **cierre**.
- Lo que está en el medio es el **contenido**.
- Todo el bloque (`<p>...</p>`) es un **elemento**.

Las etiquetas se pueden anidar (poner unas dentro de otras), y cuando eso pasa, la que se abrió última se cierra primera:

```html
<p>Hola, soy <strong>Valeria</strong>, fotógrafa.</p>
```

Toda página HTML tiene una **estructura mínima obligatoria**, siempre igual:

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

- `<!DOCTYPE html>` le dice al navegador "esto es HTML5" — va siempre primero, no se cierra.
- `<html>` envuelve toda la página.
- `<head>` guarda información que el navegador necesita pero el usuario no ve directamente (el título de la pestaña, más adelante el link al CSS).
- `<body>` es donde va **todo el contenido visible**: títulos, textos, imágenes, botones.

### Ejemplo práctico

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

`<h1>` es la etiqueta para el título/encabezado más importante de la página — vas a usarla una sola vez por página, para lo más relevante.
