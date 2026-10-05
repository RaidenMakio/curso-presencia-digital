# Teoría — Clase 3: Estilo visual (CSS): colores y tipografía

## Vincular CSS al HTML

CSS (**Cascading Style Sheets**) define cómo se **ve** lo que HTML ya organizó: colores, tipografía, espaciados. Se escribe en un archivo aparte (ej. `style.css`) y se conecta al HTML con una etiqueta en el `<head>`:

```html
<head>
  <title>Valeria Fotografía</title>
  <link rel="stylesheet" href="style.css">
</head>
```

Dentro del archivo CSS, cada regla tiene tres partes:

```css
h1 {
  color: #2b2b2b;
  font-family: Georgia, serif;
}
```

- **Selector** (`h1`) — a qué etiqueta(s) le aplica la regla.
- **Propiedad** (`color`, `font-family`) — qué característica visual se cambia.
- **Valor** (`#2b2b2b`, `Georgia, serif`) — a qué se cambia.

También se puede apuntar a una clase (una etiqueta específica marcada con `class`) en vez de a todas las etiquetas de un tipo:

```html
<p class="destacado">¡Escribime hoy mismo!</p>
```
```css
.destacado {
  color: #b23a48;
}
```

## Definir y aplicar una identidad visual coherente (colores y tipografía)

Una identidad visual coherente usa **pocos elementos, repetidos siempre igual** — no es agregar todos los colores que gustan.

**Paleta de colores:** elegí 2-3 colores máximo:
- Un color principal (para títulos o acentos).
- Un color de texto (generalmente oscuro, para que se lea bien — buen contraste con el fondo).
- Un color de fondo (generalmente claro o neutro).

**Tipografía:** elegí máximo 2 fuentes (una para títulos, otra para texto, o la misma para ambas). Se puede usar una fuente "web-safe" (ya instalada en casi todos los dispositivos, como `Arial`, `Georgia`, `Verdana`) o importar una de Google Fonts.

### Ejemplo práctico

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

Con esto, toda la página comparte el mismo fondo, el mismo color de texto, y los títulos siempre resaltan con el mismo color y la misma tipografía — eso es identidad visual coherente.
