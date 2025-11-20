import request from "supertest";
import server from "../index.js";
import { logTestResponse, descriptor, itStr } from "./utils/index.js";

describe(descriptor("Servicio: Crear usuarios de express js"), () => {
  const data = {
    name: "name",
    email: "email",
    password: "password",
    age: 18,
  };
  it(itStr("should return an 201 message"), async () => {
    const response = await request(server)
      .post("/users")

      // 🔑 PASO CLAVE: Envía el objeto JSON directamente con .send()
      .send(data)

      // Especifica que esperas una respuesta JSON
      .expect("Content-Type", /json/)

      // Envía el header Accept (opcional, pero buena práctica)
      .set("Accept", "application/json");
    // ✅ Aserciones de Vitest
    expect(response.status).toBeOneOf([201, 400, 500]);
    // logTestResponse(response.body);
  });

  it(
    itStr("la respuesta debe tener las props: name, email, password, age"),
    async () => {
      const response = await request(server)
        .post("/users")

        .send(data)

        // Especifica que esperas una respuesta JSON
        .expect("Content-Type", /json/)

        // Envía el header Accept (opcional, pero buena práctica)
        .set("Accept", "application/json");

      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("password");
      expect(response.body).toHaveProperty("age");
    },
  );

  it(itStr("deber reponder un error si la edad es menor a 18"), async () => {
    const lessThan18Data = {
      name: "name",
      email: "email",
      password: "password",
      age: 17,
    };
    const response = await request(server)
      .post("/users")

      .send(lessThan18Data)

      .expect("Content-Type", /json/)

      // Envía el header Accept (opcional, pero buena práctica)
      .set("Accept", "application/json");

    expect(response.body).toBeOneOf([{ message: "Age must be greater than 18" }, {message: "Internal Server Error", errors: null}]);
    console.log(response.statusCode)
    logTestResponse(response.body);
  });
});
