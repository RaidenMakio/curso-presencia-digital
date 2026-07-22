# Aislamiento de Datos por Curso (instancia compartida)

Con una sola instancia de cada herramienta sirviendo a todos los cursos, la separación entre cursos no la da la infraestructura — la da **cómo tú configuras y compartes el acceso** dentro de cada app. Este documento es el procedimiento a seguir por herramienta.

---

## Excalidraw — aislamiento por "room" (link único)

**Cómo funciona:** cada pizarra colaborativa es una sesión ("room") identificada por un ID y una clave de cifrado que van en la URL, después del `#` (ej. `pizarra.tudominio.com/#room=abc123,clave456`). Esa clave nunca se envía al servidor — solo quien tiene el link exacto puede ver o editar esa pizarra.

**Procedimiento por curso/clase:**
1. Antes de cada clase, abre Excalidraw y crea una sesión nueva (botón "Live collaboration" o similar).
2. Copia el link generado y compártelo **solo** con los estudiantes de ese curso/clase específica (por el canal de Teams de ese curso).
3. Para la siguiente clase o el siguiente curso, genera un link nuevo — no reutilices el mismo.

**Riesgo:** si compartes el mismo link en dos cursos distintos por error, ambos grupos verán la misma pizarra. La disciplina de generar un link nuevo por sesión es lo único que necesitas cuidar.

---

## Claper — aislamiento por cuenta de organizador

**Cómo funciona:** las presentaciones/encuestas pertenecen a una cuenta de usuario (organizador). Los estudiantes se unen como audiencia usando un **código de evento**, sin necesidad de crear cuenta, y solo ven ese evento específico — no pueden navegar a otros eventos de la misma instancia.

**Procedimiento por curso:**
1. Crea **una cuenta de organizador distinta por curso** (ej. `presencia@tudominio.com`, `ia@tudominio.com`).
2. Todos los eventos/encuestas de ese curso se crean desde esa cuenta — no se mezclan con los de otra cuenta.
3. Comparte el código de evento generado solo con los estudiantes del curso correspondiente.

**Riesgo:** bajo. Mientras no compartas el código de un evento fuera de su curso, no hay forma de que un estudiante vea encuestas de otro curso.

---

## Razzia / QuizLive — aislamiento por código de sesión

**Cómo funciona:** cada partida de trivia genera un código de sesión temporal. Los jugadores se unen con ese código; al terminar la partida, el código deja de ser válido.

**Procedimiento por curso:** ninguno especial — simplemente no compartas el código de una partida fuera del grupo al que pertenece. El aislamiento es automático por el carácter temporal de cada sesión.

---

## Hedgedoc — aislamiento por permisos de nota

**Cómo funciona:** cada nota individual tiene su propio link y un nivel de permiso configurable: **Libre** (cualquiera con el link puede editar sin identificarse), **Limitado** (solo usuarios logueados pueden editar) o **Privado** (solo el dueño y quien invite explícitamente).

**Procedimiento por curso:**
1. Al crear una nota para una pareja/grupo, configura el permiso como **Limitado** o **Privado**, nunca "Libre".
2. Comparte el link solo con la pareja/grupo correspondiente.
3. Si usas cuentas de usuario (recomendado), agrupa a los estudiantes de un mismo curso con un prefijo reconocible en su usuario para evitar confusiones al buscar notas existentes.

**Riesgo:** medio — depende 100% de que configures el permiso correcto en cada nota. Si dejas una nota en "Libre" por descuido, cualquiera con el link (y quien lo reenvíe) puede editarla.

---

## Focalboard — aislamiento por board y permisos

**Cómo funciona:** cada board (tablero Kanban) tiene su propio set de permisos y un link de compartición opcional. Los usuarios nuevos requieren invitación con código después del primer registro.

**Procedimiento por curso:**
1. Crea un board separado por curso (ej. "Roles — Presencia Digital", "Roles — IA para Estudiantes").
2. Configura el board para que **no** esté en modo de compartición pública (`enablePublicSharedBoards` debe estar desactivado a nivel servidor, o el board individual configurado como privado).
3. Invita únicamente a los estudiantes de ese curso a ese board específico.

**Riesgo:** medio-alto — de las herramientas del ecosistema, esta es la que requiere más disciplina manual tuya. Si un estudiante tiene cuenta en el servidor y los permisos de un board no están bien configurados, existe más margen de error que en Excalidraw o Claper. Revisa los permisos de cada board después de crearlo, no asumas que quedaron correctos por defecto.

---

## LearnHouse / Frappe LMS — aislamiento nativo por curso

**Cómo funciona:** a diferencia de las herramientas anteriores, un LMS tiene el concepto de "curso" incorporado de fábrica, con inscripción de estudiantes. Un estudiante solo ve los cursos en los que está inscrito — no hay improvisación con links o cuentas.

**Cuándo vale la pena:** si en algún momento sientes que el aislamiento "manual" de las demás herramientas (sobre todo Focalboard y Hedgedoc) te genera demasiado riesgo o carga de trabajo, migrar la gestión de acceso a un LMS es la solución estructural — pero es también el componente más pesado de montar (ver `orden_implementacion_tecnologias.md`).

---

## Resumen — nivel de cuidado requerido por herramienta

| Herramienta | Cuidado manual requerido |
|---|---|
| Excalidraw | Bajo — solo no reutilizar links entre cursos |
| Claper | Bajo — una cuenta de organizador por curso |
| Razzia / QuizLive | Ninguno — aislamiento automático por sesión |
| Hedgedoc | Medio — configurar permiso "Limitado/Privado" en cada nota |
| Focalboard | Medio-alto — revisar permisos de cada board manualmente |
| LMS (LearnHouse/Frappe) | Ninguno — aislamiento nativo, pero mayor costo de montaje |
