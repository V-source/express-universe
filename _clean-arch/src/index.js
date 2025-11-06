import express from "express";
import productEntity, {
  productLayout,
} from "./domain2/entities/product.entity.js";

const server = express();
const port = process.env.PORT || 2000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const productDataFromReqBody = { name: "pencil", price: 1 };

//solo por propositos de test
server.post("/products", (req, res) => {
  let simulaProductoCreado = useCase_createProduct(req.body);
  if (simulaProductoCreado) {
    res.status(201).json(simulaProductoCreado);
  }
});

// note: solo se estan manejando errores por ahora
server.use((err, req, res, next) => {
  console.log(err);
  res.status(422).json({ errors: err.errors });
});

// ╭─────────────────────────────────────────────────────────╮
// │                      CASOS DE USO                       │
// ╰─────────────────────────────────────────────────────────╯
// CREAR PRODUCTO
function useCase_createProduct(values) {
  let product = productEntity(values);
  // interfaz para guardar en la base de datos
  return product;
}

function compositeUseCase_createProduct(values) {
  return {
    save: () => { },
    update: () => { },
    delete: () => { },
  };
}

export default server;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
