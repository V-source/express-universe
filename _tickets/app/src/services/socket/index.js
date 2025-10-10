export function handleSocketConnection(io, clients) {

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("identify", (clientId) => {
      console.log(`Client identified as ${clientId}`);
      // Almacenar el socket con el ID proporcionado por el cliente
      clients[clientId] = socket;
      // console.log(clients)

      // Manejar desconexión para limpiar
      socket.on("disconnect", () => {
        console.log(`Client ${clientId} disconnected`);
        delete clients[clientId];
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      // Eliminar el socket cuando se desconecta
      delete clients[socket.id];
    });

    socket.on("500", (msg) => {
      console.log("message received:", msg);
      // Enviar respuesta a un canal específico
      socket.emit("response", {
        channel: "response to 500",
        data: "hola desde el servidor",
        msg: "hola desde el servidooooor",
        originalMessage: msg,
      });
    });
  });
}
