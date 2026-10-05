---
name: local-docs-wiki
description: >
  Instala una wiki local navegable (Docsify: sidebar, buscador, botón "copiar código",
  anterior/siguiente) sobre los .md ya existentes de un proyecto — sin duplicarlos, sin
  build, funciona offline. Encapsula los gotchas reales de basePath/rutas que causan 404 o
  pantalla en blanco. Usar cuando el usuario pida "wiki local", "documentación navegable",
  "leer los docs como wiki", "instalar docsify", o invoque /local-docs-wiki.
---

# Local Docs Wiki (Docsify)

## Decisión previa (preguntar solo si no es obvio del pedido)
¿La wiki solo necesita mostrar `.md` que van a vivir DENTRO de su propia carpeta, o también
tiene que enlazar archivos en OTRAS carpetas del repo (specs/, docs/, README raíz, etc.)?
- Solo su propia carpeta → salteá todo lo de `basePath` abajo, es trivial.
- Cruza carpetas (caso típico: raíz del repo) → seguí la receta completa, ahí están los gotchas.

No hace falta preguntarle nada más al usuario — esto se resuelve solo con esta guía.

## Instalación rápida (5 pasos, sin build, sin instalar nada global)

1. **Carpeta**: crear `<repo_root>/wiki/` (nombre corto, sin espacios; evitar `docs/` si ya existe con otro contenido).
2. **Vendorizar assets** (offline real, sin depender de CDN en cada carga):
   ```bash
   mkdir -p wiki/assets && cd wiki/assets
   curl -sL https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js -o docsify.min.js
   curl -sL https://cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css -o theme-vue.css
   curl -sL https://cdn.jsdelivr.net/npm/docsify-copy-code@2/dist/docsify-copy-code.min.js -o docsify-copy-code.min.js
   curl -sL https://cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js -o docsify-pagination.min.js
   curl -sL https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.min.js -o docsify-search.min.js
   ```
   Agregar componentes Prism SOLO para los lenguajes que los docs realmente usan (no bajar los 200):
   ```bash
   curl -sL https://cdn.jsdelivr.net/npm/prismjs/components/prism-bash.min.js -o prism-bash.min.js
   curl -sL https://cdn.jsdelivr.net/npm/prismjs/components/prism-sql.min.js  -o prism-sql.min.js
   # sumar prism-yaml, prism-docker, prism-json, etc. según haga falta
   ```
3. **`wiki/index.html`** — copiar el template de abajo tal cual, cambiar solo `{{WIKI_FOLDER}}`.
4. **`wiki/_sidebar.md`** — copiar el template de abajo, completar las entradas.
5. **`wiki/README.md`** — home page: qué es, cómo levantarla, orden de lectura (contenido libre).

Levantar: `npx serve .` **desde la raíz del repo** (no desde `wiki/`) y abrir `/wiki/`.
Por qué la raíz: si la wiki enlaza `specs/` o el `README.md` del proyecto, esos archivos
tienen que quedar dentro del árbol que sirve el servidor estático.

## Los 4 gotchas reales (ya resueltos en el template — no los reintroduzcas)

1. **`file://` no sirve.** Docsify carga cada página con `fetch()`; los navegadores bloquean
   fetch sobre `file://`. Servidor HTTP sí o sí, aunque sea `npx serve .` o `python -m http.server`.

2. **Assets con ruta relativa (`assets/x.js`) rompen si el usuario entra sin `/` final**
   (`/wiki` en vez de `/wiki/`) — el navegador resuelve la ruta relativa contra el padre, no
   contra la carpeta de la wiki, y todo tira 404. Fix ya aplicado: los `<script src>`/`<link>`
   del template usan ruta **absoluta desde la raíz del server** (`/wiki/assets/...`), nunca
   relativa. No lo cambies.

3. **`basePath` + links absolutos (`/otra-carpeta/x.md`) se duplican.** Si configurás
   `basePath: '/wiki/'` y ADEMÁS escribís un link del sidebar como `/specs/x.md` (con barra
   inicial), Docsify vuelve a anteponerle `basePath` al buscar el contenido → pide
   `/wiki/specs/x.md`, no existe, 404 silencioso (la página queda en blanco, el hash se ve
   raro tipo `#/wiki/algo`). Regla fija: con `basePath` seteado, **todos** los links del
   sidebar/README van **relativos** (`README.md` para home, `../specs/x.md` para cruzar
   carpetas) — nunca con `/` inicial.

4. **No mezclar `relativePath: true` con links `..`.** Ese flag cambia el algoritmo de
   resolución de Docsify y el `..` deja de colapsar bien (mismo síntoma que el punto 3). No
   lo actives si estás usando la receta de `basePath` + `..`. Tampoco hace falta un
   `<base href="...">` en el `<head>` — con assets absolutos y sidebar relativo sobra.

## Template — `wiki/index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Wiki</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="/{{WIKI_FOLDER}}/assets/theme-vue.css">
</head>
<body>
  <div id="app">Cargando…</div>
  <script>
    window.$docsify = {
      name: 'Wiki',
      basePath: '/{{WIKI_FOLDER}}/',
      loadSidebar: true,
      subMaxLevel: 2,
      auto2top: true,
      routerMode: 'hash',
      search: { placeholder: 'Buscar…', noData: 'Sin resultados.', depth: 3 },
      copyCode: { buttonText: 'Copiar', successText: 'Copiado ✓' },
      pagination: { previousText: 'Anterior', nextText: 'Siguiente', crossChapter: true, crossChapterText: true },
    }
  </script>
  <script src="/{{WIKI_FOLDER}}/assets/docsify.min.js"></script>
  <script src="/{{WIKI_FOLDER}}/assets/docsify-copy-code.min.js"></script>
  <script src="/{{WIKI_FOLDER}}/assets/docsify-pagination.min.js"></script>
  <script src="/{{WIKI_FOLDER}}/assets/docsify-search.min.js"></script>
  <!-- una línea por cada componente Prism que hayas bajado -->
  <script src="/{{WIKI_FOLDER}}/assets/prism-bash.min.js"></script>
  <script src="/{{WIKI_FOLDER}}/assets/prism-sql.min.js"></script>
</body>
</html>
```
(Si la wiki NO cruza carpetas: borrar `basePath`, usar rutas relativas simples en todo —
`assets/...`, sin `/{{WIKI_FOLDER}}/` — y listo, no aplica el gotcha 2 ni el 3.)

## Template — `wiki/_sidebar.md`
```markdown
- **Inicio**
  - [Cómo usar esta wiki](README.md)

- **Sección**
  - [Página dentro de la wiki](otra-pagina.md)
  - [Página fuera de la wiki](../ruta/al/archivo.md)
```

## Verificar SIN abrir navegador (barato en tokens, atrapa el 90% de los bugs)
Con el server corriendo, un curl por cada link real del sidebar confirma si la ruta
resuelta existe — no hace falta simular el router JS:
```bash
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" http://localhost:PORT/wiki/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/wiki/assets/docsify.min.js
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/ruta/al/archivo.md
```
Si algo da 404, el problema está en el join de `basePath` + el link, no en Docsify — recalcular
a mano `basePath + link` con reglas de URL (los `..` sí colapsan en una URL normal) antes de
tocar código de nuevo.

## Al levantar un server de prueba vos mismo (agente)
Guardar el PID explícito y matar solo ese PID al terminar. Nunca `taskkill /IM node.exe` ni
equivalentes sin filtro — mata procesos node del usuario que no tienen nada que ver (pnpm
dev, otros servers). Ejemplo seguro:
```bash
nohup npx --yes serve . -l 4174 > /tmp/serve.log 2>&1 & echo $! > /tmp/serve.pid
# ...
kill "$(cat /tmp/serve.pid)"
```

## El `#/` en la URL es normal
`routerMode: 'hash'` (el default, y el recomendado acá) produce URLs tipo `/wiki/#/pagina` —
no es un bug, es cómo Docsify rutea sin necesitar configuración de servidor. El modo
`'history'` da URLs limpias pero exige que el servidor reescriba cualquier ruta 404 a
`index.html` (flag `-s`/`--single` en `serve`, o config equivalente) — no lo uses salvo que
el usuario lo pida explícitamente, agrega una capa de configuración que puede fallar distinto
en cada hosting.
