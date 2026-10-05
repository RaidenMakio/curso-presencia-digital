# Teoría — Clase 4: Diseño responsive (celular y computadora)

## Uso básico de media queries y unidades flexibles

Un sitio "responsive" se ve bien tanto en celular como en computadora, sin que el texto quede gigante o las imágenes se corten. Dos herramientas hacen esto posible:

**1. La etiqueta viewport**, en el `<head>`, le dice al navegador del celular que use el ancho real de la pantalla en vez de simular una de escritorio:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Sin esta línea, ningún ajuste responsive funciona bien en celular — va siempre, en toda página.

**2. Media queries**, en el CSS, aplican reglas distintas según el ancho de la pantalla:

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

**3. Unidades flexibles** se adaptan al tamaño de pantalla en vez de quedar fijas como `px`:

- `%` — relativo al elemento contenedor (ej. `width: 90%`).
- `rem` — relativo al tamaño de fuente base de la página, útil para textos y espaciados.
- `vw` / `vh` — relativo al ancho/alto de la ventana del navegador.

## Verificar la visualización del sitio en distintos dispositivos

No alcanza con "verse bien en mi compu" — hay que revisarlo como lo va a ver un estudiante desde su celular:

1. **DevTools del navegador** (tecla `F12` o clic derecho → Inspeccionar → ícono de celular/tablet): simula distintos tamaños de pantalla sin necesitar otro dispositivo.
2. **Celular real**: siempre que se pueda, abrir el link del sitio publicado desde un celular real — el simulador ayuda, pero no reemplaza probarlo en el dispositivo real.
3. Revisar en ambos: que el texto se lea sin hacer zoom, que las imágenes no se corten ni desborden la pantalla, y que los botones/enlaces sean fáciles de tocar con el dedo.

### Ejemplo práctico

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

Con esto, las imágenes de la galería nunca exceden los 400px en pantallas grandes, pero ocupan todo el ancho disponible en celular, y el texto se ajusta a un tamaño cómodo de leer en pantallas chicas.
