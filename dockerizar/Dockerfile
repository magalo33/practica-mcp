# Imagen de por usar Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y dependencias
COPY package*.json ./

# Instalar dependencias necesarias
RUN npm install --omit=dev

# Copiar carpeta compilada con el código JS
COPY dist ./dist

# Copiar archivo .env
# COPY .env .env

# Exponer
EXPOSE 9192

# Comando de arranque
CMD ["npm", "start"]
