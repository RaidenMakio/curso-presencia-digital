# Guía de Estudio — Clase 5: Banner/logo con IA generativa de imágenes

## Resumen rápido

Un buen prompt de IA combina sujeto + estilo + colores (los de tu paleta) + formato, y evita pedir texto dentro de la imagen. Una vez generada, se optimiza (comprimir, idealmente `.webp`) y se inserta con `<img>` + `alt` descriptivo, ajustando tamaño con `width`/`max-width` y `object-fit`.

## Checklist de autoevaluación

- [ ] Banner o logo generado con IA
- [ ] Imagen optimizada e insertada en el sitio
- [ ] Ajuste de tamaño/posición del banner

## Glosario

| Término | Definición |
|---|---|
| Prompt | Instrucción de texto que se le da a una IA generativa para crear una imagen. |
| IA generativa de imágenes | Herramienta que crea imágenes nuevas a partir de un prompt (ej. Bing Image Creator, DALL-E). |
| Optimizar una imagen | Reducir su peso (tamaño en KB/MB) sin perder calidad visible, para que el sitio cargue rápido. |
| `.webp` | Formato de imagen que suele pesar menos que `.png`/`.jpg` con calidad similar. |
| `object-fit` | Propiedad CSS que controla cómo una imagen llena su espacio sin deformarse. |
