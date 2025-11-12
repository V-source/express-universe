import express from "express";

//
const server = express();
const port = process.env.PORT || 1000;

//
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//
server.post("/users", (req, res) => {
  res.status(201).json({
    message: "user created",
  });
});

//
server.use((err, req, res, next) => {
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

export default server
