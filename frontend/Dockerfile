# Stage 1: Bygg frontend med Node.js
FROM node:18 as build

WORKDIR /app

# Kopiera över package.json och installera beroenden
COPY package.json package-lock.json ./
RUN npm install

# Kopiera frontend-filer och bygg projektet
COPY . .
RUN npm run build

# Stage 2: Servera frontend-filer med NGINX
FROM nginx:alpine

# Kopiera byggda filer från första steget
COPY --from=build /app/dist /usr/share/nginx/html

# Konfiguration för NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponera endast port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
