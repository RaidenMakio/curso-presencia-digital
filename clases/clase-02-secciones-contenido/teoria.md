# Teoría — Clase 2: Secciones de contenido (inicio, sobre mí/proyecto, galería o servicios)

## Aplicar etiquetas HTML para organizar texto, imágenes y listas

Un sitio de una sola sección larga es difícil de leer. Se organiza en **bloques**, cada uno con su propósito:

- `<section>` agrupa una parte temática de la página (ej. "Inicio", "Sobre mí", "Servicios"). Usualmente lleva un `id` para poder identificarla: `<section id="sobre-mi">`.
- `<h2>` es el título de cada sección (más chico que el `<h1>` de la Clase 1, que se usa una sola vez por página).
- `<img>` muestra una imagen. No tiene etiqueta de cierre y necesita dos **atributos** (información extra dentro de la etiqueta de apertura):
  ```html
  <img src="foto-perfil.jpg" alt="Foto de perfil de Valeria">
  ```
  - `src` — de dónde sale la imagen (el archivo o el link).
  - `alt` — texto alternativo, se muestra si la imagen no carga y lo leen los lectores de pantalla. Nunca se deja vacío.
- `<ul>` (lista sin orden) y `<li>` (cada elemento de la lista) organizan varios ítems similares — perfecto para servicios o productos:
  ```html
  <ul>
    <li>Diseño de logotipos</li>
    <li>Ilustración digital</li>
  </ul>
  ```

### Ejemplo práctico

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

## Redactar contenido propio para cada sección

Cada sección necesita texto que hable de vos y tu proyecto real, no relleno genérico ("Lorem ipsum" o frases copiadas). Guía rápida por sección:

- **Inicio:** una frase corta que diga quién sos y qué hacés — es lo primero que lee cualquiera.
- **Sobre mí/proyecto:** 2-4 frases con tu historia o la del proyecto: qué te motivó, qué ofrecés, por qué confiar en vos.
- **Galería/servicios:** al menos 2 elementos concretos (no "hago cosas variadas" — mejor "Diseño de logotipos" que "Servicios de diseño").

### Ejemplo práctico

```html
<section id="inicio">
  <h1>Valeria Pérez — Fotógrafa</h1>
  <p>Capturo momentos únicos en cumpleaños, quince años y eventos pequeños.</p>
</section>

<section id="sobre-mi">
  <h2>Sobre mí</h2>
  <p>Empecé a fotografiar hace 3 años en cumpleaños de amigos. Hoy trabajo con
  luz natural y edición simple para que las fotos se vean auténticas, no
  sobreeditadas.</p>
</section>
```
