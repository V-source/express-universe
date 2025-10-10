import { Router } from "express";
import PushNotification from "../../db/schemas/tokens/pushNotificationToken.js";
const usersCount = Router();

usersCount.get("/users-count", async (_req, res, next) => {
  try {
    const usersCount = await PushNotification.usersCount();
    res.status(200).json({total_clientes: usersCount});
  } catch (error) {
    next(error);
  }
});


export default usersCount
