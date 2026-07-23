# Constructor de Páginas

Minijuego educativo de arrastrar/tocar etiquetas HTML, con 3 niveles de dificultad y modo administrador para crear niveles nuevos sin tocar código.

## Instalación y desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos estáticos listos para servir. Se puede desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages) o servirlos directamente con Caddy/Nginx desde tu VPS junto al resto del ecosistema del curso.

### Servir con Caddy en el mismo VPS del curso

Copia el contenido de `dist/` a una carpeta del servidor (ej. `~/sitios/constructor-de-paginas/`) y agrega un bloque al `Caddyfile` global del ecosistema (ver `../../infraestructura/Caddyfile`):

```
juego.tudominio.com {
    root * /home/rmt/sitios/constructor-de-paginas
    file_server
}
```

## ⚠️ Sobre el modo administrador y el almacenamiento

Los niveles que crees desde el modo administrador (ícono ⚙️) se guardan con **`localStorage`**, es decir, **solo en el navegador donde los creaste**. Esto significa:

- Si tú creas un nivel en tu laptop, **no aparecerá automáticamente** en el celular de un estudiante.
- Cada estudiante que entre al modo administrador desde su propio dispositivo tendría su propio set de niveles personalizados, independiente del tuyo.

Esto es intencional para mantener el proyecto simple y sin depender de un servidor propio — pero si más adelante quieres que los niveles que creas se vean igual para todos los estudiantes sin importar su dispositivo, hace falta agregar un backend pequeño. Opciones, de más simple a más completa:

1. **Exportar/importar JSON manualmente:** agregar un botón "Exportar niveles" que descargue el array como `.json`, y que el archivo `BUILTIN_LEVELS` del código se actualice a mano con ese contenido antes de cada `npm run build`. Cero infraestructura nueva, pero manual.
2. **Un endpoint simple en tu VPS** (ej. una función Express de 20 líneas con un archivo JSON como "base de datos") que el juego consulte al cargar y actualice al guardar. Requiere montar un pequeño servicio adicional en el mismo Docker Compose del ecosistema.
3. **Reutilizar Focalboard o Hedgedoc como almacén de datos** vía su API — más complejo, no recomendado solo para esto.

Si quieres, se puede implementar la opción 2 cuando el curso lo amerite.

## Estructura

```
constructor-de-paginas/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx      ← punto de entrada
    ├── index.css     ← directivas de Tailwind
    └── App.jsx        ← todo el juego (niveles, motor, admin)
```

Para agregar niveles directamente en el código (sin pasar por el modo administrador), edita el array `BUILTIN_LEVELS` al inicio de `src/App.jsx`.
