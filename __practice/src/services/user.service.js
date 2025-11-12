import { Router } from "express";


const userRouter = Router();

userRouter.get("/users", (req, res) => {
  res.send("users");
});

userRouter.post("/users", (req, res) => {
  
})
