FROM: node:22-alpine

WORKDIR /app

# Copia los archivos package*.json para instalar las dependencias.

# El primer "app/package*.json" es la ruta en tu máquina local.
# El segundo "./" es la ruta de destino dentro del contenedor, que es /app.
COPY app/package*.json ./

# Instala las dependencias del proyecto.
RUN npm install

# Copia el resto del código fuente del proyecto a la carpeta 'app' dentro del contenedor.
# "app" es la ruta en tu máquina local.
# "." es la ruta de destino dentro del contenedor, que es /app.
COPY app .

# Expón el puerto en el que tu aplicación Node.js escucha.
# Por ejemplo, si tu app escucha en el puerto 3000.
EXPOSE 3000

# Define el comando que se ejecutará cuando se inicie el contenedor.
# En tu caso, el punto de entrada es "index.js" dentro de la carpeta 'src'.
# El comando se ejecutará desde /app, por lo que la ruta relativa es src/index.js.
CMD ["cd", "src"]
CMD ["npm", "run", "server"]
