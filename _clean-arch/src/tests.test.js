import request from "supertest";
import server from "./index.js";

// Define los datos que quieres enviar
const badProductData = {
  name: "pencil",
  price: 0,
  sku: "13GCH5U8",
  stock: 10,
};

const correctProductData = {
  name: "pencil2",
  price: 10,
  sku: "12GCH5U9",
  stock: 10,
};
function descriptor(str) {
  let j = " ******************* ";
  let descritption = j.concat(str.toUpperCase()).concat(j);
  return descritption;
  // return `******************* ${str.toUpperCase()} *******************`
}
describe(descriptor("Servicio de productos"), () => {
  it("should return an 422 error", async () => {
    const response = await request(server)
      .post("/products")

      // 🔑 PASO CLAVE: Envía el objeto JSON directamente con .send()
      .send(badProductData)

      // Especifica que esperas una respuesta JSON
      .expect("Content-Type", /json/)

      // Envía el header Accept (opcional, pero buena práctica)
      .set("Accept", "application/json");
    // ✅ Aserciones de Vitest
    expect(response.status).toBe(422);
    // console.log(response.status);
    // console.log(response.body);
  });

  it("should return an 201", async () => {
    const response = await request(server)
      .post("/products")

      // 🔑 PASO CLAVE: Envía el objeto JSON directamente con .send()
      .send(correctProductData)

      // Especifica que esperas una respuesta JSON
      .expect("Content-Type", /json/)

      // Envía el header Accept (opcional, pero buena práctica)
      .set("Accept", "application/json");

    // Espera el código de estado 200
    // .expect(201);

    // ✅ Aserciones de Vitest
    expect(response.status).toBe(201);
    // console.log(response.status);
    // console.log(response.body);

    // expect(response.status).toBe(422);
    // if (response.status === 201) {
    //   // Caso de éxito (201 Created)
    //   expect(response.body).toHaveProperty("msg", "Issue created");
    // } else if (response.status === 422) {
    //   // Caso de fallo de validación (422 Unprocessable Entity)
    //   expect(response.body).toEqual({
    //     message:
    //       "Los datos proporcionados no son válidos. Por favor, revisa los mensajes de error específicos debajo de cada campo e intenta corregirlos.",
    //     errors: {
    //       name: ["nombre muy corto"],
    //       description: ["descriptio is required"],
    //     },
    //   });
    // }

    // expect(response.status).toBe(422);
    // expect(response.body.data).toEqual(expect.any(Object)); // Si esperas un objeto de la DB
    // expect(response.body).toHaveProperty("msg", "Issue created");
    // console.log(response.headers["content-type"]);
    // expect(response.headers["content-type"]).toBe("application/json");
  });
});
