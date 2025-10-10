import { Router } from "express";

const apklogsRoute = Router();

apklogsRoute
  .post("/apklogs", (req, res) => {
    const logs = req.body;
    console.log(logs);
    res.status(200).json({ errors: logs });
  })
 apklogsRoute.post("/pushnot", (req, res) => {
  console.log('user push token')
    const data = req.body;
    console.log(data);
    res.status(200).json({ response: data });
  });

export default apklogsRoute;
