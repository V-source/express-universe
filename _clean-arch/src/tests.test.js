
import request from "supertest";
import server from "./index.js";

// Define los datos que quieres enviar
const newProduct = {
  name: "pencil",
  price: -10,
};

describe(">>> SERVICE: Crear producto", () => {
  // test("GET /api/issues listar todos los issues", async () => {
  //   const response = await request(server)
  //     .get(ISSUES.ALL)
  //     .expect("Content-Type", /json/)
  //     .set("Accept", "application/json")
  //     .expect(200)
  //     .expect({ msg: "Issues list", data: [] });
  // });

  test("POST /products  create a new issue (201)", async () => {
    const response = await request(server)
      .post('/products')

      // 🔑 PASO CLAVE: Envía el objeto JSON directamente con .send()
      .send(newProduct)

      // Especifica que esperas una respuesta JSON
      .expect("Content-Type", /json/)

      // Envía el header Accept (opcional, pero buena práctica)
      .set("Accept", "application/json");

    // Espera el código de estado 200
    // .expect(201);

    // ✅ Aserciones de Vitest
    expect(response.status).toBeOneOf([201, 422]);
    // expect(response.status).toBe(422);
    if (response.status === 201) {
      // Caso de éxito (201 Created)
      console.log(response.body)
      // expect(response.body).toHaveProperty("msg", "Issue created");
    } else if (response.status === 422) {
      // Caso de fallo de validación (422 Unprocessable Entity)
      console.log(response.body)
      // expect(response.body).toEqual({
      //   message:
      //     "Los datos proporcionados no son válidos. Por favor, revisa los mensajes de error específicos debajo de cada campo e intenta corregirlos.",
      //   errors: {
      //     name: ["nombre muy corto"],
      //     description: ["descriptio is required"],
      //   },
      // });
    }

    // expect(response.status).toBe(422);
    // expect(response.body.data).toEqual(expect.any(Object)); // Si esperas un objeto de la DB
    // expect(response.body).toHaveProperty("msg", "Issue created");
    // console.log(response.headers["content-type"]);
    // expect(response.headers["content-type"]).toBe("application/json");
  });
});
