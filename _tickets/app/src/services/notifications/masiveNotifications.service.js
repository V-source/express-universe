import { Router } from 'express';
import {Expo} from 'expo-server-sdk';
import PushNotification from '../../db/schemas/tokens/pushNotificationToken.js';

const expo = new Expo()

const masiveNotification = Router()



  .post('/masive-notification', async (req, res) => {
    const { title, body, data } = req.body;
    let messages = [];

    const savedTokens = await PushNotification.find();

    // Construir la lista de mensajes
    for (const savedToken of savedTokens) {
      // 1. **CORRECCIÓN:** Usa savedToken.token para acceder al token de la base de datos
      if (!Expo.isExpoPushToken(savedToken.token)) {
        console.error(`Token ${savedToken.token} no es un token válido de Expo`);
        continue;
      }

      // 2. **CORRECCIÓN:** Usa savedToken.token para el campo 'to'
      messages.push({
        to: savedToken.token,
        sound: 'default',
        title: title,
        body: body,
        data: data,
      });
    }

    // Enviar los mensajes a través del servicio de Expo con chunking
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(`Error al enviar el chunk: ${error}`);
      }
    }

    res.status(200).send('Notificación enviada');
  });


export default masiveNotification
