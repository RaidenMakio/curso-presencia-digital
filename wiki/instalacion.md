# Instalación del servidor y herramientas

## Infraestructura base

La recomendación del repositorio es montar una infraestructura ligera, compartida y moderna:

- Ubuntu Server 24.04 LTS
- Docker + Docker Compose
- Caddy como reverse proxy con HTTPS automático
- Dominio con subdominios por herramienta

La referencia completa está en:

- [Recomendaciones de infraestructura](../infraestructura/recomendaciones_infraestructura.md)
- [Orden de implementación](../infraestructura/orden_implementacion_tecnologias.md)
- [Tutorial de implementación](../infraestructura/tutorial_implementacion.md)

## Orden recomendado

### Fase 0: infraestructura base

1. Contratar un VPS
2. Instalar Docker y Docker Compose
3. Configurar Caddy
4. Apuntar los dominios a la instancia
5. Configurar firewall básico

### Fase 1: imprescindible para clases iniciales

- Excalidraw
- Claper o Particify

Estas dos herramientas permiten dictar las clases 1 y 2 con participación anónima y trabajo visual colaborativo.

### Fase 2: seguimiento grupal

- Focalboard

Útil para gestionar roles, parejas y rotación de grupos.

### Fase 3: trabajo colaborativo

- Hedgedoc

Permite feedback estructurado entre pares y notas compartidas.

## Herramientas opcionales

- Razzia o QuizLive para dinámicas de repaso y gamificación
- LearnHouse o Frappe LMS para controlar progreso por clase
- Timer autohospedado para actividades con tiempo limitado

## Recomendación concreta

Para comenzar, la opción más razonable es:

- VPS económico de Hetzner
- Docker + Caddy
- Excalidraw + Claper
- Y luego sumar Focalboard/Hedgedoc si se vuelven necesarios

El objetivo no es montar todo de golpe, sino validar primero qué realmente se usa en clase.

## Seguridad básica

- Crear usuario no-root
- Deshabilitar acceso root por SSH
- Configurar `ufw`
- Permitir solo 22, 80 y 443
- Hacer backups de los volúmenes persistentes

