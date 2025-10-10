import SnetUser from "../../../db/schemas/users/snetUser.schema.js";

export default async function getSnetUser(snetUserEmail) {

  let snetUser = null;

  try {
    const authSnet = await fetch(
      `https://back.sucrenet.com.ve/api/v1/clientes?usuario_correo=${snetUserEmail}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SNET_TOKEN}`,
          // "User-Agent": `Customer-Area/4.0.0 Villejsdev-backend`,
        },
      },
    );
    if (!authSnet.ok) {
      const res = await authSnet.json();
      console.log(res.errors);
      throw new Error(res.errors);
    } else {
      const res = await authSnet.json();
      // console.log(res);
      snetUser = res.data;
    }
  } catch (error) {
    console.log(error);
  }
  return snetUser[0]
}
