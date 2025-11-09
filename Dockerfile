# * Etapa 1: build
# Definir imagen base y etiqueta
FROM node:22-alpine AS builder

# Definir el directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias y lockfiles
COPY package*.json ./
RUN npm ci

# Copiar configuraciones necesarias
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copiar el código fuente
COPY src ./src

# Compilar
RUN npm run build

# * Etapa 2: runtime limpio
FROM node:22-alpine AS runner

# RUN apk add --no-cache bash

WORKDIR /usr/src/app

# Copiar solo lo necesario
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"]
