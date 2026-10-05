# Guía de Estudio — Clase 4: Diseño responsive (celular y computadora)

## Resumen rápido

Un sitio responsive necesita la etiqueta `<meta name="viewport">` en el `<head>`, media queries en CSS (`@media (max-width: ...)`) para aplicar estilos distintos según el ancho de pantalla, y unidades flexibles (`%`, `rem`, `vw`/`vh`) en vez de tamaños fijos en `px`. Se verifica con DevTools del navegador y, siempre que se pueda, en un celular real.

## Checklist de autoevaluación

- [ ] Sitio ajustado en vista celular
- [ ] Sitio ajustado en vista computadora
- [ ] Corrección de espaciados/tamaños

## Glosario

| Término | Definición |
|---|---|
| Responsive | Diseño que se adapta bien tanto a pantallas chicas (celular) como grandes (computadora). |
| Viewport | Meta etiqueta que le dice al navegador de celular que use el ancho real de la pantalla. |
| Media query | Regla CSS que aplica estilos distintos según el ancho de la pantalla (`@media`). |
| Unidad relativa | Medida que se adapta al contexto (`%`, `rem`, `vw`, `vh`), en vez de fija como `px`. |
| Breakpoint | El ancho de pantalla donde una media query cambia el diseño (ej. `600px`). |
