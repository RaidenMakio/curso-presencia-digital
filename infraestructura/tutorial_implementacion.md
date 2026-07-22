# Tutorial: Implementación del Ecosistema del Curso en VPS

Este tutorial asume que ya tienes contratado un VPS (Hetzner recomendado) con **Ubuntu Server 24.04 LTS** y un dominio propio apuntando a él. Sigue las fases en orden — no saltes a la Fase 2 sin haber probado la Fase 1 primero.

Arquitectura: **una sola instancia de cada herramienta, compartida por todos los cursos.** El aislamiento entre cursos se maneja dentro de cada app (rooms, cuentas, permisos) — ver `aislamiento_datos_por_curso.md` para el procedimiento exacto de cada herramienta.

---

## Paso 0: Preparar el dominio

Ve al panel DNS de tu proveedor de dominio y crea registros tipo **A** apuntando cada subdominio a la IP de tu VPS:

```
pizarra.tudominio.com   →  A  →  IP_DE_TU_VPS
polls.tudominio.com     →  A  →  IP_DE_TU_VPS
```

Agrega más subdominios (`tareas.`, `notas.`) cuando llegues a esas fases. Los cambios DNS pueden tardar hasta 24h en propagarse, aunque normalmente son minutos.

---

## Paso 1: Conexión inicial y seguridad básica

Conéctate por SSH con el usuario root que te dio el proveedor:

```bash
ssh root@IP_DE_TU_VPS
```

Crea un usuario no-root con permisos sudo:

```bash
adduser rmt
usermod -aG sudo rmt
```

Copia tu clave SSH al nuevo usuario (desde tu máquina local, en otra terminal):

```bash
ssh-copy-id rmt@IP_DE_TU_VPS
```

Vuelve a conectarte ya como `rmt`:

```bash
ssh rmt@IP_DE_TU_VPS
```

Configura el firewall básico:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

(Opcional pero recomendado) Deshabilita el login root por SSH editando `/etc/ssh/sshd_config`, cambiando `PermitRootLogin yes` a `PermitRootLogin no`, y reinicia el servicio: `sudo systemctl restart ssh`.

---

## Paso 2: Instalar Docker y Docker Compose

```bash
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Permite que tu usuario use Docker sin `sudo`:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verifica que todo esté instalado:

```bash
docker --version
docker compose version
```

---

## Paso 3: Preparar los archivos del proyecto

Crea la carpeta del proyecto y copia dentro los archivos ya generados (`docker-compose.yml`, `Caddyfile`, `.env.example`):

```bash
mkdir -p ~/curso-infra
cd ~/curso-infra
```

Sube los tres archivos desde tu máquina local (en otra terminal, no la SSH):

```bash
scp docker-compose.yml Caddyfile .env.example rmt@IP_DE_TU_VPS:~/curso-infra/
```

De vuelta en el servidor, edita el `Caddyfile` reemplazando `tudominio.com` por tu dominio real:

```bash
nano Caddyfile
```

Copia `.env.example` a `.env` y completa los valores con contraseñas y secretos reales:

```bash
cp .env.example .env
nano .env
```

Genera secretos seguros con:

```bash
openssl rand -hex 32
```

Usa un valor distinto generado con ese comando para cada contraseña/secreto del `.env` (no reutilices el mismo).

---

## Paso 4: Levantar Fase 1 (Excalidraw + Claper)

En `docker-compose.yml`, confirma que solo los servicios de `caddy`, `excalidraw`, `claper-db` y `claper` estén descomentados (los demás deben seguir comentados con `#`).

Levanta el stack:

```bash
docker compose up -d
```

Verifica que los contenedores estén corriendo:

```bash
docker compose ps
```

Revisa los logs si algo falla:

```bash
docker compose logs -f caddy
docker compose logs -f claper
```

Abre en el navegador `https://pizarra.tudominio.com` y `https://polls.tudominio.com`. Caddy debería emitir el certificado HTTPS automáticamente en el primer acceso (puede tardar unos segundos).

**No sigas al Paso 5 hasta confirmar que ambas URLs cargan correctamente.**

### Configurar el primer curso en Claper

1. Regístrate como organizador con una cuenta dedicada a tu primer curso (ej. `presencia@tudominio.com`).
2. Crea tu primera presentación/encuesta desde esa cuenta.
3. Cuando lances un segundo curso, crea una **segunda cuenta de organizador** distinta — así sus eventos nunca se mezclan (ver `aislamiento_datos_por_curso.md`).

---

## Paso 5: Activar Fase 2 (Focalboard)

Cuando estés por dictar las Clases 3-4, edita `docker-compose.yml` y descomenta el bloque de `focalboard`. Agrega también su subdominio en el `Caddyfile`:

```
tareas.tudominio.com {
    reverse_proxy focalboard:8000
}
```

Agrega el registro DNS correspondiente (Paso 0) y luego aplica los cambios:

```bash
docker compose up -d
```

Docker Compose solo creará el contenedor nuevo; los que ya estaban corriendo (Excalidraw, Claper) no se ven afectados.

Al crear boards, sigue el procedimiento de `aislamiento_datos_por_curso.md`: un board separado por curso, con permisos revisados manualmente — esta es la herramienta que más cuidado requiere.

> Recuerda: Focalboard ya no recibe actualizaciones de seguridad. Si prefieres una alternativa mantenida activamente (Vikunja o Planka), instálala en su lugar siguiendo la documentación oficial de esa herramienta — la estructura de pasos (descomentar/agregar servicio, subdominio, DNS, `docker compose up -d`) es la misma.

---

## Paso 6: Activar Fase 3 (Hedgedoc)

Cuando estés por dictar las Clases 5 en adelante, descomenta el bloque de `hedgedoc-db` y `hedgedoc` en `docker-compose.yml`. Agrega su subdominio en el `Caddyfile`:

```
notas.tudominio.com {
    reverse_proxy hedgedoc:3000
}
```

Agrega el registro DNS y aplica los cambios:

```bash
docker compose up -d
```

Al crear notas, configúralas siempre como **Limitado** o **Privado** (nunca "Libre") antes de compartir el link — ver `aislamiento_datos_por_curso.md`.

---

## Paso 7: Mantenimiento básico

**Actualizar imágenes a la última versión:**

```bash
docker compose pull
docker compose up -d
```

**Reiniciar todo el stack:**

```bash
docker compose restart
```

**Apagar todo (sin borrar datos):**

```bash
docker compose down
```

**Backup de la base de datos de Claper:**

```bash
docker compose exec claper-db pg_dump -U claper claper > backup_claper_$(date +%F).sql
```

Repite el mismo comando (ajustando nombres) para `hedgedoc-db` cuando esté activo.

**Ver uso de recursos del servidor** (útil para decidir si necesitas subir de plan):

```bash
docker stats
```

---

## Checklist rápido antes de cada fase nueva

- [ ] Registro DNS del nuevo subdominio creado y propagado
- [ ] Servicio descomentado en `docker-compose.yml`
- [ ] Bloque agregado en `Caddyfile`
- [ ] Variables necesarias agregadas en `.env`
- [ ] `docker compose up -d` ejecutado
- [ ] URL probada en el navegador con HTTPS funcionando
- [ ] `docker compose logs -f <servicio>` revisado en busca de errores

## Checklist rápido antes de cada curso nuevo

- [ ] Cuenta de organizador nueva creada en Claper
- [ ] Boards de Focalboard (si está activo) creados con permisos privados revisados
- [ ] Procedimiento de `aislamiento_datos_por_curso.md` aplicado para cada herramienta en uso
