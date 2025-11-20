import express from "express";
import CreateUserCase from "./applications/useCases/crateUser.case.js";
import DbRepository from "./applications/reposistories/dbRepository.js";
import UserRepository from "./domains/users/repositories/user.repository.js";
import ProductController from "./controller/product.contrller.js";
//
const server = express();
const port = process.env.PORT || 1000;

//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// ORQUESTACION ?
const dbRepository = new DbRepository();
const createUserCase = new CreateUserCase(dbRepository);

// TIP: SOLO RECIBE LOS CASOS DE USO
const productController = new ProductController(createUserCase);

server.post("/users", productController.createUser);

// server.post("/users", async (req, res) => {
//   const user = await createUserCase.execute({ ...req.body });
//   return res.status(201).json({ ...req.body });
// });

//
server.use((err, req, res, next) => {
  // console.log(err?.cause);
  // console.log(err?.cause?.status || "status is undefined");

  return res.status(err?.cause?.status || 500).json({
    message: err?.message || "Internal Server Error",
    // errors: err?.cause?.errors || null,
  });
});

//
server.listen(port, () => {
  console.log(`server on port: ${port}`);
});

export default server;
