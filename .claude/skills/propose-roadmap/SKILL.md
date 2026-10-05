---
name: propose-roadmap
description: >
  Genera un roadmap por fases a partir de la brecha entre hitos deseados (docs/specs/README)
  y el estado real del código verificado en el repo. Cada tarea queda con criterios de
  aceptación cortos, reproducibles y testeables, e incluye tests unitarios solo para lo
  primordial (lógica de negocio pura, no cobertura exhaustiva). Usar cuando el usuario pida
  "armar un roadmap", "proponer roadmap", "roadmap por fases", "plan de fases con criterios
  de aceptación", o invoque /propose-roadmap.
---

# Propose Roadmap

## Objetivo
Convertir documentación de intención (specs, docs de producto, README, roadmaps previos)
en un plan ejecutable por fases, donde cada tarea es chica, verificable sin ambigüedad,
y no depende de juicio subjetivo para saber si está "hecha".

## Cuándo NO usar
- El usuario ya tiene un plan y solo quiere ejecutar una tarea puntual → no generar roadmap, ir directo a la tarea.
- No hay documentación de hitos deseados en el repo (ni se puede inferir de conversación) → preguntar primero qué se quiere lograr, no inventar fases.

## Pasos obligatorios

### 1. Reunir la intención (qué se quiere lograr)
Buscar y leer, en este orden de prioridad:
- Specs de producto/arquitectura (`specs/`, `docs/`, `*.spec.md`, `ROADMAP*.md`, `PLAN*.md`)
- `README.md` / `CLAUDE.md` / equivalente de instrucciones de proyecto
- Roadmaps o planes de acción previos ya existentes en el repo — no ignorarlos, son la base

Si hay contradicción entre documentos (ej. un doc dice "Fase 2: X" y otro dice "X ya hecho"),
señalarlo explícitamente en vez de elegir uno en silencio.

### 2. Verificar el estado real (qué existe de verdad)
No confiar en checklists de docs como fuente de verdad — verificar contra el código:
- Archivos/carpetas que un doc dice que existen → confirmar con Glob/Read
- Variables de entorno que un doc dice que están configuradas → revisar el archivo real (sin exponer secretos)
- Funcionalidad que un doc dice "completa" → grep del código que la implementa
- Tests que un doc dice que existen → confirmar que corren, no solo que el archivo existe

Cualquier claim de un doc que no se pueda verificar en el código real se marca como brecha,
no se asume.

### 3. Armar fases por dependencia, no por fecha
- Ordenar fases por bloqueo real (si B necesita que A exista, A va antes), no por prioridad declarada en docs.
- Una fase con tareas que no dependen entre sí puede ir en paralelo — decirlo.
- Fases de bajo detalle/futuro lejano no necesitan criterios de aceptación todavía si el proyecto sigue SDD (spec aprobada primero) — dejarlas como backlog sin AC forzado.

### 4. Redactar cada tarea con criterio de aceptación testeable
Cada tarea debe tener AC que cumplan las 3 propiedades:
- **Corto**: una acción, un resultado. Si el AC tiene "y además", partirlo en dos tareas.
- **Reproducible**: cualquiera puede repetir el mismo paso y obtener el mismo resultado (comando exacto, ruta exacta, condición exacta) — no "funciona bien" o "se ve correcto".
- **Testeable**: resultado binario (pasa/no pasa), no subjetivo. Preferir: comando + salida esperada, o secuencia UI + estado observable.

Formato sugerido por tarea:
```
### N.N Título de la tarea
- AC1: <acción reproducible> → <resultado esperado verificable>
- AC2 (unit test primordial, si aplica): <qué función/módulo pequeño y qué caso cubre>
```

### 5. Tests unitarios — solo lo primordial
No pedir cobertura total. Marcar "unit test primordial" únicamente cuando:
- Es lógica de negocio pura (mapeo de datos, cálculo, validación, guard de permisos) — fácil de aislar sin mockear medio sistema.
- Un bug ahí rompería silenciosamente algo crítico (dinero, permisos, integridad de datos).
No pedir test unitario para: JSX/UI visual, wiring trivial, config de librerías, código que ya se verifica con AC manual reproducible.

Si el proyecto no tiene framework de testing instalado todavía, la primera fase del roadmap
es instalarlo (con su propio AC reproducible) — no asumir que ya existe.

### 6. Guardar el roadmap en el repo
- Buscar si ya existe un doc de plan/roadmap (`specs/PLAN-ACCION.md`, `ROADMAP.md`, etc.) — si existe, el nuevo roadmap lo complementa (fases + AC), no lo duplica ni lo borra sin confirmar con el usuario.
- Ubicación por defecto: junto a las demás specs/planes del repo (ej. `specs/ROADMAP.md`) — si el repo no tiene convención de specs, preguntar dónde guardarlo.
- Cerrar el doc con fecha de generación y una nota de qué reemplaza/complementa.

## Resultado esperado
Un archivo markdown con fases numeradas, cada una con tareas numeradas, cada tarea con AC
verificable — listo para que cualquiera (humano o agente) tome una tarea y sepa exactamente
cuándo está terminada, sin volver a preguntar.
