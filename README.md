# Frontend Despacho

Frontend desarrollado en React + Vite para la gestión de compras y despachos del sistema de logística.

## Tecnologías

- React
- Vite
- TailwindCSS
- Axios
- Docker
- Nginx
- GitHub Actions

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Build producción:

```bash
npm run build
```

## Variables de entorno

Crear:

```env
VITE_API_VENTAS=http://localhost:8080
VITE_API_DESPACHOS=http://localhost:8081
```

## Docker

Construir imagen:

```bash
docker build -t frontend-despacho .
```

Ejecutar:

```bash
docker run -p 80:80 frontend-despacho
```

## CI/CD

Cada push a la rama:

```txt
deploy
```

ejecutará automáticamente GitHub Actions y publicará la imagen en Docker Hub.