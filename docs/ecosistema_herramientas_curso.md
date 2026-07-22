# Ecosistema de Herramientas — Curso Presencia Digital
### Herramientas autohospedadas (VPS) para dinámicas de clase virtual

---

## 1. Lienzo y Pizarra Colaborativa

**Excalidraw**
- Uso: espacio para que grupos y parejas dibujen, organicen ideas, diseñen esquemas y creen retos grupales con entregable único.
- Fase de uso: Fase 1 y Fase 2.
- Instalación: en VPS propio.

---

## 2. Gamificación y Evaluaciones (alternativas a Kahoot)

**Razzia**
- Uso: quiz platform self-hosted para trivias y repasos en eventos pequeños.
- Link: https://github.com/Ralex91/Razzia

**Rahoot**
- Uso: alternativa self-hosted a Kahoot (base de la que deriva Razzia).

**QuizLive**
- Uso: quiz multijugador en tiempo real, self-hosted, sin cuentas ni paywall (alternativa a Kahoot/Slido). Construido con React, Firebase y Vite.
- Link: https://github.com/sivasooryagiri/quizlive

- Fase de uso: Fase 1 (Clases 1-2).

---

## 3. Encuestas y Participación Anónima

**Claper**
- Uso: encuestas/polls anónimas en vivo, nube de palabras.
- Documentación: https://docs.claper.co/

**Particify**
- Uso: alternativa a Claper para encuestas y nubes de palabras en vivo.
- Estado: pendiente de elegir entre las dos opciones.

- Fase de uso: Fase 1 (Clases 1-2).

---

## 4. Infraestructura de Comunicación y Gestión de Aula

**Microsoft Teams**
- Uso: videollamadas, breakout rooms (grupos/parejas), chat general para compartir enlaces, canales específicos para galería cruzada entre grupos.
- Fase de uso: transversal, todas las fases.

---

## 5. Gestión de Proyectos y Logística del Profesor

**Focalboard**
- Uso: tablero Kanban self-hosted (alternativa a Trello/Notion/Asana). Sirve como "mapa de control" del profesor, no como herramienta de trabajo del estudiante.
- Aplicaciones concretas:
  - **Breakout rooms con rol asignado:** una tarjeta por estudiante, con etiquetas de color indicando su rol (Relator, Presentador, etc.).
  - **Rotación de roles:** se arrastran las etiquetas entre clases para reasignar roles sin rehacer todo manualmente.
  - **Parejas rotativas:** columnas por pareja (Pareja 1, Pareja 2...), moviendo tarjetas de estudiantes en cada sesión para asegurar rotación completa.
- Link: https://github.com/mattermost-community/focalboard
- Fase de uso: transversal (seguimiento y organización), especialmente relevante desde Fase 2 en adelante.

---

## 6. Notas y Documentos Colaborativos (pendiente de confirmar uso)

**Hedgedoc**
- Uso: notas/documentos colaborativos en tiempo real, útil para feedback estructurado entre pares.
- Link: https://hedgedoc.org/
- Fase de uso propuesta: Fase 3 (Clases 5 en adelante).
- Estado: pendiente de confirmación de uso.

---

## 6b. Ruta de Progreso y Control de Acceso a Clases (LMS)

**LearnHouse**
- Uso: plataforma de aprendizaje open source, permite estructurar rutas de progreso y organizar el contenido del curso clase por clase.
- Link: https://github.com/learnhouse/learnhouse

**Frappe LMS**
- Uso: sistema de gestión de aprendizaje (LMS) open source, 100% autohospedable, fácil de usar.
- Link: https://github.com/frappe/lms

- Función común: permite implementar un "candado de clases" (los estudiantes desbloquean la siguiente clase solo al completar la anterior) y visualizar su ruta de progreso a lo largo del curso.
- Fase de uso: transversal — estructura general del curso, complementa al tablero de Focalboard (que es más para logística de roles/grupos que para contenido y progreso académico).
- Estado: pendiente de elegir entre las dos opciones.

---

## 7. Gamificación de Hábitos/Progreso (referencia exploratoria)

**Habitica** (Guía de instalación local)
- Uso: posible sistema de gamificación tipo RPG para seguimiento de progreso/entregables del estudiante a lo largo del curso.
- Link: https://habitica.fandom.com/wiki/Guidance_for_Blacksmiths#Working_with_a_Local_Installation
- Estado: exploratorio, sin fase asignada aún.

---

## 8. Pendiente: Herramienta de Timer/Cronómetro

Aún no se ha definido una herramienta de cronómetro visible en pantalla para las dinámicas cronometradas (retos rápidos, pair-checking, estaciones por tiempo). Algunas opciones self-hosted o embebibles a considerar:

- **Cronómetro embebido en Excalidraw o Teams** (compartir pantalla con un timer web simple).
- **Flip Clock / Simple Timer (open source, JS)** — se puede autohospedar como página estática simple en el VPS.
- **OBS + overlay de timer** (si se usa streaming/compartir pantalla avanzado).
- Alternativa rápida sin instalación: sitios como online-stopwatch.com compartidos por pantalla (no autohospedado, solo como opción temporal mientras se decide una self-hosted).

**Acción pendiente:** definir e instalar una opción de timer autohospedada para integrarla al ecosistema.
