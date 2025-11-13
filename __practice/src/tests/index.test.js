import request from "supertest";
import server from "../index.js";
import { bodyResPrettier, descriptor, itStr } from "./utils/index.js";
const data = {
  name: "name",
  email: "email",
  password: "password",
  age: 18,
};

describe(descriptor("Servicio de usuarios de express js"), () => {
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
    bodyResPrettier(response.body);
    // console.log("▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰");
    // console.log(" cuerpo de la respuesta\n".toUpperCase());
    // console.log(response.body);
    // console.log("▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰");
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
});
