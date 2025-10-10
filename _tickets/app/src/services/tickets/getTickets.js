import { Router } from "express";
import Tickets from "../../db/schemas/tickets.schema.js";
import ErrorFactory from "../../utils/errorHandlers/factory.js";
import Token from "../../db/schemas/tokens/snetToken.schema.js";
import getSnetUser from "./middlewares/snet.js";
import SnetUser from "../../db/schemas/users/snetUser.schema.js";
const tickets = Router();

tickets.get("/tickets", async (req, res, next) => {
  try {
    const tickets = await Tickets.find();
    // .populate({ path: "assignedTo", select: "email role -_id" })
    // .populate({ path: "assignedBy", select: "email role -_id" })
    // .populate({ path: "createdBy", select: "email role -_id" })
    // .exec();

    // Si la lista está vacía, simplemente responde con un 200 y el array vacío
    // Esto es la convención estándar y no debe ser tratado como un error
    console.log(tickets);
    res.status(200).json(tickets);
  } catch (error) {
    // Para cualquier otro error (del servidor, de la DB, etc.),
    // lo pasamos al middleware de errores global con `next(error)`
    next(error);
  }
});

// Endpoint para un ticket específico, aquí sí se usa un ErrorFactory
tickets.get("/tickets/:id", async (req, res, next) => {
  try {
    const ticket = await Tickets.findById(req.params.id);
    // const ticket = await Tickets.findById(req.params.id)
    //   .populate({ path: "assignedTo", select: "email role -_id" })
    //   .populate({ path: "assignedBy", select: "email role -_id" })
    //   .populate({ path: "createdBy", select: "email role -_id" })
    //   .exec();

    if (!ticket) {
      // Si el ticket no existe, creamos una instancia de ErrorFactory
      const error = new ErrorFactory(
        "No se encontró el ticket.",
        `El ticket con ID ${req.params.id} no existe.`,
        404,
      );
      // Y la pasamos al middleware de errores
      return next(error);
    }

    console.log(ticket);
    res.status(200).json(ticket);
  } catch (error) {
    // Esto capturará errores como 'CastError' de Mongoose
    next(error);
  }
});

// store ticket
tickets.post("/tickets", async (req, res, next) => {
  const { creatorId, creatorType, subject, description, comment } = req.body;
  const snetUser = await getSnetUser(creatorId);
  try {
    const existsSnetUser = await SnetUser.findOne({ id: snetUser.id });
    const newSnetUser = new SnetUser(snetUser);

    // if(!existsSnetUser){
    //   await newSnetUser.save();
    //   console.log(newSnetUser)
    // }



    const ticket = new Tickets({
      creatorId: snetUser.id,
      creatorType,
      subject,
      description,
      comments: [
        {
          body: comment,
          author: creatorId,
        },
      ],
    });
    // console.log(ticket)
   const savedTicket = await ticket.save();
   savedTicket.populate({ path: "creatorId", select: "email persona_cedula" }); 
    res.status(201).json({
      message: "Ticket creado exitosamente",
      ticket: savedTicket,
    });
  } catch (error) {
    next(error);
  }
});
export default tickets;
