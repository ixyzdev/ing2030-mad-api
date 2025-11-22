FROM node:22-alpine

# Instalar dependencias del contenedor
RUN apk add --no-cache git bash openssh

WORKDIR /home/node/workspace

# # Configuración Git para evitar diferencias con el host
RUN git config --global core.fileMode false \
    && git config --global --add safe.directory '*' \
    && git config --global core.autocrlf input \
    && git config --global pull.rebase false
