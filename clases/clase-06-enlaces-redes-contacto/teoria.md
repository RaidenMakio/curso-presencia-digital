# Teoría — Clase 6: Enlaces, redes sociales y contacto

## Crear enlaces funcionales e íconos de redes sociales

Un enlace se crea con `<a href="...">texto o ícono</a>`. El atributo `href` es la dirección a la que lleva. Para enlaces a otro sitio (como Instagram), conviene agregar `target="_blank"` (abre en pestaña nueva) y `rel="noopener noreferrer"` (por seguridad, evita que la nueva pestaña pueda manipular la página original):

```html
<a href="https://instagram.com/valeria.foto" target="_blank" rel="noopener noreferrer">
  Seguime en Instagram
</a>
```

Para representar redes sociales con un ícono en vez de solo texto, se puede usar un emoji simple (sin dependencias extra, ideal para un curso corto) o una imagen `<img>` de ícono:

```html
<a href="https://instagram.com/valeria.foto" target="_blank" rel="noopener noreferrer">
  📷 Instagram
</a>
```

**Errores comunes que rompen un enlace:**
- Olvidar el `https://` al inicio (queda como texto, no como link válido).
- Copiar mal la URL (espacios, mayúsculas de más).
- Dejar `href="#"` o `href=""` sin completar — el enlace no lleva a ningún lado.

## Incorporar una vía de contacto clara

No todos los proyectos necesitan un formulario con backend — para un curso de 2 semanas alcanza con enlaces directos que abren la app de contacto:

- **Correo:** `<a href="mailto:valeria@correo.com">Escribime</a>` — abre el cliente de correo del visitante.
- **WhatsApp:** `<a href="https://wa.me/59171234567">Escribime por WhatsApp</a>` — el número va con código de país, sin espacios ni símbolos.
- **Teléfono (para celular):** `<a href="tel:+59171234567">Llamame</a>`.

Sea cual sea el medio, tiene que ser **visible y fácil de encontrar** — normalmente en su propia sección o como botón destacado, no escondido al final de un párrafo.

### Ejemplo práctico

```html
<section id="contacto">
  <h2>Contacto</h2>
  <p>¿Querés reservar una sesión? Escribime:</p>
  <a href="https://wa.me/59171234567" class="boton-contacto">💬 Escribime por WhatsApp</a>
  <a href="mailto:valeria@correo.com">✉️ valeria@correo.com</a>
  <div class="redes">
    <a href="https://instagram.com/valeria.foto" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
  </div>
</section>
```
