import { Router } from "express";
import Tickets from "../../db/schemas/tickets.schema.js";
import ErrorFactory from "../../utils/errorHandlers/factory.js";
const tickets = Router();

// all tickets
tickets
  .get("/tickets", async (req, res, next) => {
    try {
      const tickets = await Tickets.find()
        .populate({ path: "assignedTo", select: "email role -_id" })
        .populate({ path: "assignedBy", select: "email role -_id" })
        .populate({ path: "createdBy", select: "email role -_id" })
        .exec();

      // Si la lista está vacía, simplemente responde con un 200 y el array vacío
      // Esto es la convención estándar y no debe ser tratado como un error
      res.status(200).json(tickets);
    } catch (error) {
      // Para cualquier otro error (del servidor, de la DB, etc.),
      // lo pasamos al middleware de errores global con `next(error)`
      next(error);
    }
  })

  // one ticket
  .get("/tickets/:id", async (req, res, next) => {
    try {
      const ticket = await Tickets.findById(req.params.id)
        .populate({ path: "assignedTo", select: "email role -_id" })
        .populate({ path: "assignedBy", select: "email role -_id" })
        .populate({ path: "createdBy", select: "email role -_id" })
        .exec();

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

      res.status(200).json(ticket);
    } catch (error) {
      // Esto capturará errores como 'CastError' de Mongoose
      next(error);
    }
  })

  // store ticket
  tickets.post("/tickets", async (req, res, next) => {
    const { creatorId, creatorType, subject, description } = req.body;
    const ticket = new Tickets({ creatorId, creatorType, subject, description });
    try {

    console.log(req.body)
    console.log(ticket)
      res.status(201).json(ticket);
      // await ticket.save();
      // res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  })


export default tickets;
