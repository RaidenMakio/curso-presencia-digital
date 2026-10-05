# Wiki del Curso: Presencia Digital

Esta wiki sirve como acceso rápido al contenido del curso, la infraestructura del servidor y los cursos que se están preparando.

## ¿De qué trata este curso?

El objetivo principal es que cada estudiante diseñe, construya y publique su propio sitio web con identidad visual propia, usando HTML, CSS y una imagen generada con IA. El resultado final es un sitio funcional con un link real para compartir.

## Orden recomendado de lectura

- [README principal](../README.md)
- [Temario del curso](../docs/temario_curso_presencia_digital.md)
- [Estrategias didácticas](../docs/estrategias_didacticas_curso.md)
- [Ecosistema de herramientas](../docs/ecosistema_herramientas_curso.md)
- [Infraestructura y VPS](../infraestructura/recomendaciones_infraestructura.md)

## Instalación del servidor

La base de la infraestructura es muy simple y escalable:

- Ubuntu Server 24.04 LTS
- Docker + Docker Compose
- Caddy como reverse proxy con HTTPS automático
- Dominio con subdominios por herramienta

Se recomienda empezar con una instancia económica y luego crecer según las necesidades del curso. La referencia está en [infraestructura/orden_implementacion_tecnologias.md](../infraestructura/orden_implementacion_tecnologias.md).

## Temario de clases

El curso se divide en 8 clases:

1. Definición del proyecto + estructura básica HTML
2. Secciones del sitio
3. Estilo visual con CSS
4. Diseño responsive
5. Banner/logo con IA generativa
6. Enlaces, redes sociales y contacto
7. Ajustes finales
8. Publicación y presentación final

## Cursos que se preparan

La base del repositorio ya contempla la continuidad del trabajo con otros cursos, especialmente:

- Curso de IA para estudiantes + asistente personal
- Evolución del ecosistema de herramientas del curso y del VPS
- Mejoras de gamificación y seguimiento de progreso

## Cómo levantar esta wiki localmente

Desde la raíz del repositorio:

```bash
npx --yes serve . -l 4174
```

Luego abre en el navegador:

```text
http://localhost:4174/wiki/
```

