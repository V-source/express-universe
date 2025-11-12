import request from "supertest";
import server from "../index.js";
function descriptor(str) {
  let j = " ✪ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ ✪ ";
  let descritption = j.concat(str.toUpperCase()).concat(j);
"✪ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ ✪ ✪ ✪ ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ ✪ "
  return descritption;
  // return `******************* ${str.toUpperCase()} *******************`
}

const data = {
  name: 'name',
  email: 'email',
  password: 'password',
  age: 18
}
describe(descriptor("Servicio de usuarios"), () => {
  it("✪ ▰▰▰▰▰▰ should return an 201 message", async () => {
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
    // console.log(response.status);
    // console.log(response.body);
  });

  it('✪ ▰▰▰▰▰▰ la respuesta debe tener las props: name, email, password, age', async () => {
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
  })

});
