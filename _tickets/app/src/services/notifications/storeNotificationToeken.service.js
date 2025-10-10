import { Router } from 'express';
import {Expo} from 'expo-server-sdk';
import PushNotification from '../../db/schemas/tokens/pushNotificationToken.js';

const notificationToken = Router()


const expo = new Expo();

notificationToken
  .post('/store-push-token', async (req, res, next) => {
    const {pushToken, clientEmail }= req.body
    try {
      const savedToken = await PushNotification.findOne({token: pushToken})

      if(!savedToken) {
        const newToken = await PushNotification.create({token: pushToken, client: {email: clientEmail}})
        res.status(200).json({msg: 'Token gaurdado con exito', data: newToken})
      }
      
    } catch (error) {
      res.status(500).json({msg: 'No se pudo guardar el token', error: error.message})
    }
  })

export default notificationToken
