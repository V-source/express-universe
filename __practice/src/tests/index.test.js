import request from "supertest";
import server from "../index.js";
function descriptor(str) {
  let j = " ******************* ";
  let descritption = j.concat(str.toUpperCase()).concat(j);
  return descritption;
  // return `******************* ${str.toUpperCase()} *******************`
}
describe(descriptor("Servicio de productos"), () => {
  it("should return an 201 message", async () => {
    const response = await request(server)
      .post("/users")

      // 🔑 PASO CLAVE: Envía el objeto JSON directamente con .send()
      .send()

      // Especifica que esperas una respuesta JSON
      .expect("Content-Type", /json/)

      // Envía el header Accept (opcional, pero buena práctica)
      .set("Accept", "application/json");
    // ✅ Aserciones de Vitest
    expect(response.status).toBe(201);
    // console.log(response.status);
    // console.log(response.body);
  });
});
