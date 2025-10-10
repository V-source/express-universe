import mongoose from 'mongoose'

// const mongoose = require("mongoose");
// const { adminSeed, partnersSeed } = require("./seed");
// const { createAdminUser } = require("./libs/createAdminUser");
// const { createPartnerUser } = require("./libs/createPartnerUser");

async function initDb() {
  console.log('conectando con la base de datos. por favor espere')
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/last-mile",{
      serverSelectionTimeoutMS: 30000
    });

    console.log(`conectado a la base de datos: ${db.connection.name}`);

// inserta usuarios de prueba si no existen
    // adminSeed.map(e => createAdminUser(e))
    // partnersSeed.map(e => createPartnerUser(e))

      } catch (error) {
    console.log('ha ocurrido un error inesperado, vuelva a intentarlo')
    console.log(error);
  }
}

export default initDb
