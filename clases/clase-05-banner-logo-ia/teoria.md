# Teoría — Clase 5: Banner/logo con IA generativa de imágenes

## Escribir prompts efectivos para generación de imágenes con IA

Un **prompt** es la instrucción de texto que le das a una herramienta de IA generativa de imágenes (como Bing Image Creator, DALL-E o similares) para que cree una imagen. Un prompt vago da un resultado vago — cuantos más detalles concretos incluyas, mejor sale.

Una fórmula simple para armar un buen prompt:

**Sujeto + estilo + colores + contexto/formato**

- **Sujeto:** qué se ve en la imagen (una cámara de fotos, un ícono de repostería, tus iniciales).
- **Estilo:** cómo se ve (minimalista, flat design, acuarela, línea simple, moderno).
- **Colores:** usá los mismos de tu paleta de la Clase 3, así el banner combina con el resto del sitio.
- **Contexto/formato:** para qué es (banner horizontal ancho, logo cuadrado) y qué evitar.

**Tip importante:** las IA de imágenes todavía generan mal el texto dentro de la imagen (letras deformadas o mal escritas). Si necesitás texto, escribilo después con CSS sobre la imagen, no le pidas a la IA que lo dibuje.

### Ejemplo práctico

Prompt de Valeria, usando su paleta de la Clase 3 (`#faf7f2` fondo, `#b23a48` acento):

> "Banner minimalista para sitio de fotografía, estilo flat design con líneas simples, una cámara fotográfica como elemento central, colores tierra: fondo crema `#faf7f2` y acento rojizo `#b23a48`, formato horizontal ancho, sin texto."

## Integrar la imagen generada al diseño del sitio

Una vez generada la imagen, hay que optimizarla e insertarla correctamente:

1. **Optimizar:** las imágenes de IA suelen pesar mucho. Antes de subirla, comprimila (herramientas online gratuitas de compresión) y, si podés, exportala en formato `.webp` (pesa menos que `.png`/`.jpg` con la misma calidad).
2. **Insertar como banner** — dos formas comunes:
   ```html
   <img src="banner.webp" alt="Banner de Valeria Fotografía, cámara sobre fondo crema" class="banner">
   ```
   ```css
   .banner {
     width: 100%;
     max-width: 1200px;
     object-fit: cover;
   }
   ```
3. **Ajustar tamaño y posición** con `width`/`max-width` (que no sea más grande que el contenedor) y `object-fit: cover` (recorta la imagen para que llene el espacio sin deformarse).

### Ejemplo práctico

```html
<section id="inicio">
  <img src="banner.webp" alt="Banner de Valeria Fotografía" class="banner">
  <h1>Valeria Pérez — Fotógrafa</h1>
  <p>Capturo momentos únicos en cumpleaños, quince años y eventos pequeños.</p>
</section>
```

El `alt` describe la imagen igual que en la Clase 2 — nunca se deja vacío, ni siquiera en un banner decorativo.
