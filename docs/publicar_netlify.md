# Publicar el sitio de clases en Netlify

El sitio de clases (`clases/index.htm`) se publica **sin el repo completo**: un build arma la carpeta `netlify-dist/` con solo lo que ven los estudiantes.

## Comandos (desde la raíz del repo)

| Comando | Qué hace |
|---|---|
| `npm run build` | Arma `netlify-dist/` y verifica que ningún link del menú quede roto. |
| `npm start` | Hace el build y lo abre en `http://localhost:4190/index.htm` para revisarlo. |
| `npm run deploy` | Hace el build y lo sube a Netlify con la CLI (pide iniciar sesión la primera vez). |

Requiere Node 18 o superior. No hay dependencias que instalar.

## Qué se publica (y qué no)

Se publica, por lista blanca:

- El home: `index.htm`, `inicio.md`, `_sidebar.md`, `_redirects` y `assets/`.
- El bonus aparte `clases/bonus-ia/`: `guia.md`, `plantilla-sitio.md` y `cheatsheet.md`.
- Por cada `clases/clase-XX-*/`: `clase-guiada.md`, `presentacion.html`, `recursos.md`, `guia-estudio.md` (solo si el menú la lista) y la carpeta `img/` (sin su `LEEME.md`), si existen.
- `juegos/`: el minijuego (`minijuegos/constructor-de-paginas`) compilado. El **banco de preguntas** se publica como juego, no como el `.md`: el link de cada clase abre `juegos/index.html?clase=N` y arranca directo en esa clase.

**No** se publica: `teoria.md`, `tarea.md`, `examen.md`, `banco-preguntas.md`, los `README.md`, `_plantillas/` ni nada fuera de `clases/`. Como es lista blanca, un archivo nuevo tampoco se publica por accidente. Si sumás un tipo de archivo al sitio, agregalo en `scripts/build-netlify.mjs`.

> Las respuestas correctas viajan dentro del JavaScript del juego (necesario para corregir en el navegador): no se ven como página, pero quien inspeccione el código las puede leer.

### El banco de preguntas como juego

- La fuente sigue siendo la tabla de `clases/clase-0N-*/banco-preguntas.md`: un script (`minijuegos/constructor-de-paginas/scripts/build-quiz-data.mjs`) la convierte en datos del juego en cada build. Para editar una pregunta, editás esa tabla.
- Soporta opción múltiple y verdadero/falso (se corrigen solos) y respuesta corta (el estudiante ve la respuesta y se autoevalúa).
- Link directo a una clase: `juegos/index.html?clase=2` (acepta también el id completo, p. ej. `?clase=clase-02-secciones-contenido`). Sin parámetro, abre el menú de minijuegos.
- Para probarlo suelto: `cd minijuegos/constructor-de-paginas && pnpm run dev` y abrir `http://localhost:5173/?clase=2`.

## Cómo subir una clase nueva

1. Poné los archivos en `clases/clase-XX-.../` (ver la lista de arriba).
2. Agregá los links en `clases/_sidebar.md` y en la tabla de `clases/inicio.md`.
3. `npm run build`: si el menú apunta a un archivo que no existe, el build falla y lo dice.
4. Subilo (abajo).

## Opciones para subirlo a Netlify

**A. Arrastrar y soltar (sin cuenta de CLI):** `npm run build`, después arrastrar la carpeta `netlify-dist` a [app.netlify.com/drop](https://app.netlify.com/drop). Para actualizar, repetir sobre el mismo sitio (pestaña *Deploys*).

**B. CLI:** `npm run deploy`.

**C. Conectar el repo a Netlify:** el archivo `netlify.toml` ya define `npm run build` como comando y `netlify-dist` como carpeta de publicación, así que Netlify publica solo lo filtrado en cada push.

## Detalles técnicos

- **`index.htm` y Netlify:** Netlify solo abre `index.html` por defecto, por eso `clases/_redirects` tiene `/  /index.htm  200`.
- **Docsify e `index.htm`:** docsify trata `index.htm` como una carpeta; `clases/index.htm` fija `basePath` a mano para que cargue los `.md` bien en cualquier ruta.
- **Buscador:** solo indexa las páginas listadas en `_sidebar.md`.
