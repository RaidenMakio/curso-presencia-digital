# Motor de Minijuegos del Curso

Un solo proyecto React/Vite con dos minijuegos educativos, cada uno con modo administrador para crear contenido nuevo sin tocar código. Al abrir el juego, primero aparece un selector: **Constructor de páginas** o **Ahorcado**.

## Instalación y desarrollo local

Este proyecto usa **pnpm** (hay `pnpm-lock.yaml`, no uses `npm install`).

```bash
pnpm install
pnpm run dev
```

Abre `http://localhost:5173`.

## Tests

```bash
pnpm run test
```

Corre los tests de la lógica pura del Ahorcado (`src/hangmanLogic.js` / `src/hangmanLogic.test.js`) con Vitest.

## Build para producción

```bash
pnpm run build
```

Genera la carpeta `dist/` con los archivos estáticos listos para servir. Se puede desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages) o servirlos directamente con Caddy/Nginx desde tu VPS junto al resto del ecosistema del curso.

### Servir con Caddy en el mismo VPS del curso

Copia el contenido de `dist/` a una carpeta del servidor (ej. `~/sitios/minijuegos-curso/`) y agrega un bloque al `Caddyfile` global del ecosistema (ver `../../infraestructura/Caddyfile`):

```
juego.tudominio.com {
    root * /home/rmt/sitios/minijuegos-curso
    file_server
}
```

---

## 1. Constructor de páginas

Arrastrar/tocar etiquetas HTML para armar una página web, con 3 niveles de dificultad seleccionables por nivel:

1. **Uno por uno** — feedback inmediato en cada etiqueta.
2. **Todo junto** — completas todos los huecos y recién al final revisas qué acertaste.
3. **Vista dividida** — ves la página ya terminada como referencia a un lado mientras la reconstruyes al otro.

Incluye sonido, vibración, y modo administrador (ícono de engranaje ⚙️) para crear niveles nuevos sin tocar código. Para agregar niveles directamente en el código, edita el array `BUILTIN_LEVELS` al inicio de `src/App.jsx`.

## 2. Ahorcado

Adiviná palabras clave del vocabulario del curso, letra por letra, con el dibujo del ahorcado dibujándose progresivamente en cada error (6 intentos por palabra). Cada **lista de palabras es un nivel** — de fábrica viene una lista por cada una de las 8 clases del curso, con palabras y pistas tomadas de la teoría/glosario de cada clase (`src/App.jsx`, constante `HANGMAN_BUILTIN_LEVELS`).

Desde el modo administrador (ícono ⚙️) podés crear tus propias listas de palabras — por ejemplo, para repasar el vocabulario de una tarea puntual en vez de una clase entera. Cada lista pide un título y, por palabra, la palabra a adivinar más su pista. Las palabras se guardan automáticamente en mayúsculas, sin acentos y sin espacios (si escribís una frase, queda pegada como una sola palabra — usá una palabra por entrada).

La lógica de evaluar cada letra (¿está en la palabra? ¿la palabra queda resuelta?) vive aparte en `src/hangmanLogic.js`, separada de la interfaz, y tiene sus propios tests (`pnpm run test`).

## ⚠️ Sobre el modo administrador y el almacenamiento

Tanto los niveles del Constructor como las listas del Ahorcado que crees desde su modo administrador se guardan con **`localStorage`**, es decir, **solo en el navegador donde los creaste**. Esto significa:

- Si creás un nivel/lista en tu laptop, **no aparecerá automáticamente** en el celular de un estudiante.
- Cada estudiante que entre al modo administrador desde su propio dispositivo tendría su propio set de contenido personalizado, independiente del tuyo.

Esto es intencional para mantener el proyecto simple y sin depender de un servidor propio — pero si más adelante querés que el contenido que creás se vea igual para todos los estudiantes sin importar su dispositivo, hace falta agregar un backend pequeño. Opciones, de más simple a más completa:

1. **Exportar/importar JSON manualmente:** agregar un botón "Exportar" que descargue el array como `.json`, y actualizar a mano `BUILTIN_LEVELS` / `HANGMAN_BUILTIN_LEVELS` en el código con ese contenido antes de cada `pnpm run build`. Cero infraestructura nueva, pero manual.
2. **Un endpoint simple en tu VPS** (ej. una función Express de 20 líneas con un archivo JSON como "base de datos") que el juego consulte al cargar y actualice al guardar. Requiere montar un pequeño servicio adicional en el mismo Docker Compose del ecosistema.
3. **Reutilizar Focalboard o Hedgedoc como almacén de datos** vía su API — más complejo, no recomendado solo para esto.

## Estructura

```
constructor-de-paginas/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx             ← punto de entrada
    ├── index.css            ← directivas de Tailwind
    ├── App.jsx              ← selector de juego + Constructor + Ahorcado + ambos modos admin
    ├── hangmanLogic.js       ← lógica pura del Ahorcado (normalizar palabra, evaluar letra)
    └── hangmanLogic.test.js  ← tests de hangmanLogic.js (Vitest)
```
