# Orden de Implementación de Tecnologías

Este orden está pensado para que puedas **empezar con el VPS más barato de Hetzner** y solo ir agregando herramientas (y, si hace falta, subiendo de plan) según el curso las vaya necesitando — no todas son indispensables desde el primer día.

---

## Fase 0 — Infraestructura base (obligatoria, antes de cualquier herramienta)

1. Contratar VPS Hetzner CX más económico.
2. Instalar Docker + Docker Compose.
3. Configurar Caddy como reverse proxy (HTTPS automático).
4. Apuntar el dominio y subdominios al VPS.
5. Configurar firewall básico (ufw) y usuario no-root.

**Sin esto, ninguna herramienta siguiente tiene sentido instalarla.**

---

## Fase 1 — Imprescindibles para Clases 1-2 (participación anónima)

1. **Excalidraw** — pizarra colaborativa. Es la herramienta más liviana de todo el ecosistema (solo Nginx sirviendo archivos estáticos), instálala primero para validar que el VPS y el reverse proxy funcionan correctamente.
2. **Claper o Particify** — encuestas/polls anónimas y nubes de palabras. Necesaria para las dinámicas clave de la Fase 1 del curso (encuestas en vivo, chequeo de comprensión).

**Con Excalidraw + Claper ya puedes dictar las clases 1 y 2 completas.** Esto es lo mínimo viable — si el presupuesto o el tiempo son limitados, puedes quedarte aquí varias semanas antes de seguir.

---

## Fase 2 — Necesaria antes de Clases 3-4 (grupos de 4)

3. **Focalboard** (o alternativa mantenida activamente, ver nota abajo) — tablero Kanban para gestionar roles y rotación de grupos.

> ⚠️ **Nota importante:** Focalboard standalone dejó de recibir actualizaciones desde junio de 2024 (Mattermost movió su desarrollo a un plugin interno). Sigue funcionando bien y es totalmente usable, pero si prefieres una opción con mantenimiento activo a largo plazo, considera **Vikunja** o **Planka** como alternativas con funcionalidad Kanban equivalente.

**Esta herramienta no es indispensable si prefieres seguir gestionando roles y grupos manualmente** (ej. en un Google Sheet o directamente en Teams) — es una mejora de comodidad, no un bloqueante para dictar la Fase 2 del curso.

---

## Fase 3 — Necesaria antes de Clases 5+ (parejas)

4. **Hedgedoc** — notas colaborativas en tiempo real para el feedback estructurado entre pares.

**Alternativa sin instalar nada nuevo:** usar el chat de Teams o incluso Excalidraw en modo texto para el feedback entre pares, y posponer Hedgedoc hasta confirmar que realmente lo necesitas.

---

## Fase 4 — Opcionales, evaluar según necesidad real

5. **Razzia o QuizLive** — trivias/repasos gamificados. Útiles para reforzar contenido, pero no imprescindibles si ya usas Claper para mantener la interacción en vivo. Requieren construir la imagen Docker desde el repositorio (no hay imagen oficial publicada), lo cual suma trabajo de instalación — priorízalas solo si el "factor competencia" del ranking en vivo es importante para tu grupo.

6. **LearnHouse o Frappe LMS** — ruta de progreso y candado de clases. Son los stacks más pesados de todo el ecosistema (requieren su propia base de datos, workers, y más RAM). Solo tiene sentido montarlos si:
   - Vas a repetir el curso con varias cohortes en paralelo, o
   - Necesitas que los estudiantes no puedan avanzar a la siguiente clase sin completar la anterior.

   Si el curso lo diriges tú en vivo por Teams con un solo grupo a la vez, probablemente **no necesites un LMS** — el control de progreso lo puedes hacer directamente en clase.

---

## Resumen — Camino mínimo recomendado para empezar

```
VPS Hetzner (más barato) 
    → Docker + Caddy 
    → Excalidraw 
    → Claper 
    → [dictar Clases 1-2, validar que todo funciona]
    → Focalboard (o gestión manual) 
    → [dictar Clases 3-4]
    → Hedgedoc (o alternativa sin instalar) 
    → [dictar Clases 5-8]
```

Razzia/QuizLive y el LMS quedan como mejoras futuras, no como parte del camino crítico para lanzar el curso.
