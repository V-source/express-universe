el ticket puede nacer del cliente o del operador.

cliente:
el ticket nace del cliente con el id del cliente, el titulo, la descripcion y el estado por defecto del ticket (abierto).
una vez el ticket abierto por el operador este le asigna el operador que lo atiende al ticket (update).
el operador decide si abrir la sala de chat privada para el ticket. Al hacerlo esta asigna el chat al ticket. (se veran como comentarios en el ticket).
el operador decide si marcarlo como resuelto.
el operador deciede si remitir a otro departamente el ticket, de hacerlo puede a;adir su propia comentario/obseracion/nota para el departamento.



atencion al cliente lo recibe (tine su canal de atencion privado - socket)

el operador inica una conversacion con el ticket. cada ticket genera una sala de chat privada. en esta sala solo cambia el oparador cuando se asigna o reasigna el ticket de manera que solo puedan recibir notificaciones de sus interacciones.
los operadores o personas que interacctuen con el cliente deben ser solo personal autorizado (preguntar). deben existir los permisos para ello.



puede tener una separacion de conversaciones del cliente con operadores, es decir: opreador 1 n cantidad de mensajes, separador, operador 2 n cantidad de mensajes y su chat si es quien esta atendiendo el ticket.

TICKET
titulo.
comentario.

OPERADOR
comentario.

CLIENTE
comentario.

separdor


