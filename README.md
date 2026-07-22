# Curso B: Crea tu Presencia Digital

Repositorio con todo el material del curso: temario, estrategias didácticas, ecosistema de herramientas, infraestructura del VPS y minijuegos educativos.

## Estructura de carpetas

```
curso-presencia-digital/
├── README.md                              ← este archivo
├── docs/                                   ← contenido pedagógico del curso
│   ├── temario_curso_presencia_digital.md
│   ├── estrategias_didacticas_curso.md
│   └── ecosistema_herramientas_curso.md
├── infraestructura/                        ← todo lo necesario para montar el VPS
│   ├── docker-compose.yml
│   ├── Caddyfile
│   ├── .env.example
│   ├── recomendaciones_infraestructura.md
│   ├── orden_implementacion_tecnologias.md
│   ├── tutorial_implementacion.md
│   └── aislamiento_datos_por_curso.md
└── minijuegos/                             ← quizzes interactivos jugables
    └── constructor-de-paginas.jsx
```

---

## 1. `docs/` — Contenido del curso

Léelos en este orden si vas a preparar o dictar el curso desde cero.

| Archivo | Qué contiene | Cuándo usarlo |
|---|---|---|
| `temario_curso_presencia_digital.md` | Objetivo general del curso y las 8 clases con objetivos específicos y entregables. | Punto de partida — es el plan de estudios completo. |
| `estrategias_didacticas_curso.md` | Las 3 fases de dinámicas (anónima → grupos de 4 → parejas) con el porqué de cada una y actividades concretas por fase. | Al preparar cómo vas a dar cada bloque de clases, no solo qué vas a enseñar. |
| `ecosistema_herramientas_curso.md` | Catálogo completo de herramientas evaluadas (Excalidraw, Claper, Razzia/QuizLive, Focalboard, Hedgedoc, LMS, timer) con su función y fase de uso. | Referencia para decidir qué herramienta usar en cada dinámica. |

---

## 2. `infraestructura/` — Montar el VPS

Arquitectura: **una sola instancia de cada herramienta, compartida por todos los cursos que dictes** (no una instancia separada por curso). El aislamiento entre cursos se maneja dentro de cada app, no en la infraestructura.

### Orden de lectura recomendado

1. **`recomendaciones_infraestructura.md`** — elige proveedor de VPS (Hetzner recomendado para empezar) y distro (Ubuntu 24.04 LTS).
2. **`orden_implementacion_tecnologias.md`** — qué herramienta instalar primero y cuáles son opcionales. No necesitas montar todo desde el día 1.
3. **`tutorial_implementacion.md`** — pasos exactos de terminal, desde contratar el VPS hasta tener Excalidraw y Claper funcionando con HTTPS. Sigue este documento paso a paso la primera vez.
4. **`aislamiento_datos_por_curso.md`** — léelo **antes de dictar tu segundo curso**. Explica cómo evitar que los estudiantes de un curso vean datos de otro (cuentas separadas en Claper, links únicos en Excalidraw, permisos en Hedgedoc/Focalboard, etc.).

### Archivos de configuración

- **`docker-compose.yml`** — plantilla de todos los servicios, organizada por fases (Fase 1 activa, Fase 2 y 3 comentadas para descomentar cuando las necesites).
- **`Caddyfile`** — reverse proxy con HTTPS automático. Reemplaza `tudominio.com` por tu dominio real antes de usar.
- **`.env.example`** — cópialo a `.env` y completa contraseñas/secretos (generar con `openssl rand -hex 32`). **Nunca subas el `.env` real a este repositorio** — agrégalo a `.gitignore`.

### Uso rápido

```bash
cd infraestructura
cp .env.example .env
nano .env              # completar secretos
nano Caddyfile          # reemplazar tudominio.com
docker compose up -d
```

Ver `tutorial_implementacion.md` para el procedimiento completo, incluyendo la conexión inicial al VPS y la configuración de seguridad.

---

## 3. `minijuegos/` — Quizzes interactivos

### `constructor-de-paginas.jsx`

Minijuego de arrastrar/tocar etiquetas HTML para armar una página web, con 3 niveles de dificultad seleccionables por nivel:

1. **Uno por uno** — feedback inmediato en cada etiqueta.
2. **Todo junto** — completas todos los huecos y recién al final revisas qué acertaste.
3. **Vista dividida** — ves la página ya terminada como referencia a un lado mientras la reconstruyes al otro.

Incluye sonido, vibración, y un **modo administrador** (ícono de engranaje dentro del juego) para crear niveles nuevos sin tocar código.

**Cómo usarlo:**
1. Sube el archivo como artifact de React en Claude, o intégralo en cualquier proyecto React/Vite que ya tenga `lucide-react` instalado.
2. Los niveles personalizados que crees desde el modo administrador quedan guardados en almacenamiento compartido — cualquiera que abra el mismo enlace ve los mismos niveles. Ten esto en cuenta si no quieres que los estudiantes puedan crear/borrar niveles: se puede agregar una contraseña simple al modo administrador si hace falta.
3. Para agregar niveles directamente en el código (sin usar el modo administrador), edita el array `BUILTIN_LEVELS` al inicio del archivo — la estructura de cada nivel está comentada.

**Próximos minijuegos:** este mismo patrón (array de niveles + motor de juego reutilizable) sirve de base para el minijuego equivalente del Curso de IA para Estudiantes (con prompts en vez de etiquetas HTML) cuando se decida construirlo.

---

## Cómo usar este repositorio con Claude Code

Si vas a seguir iterando sobre este material con Claude Code, dale contexto rápido así:

```
Este repo tiene el curso "Crea tu Presencia Digital": temario y estrategias en
docs/, infraestructura del VPS en infraestructura/, y minijuegos educativos en
minijuegos/. Lee el README.md antes de proponer cambios.
```

## Pendientes conocidos (no incluidos aún en este repositorio)

- Contenido equivalente para el Curso "IA para Estudiantes + Asistente Personal".
- Herramienta de timer/cronómetro autohospedada (ver sección 8 de `ecosistema_herramientas_curso.md`).
- Decisión final entre Claper/Particify y entre LearnHouse/Frappe LMS.
- Contraseña opcional para el modo administrador del minijuego.