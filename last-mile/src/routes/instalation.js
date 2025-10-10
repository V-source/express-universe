import { Router } from "express";

const instalation = Router()


instalation.post('/api/instalation', (req, res) => {
  const formData = req.body
  console.log(formData)
})


export default instalation

