import express from "express";
import CreateUserCase from "./applications/useCases/crateUser.case.js";
import DbRepository from "./applications/reposistories/dbRepository.js";
import UserRepository from "./domains/users/repositories/user.repository.js";
//
const server = express();
const port = process.env.PORT || 1000;

//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const dbRepository = new DbRepository();
const creaUserCase = new CreateUserCase(dbRepository);
//
server.post("/users", async (req, res) => {
  const user = await creaUserCase.execute({ ...req.body });
  return res.status(201).json({ ...req.body });
});

//
server.use((err, req, res, next) => {
  console.log(err?.cause);
  console.log(err?.cause?.status || "status is undefined");

  return res.status(err?.cause?.status || 500).json({
    message: err?.cause?.message || "Internal Server Error",
    errors: err?.cause?.errors || null,
  });
});

//
server.listen(port, () => {
  console.log(`server on port: ${port}`);
});

export default server;
