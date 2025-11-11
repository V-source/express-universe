import express from "express";
import productEntity, {
  productLayout,
} from "./domain2/entities/product.entity.js";
import CreateProductUseCase from "./domain2/useCases/createProduct.js";
import ProductDbRepository from "./domain2/application/DbRepository.js";

const server = express();
const port = process.env.PORT || 2000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// const productDataFromReqBody = {
//   name: "pencil",
//   price: -10,
//   sku: "13GCH5U8",
//   stock: 10,
// };

// const producto1 = crearProducto.execute(productDataFromReqBody);
//solo por propositos de test
server.post("/products", async (req, res) => {
  const productDb = new ProductDbRepository();
  const crearProducto = new CreateProductUseCase(productDb);
  const producto = await crearProducto.execute(req.body);
  if (producto) {
    return res.status(201).json({ msg: "Producto creado", data: producto });
  }
  throw new Error("Producto no creadoooooo", {cause: {
    status: 422,
    errors: {
    }
  }});
});

// note: solo se estan manejando errores por ahora
server.use((err, req, res, next) => {
  let status = err.cause.status || 500;
  
  return res.status(err.cause.status).json({ msg: err.message, errors: err.errors });
});

export default server;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
