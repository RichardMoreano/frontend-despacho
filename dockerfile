# ====================== STAGE 1: BUILD ======================
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar solo archivos de dependencias primero
COPY package*.json ./
RUN npm ci

# Copiar el resto del código
COPY . .

# Build de producción
RUN npm run build

# ====================== STAGE 2: PRODUCTION ======================
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copiar el build de Vite
COPY --from=builder /app/dist ./

# Copiar configuración nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]