# Recomendaciones de Infraestructura — VPS del Curso

## Distro

**Ubuntu Server 24.04 LTS.** Soporte hasta 2029, máxima compatibilidad con Docker y con la documentación de cada herramienta del ecosistema (la mayoría publica ejemplos probados en Ubuntu/Debian).

## Arquitectura básica

- **Docker + Docker Compose**: cada herramienta corre en su propio contenedor, aislada. Se puede actualizar o reiniciar una sin afectar a las demás.
- **Caddy como reverse proxy**: certificados HTTPS automáticos vía Let's Encrypt, configuración mínima comparado con Nginx + Certbot manual o Traefik.
- **Un dominio con subdominios por herramienta** (ej. `pizarra.tudominio.com`, `polls.tudominio.com`, `notas.tudominio.com`) — más limpio para los estudiantes que recordar IPs o puertos.

## Proveedores de VPS y costos (referencia 2026)

| Proveedor | Plan de referencia | Precio aprox. | Notas |
|---|---|---|---|
| **Hetzner** | CX (entrada) | ~€5.49–6.99/mes | Mejor rendimiento de CPU por dólar; 20 TB de ancho de banda incluido en regiones EU; buen tooling (API, CLI, Terraform/Ansible). |
| **Contabo** | Cloud VPS 8 | ~€14/mes (24 GB RAM) | Máxima densidad de RAM por precio; el CPU rinde por debajo de la ficha técnica bajo carga sostenida. |
| **DigitalOcean** | Basic Droplet | Desde $4/mes; ~$24/mes en el tier 2 vCPU/4GB | Documentación muy amigable para principiantes, pero más caro por especificación que Hetzner. |
| **IONOS** | Entrada | Desde $2/mes, sin compromiso anual | Bajo riesgo para probar antes de comprometerte, fácil de migrar después. |

*Precios de referencia a 2026; verificar antes de contratar, ya que cambian con frecuencia.*

## Recomendación concreta

Dado que vas a correr **varios contenedores Docker de forma simultánea** (pizarra, polls, y potencialmente kanban, notas y quiz más adelante), la RAM disponible importa más que la velocidad pura de CPU.

- **Para empezar barato (recomendado por ahora):** Hetzner CX más económico (~€5.49–6.99/mes). Alcanza perfectamente para Fase 1 (Excalidraw + Claper) y probablemente Fase 2 también.
- **Si more adelante notas que la RAM se queda corta** al sumar Focalboard, Hedgedoc, o un LMS: subir de plan dentro de Hetzner, o migrar a Contabo Cloud VPS 8 (24GB RAM, ~€14/mes) si priorizas memoria sobre CPU.

No es necesario sobredimensionar el servidor desde el día 1 — el stack de Fase 1 (Excalidraw + Claper) es liviano y corre bien en el plan más económico.

## Factor de latencia

Ninguno de estos proveedores tiene datacenter en Bolivia o cerca; la latencia hacia Europa o EE.UU. puede notarse en herramientas de tiempo real. Como las videollamadas van por Microsoft Teams (no por el VPS), esto solo afectaría a Excalidraw/Claper/Quiz, que toleran bien la latencia al ser mayormente tráfico HTTP, no streaming en tiempo real crítico. Si notas lentitud, vale la pena probar la región US de Hetzner (Ashburn/Hillsboro) en vez de la europea, y comparar.

## Seguridad básica al montar el servidor

- Crear un usuario no-root con `sudo` desde el inicio; deshabilitar login root por SSH.
- Configurar firewall (`ufw`) permitiendo solo los puertos necesarios: 22 (SSH, idealmente restringido a tu IP), 80 y 443 (Caddy).
- Backups automáticos de los volúmenes de Docker (especialmente las bases de datos de Claper y, si se activa, Hedgedoc) — la mayoría de proveedores ofrece snapshots automáticos por un costo adicional pequeño.
