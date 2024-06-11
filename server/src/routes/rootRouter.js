import express from "express";

import clientRouter from "./clientRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);

// place your server-side routes here

export default rootRouter;
