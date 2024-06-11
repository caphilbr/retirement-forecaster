import express from "express"

import clientRouter from "./clientRouter.js"
import testRouter from "./api/v1/testApi.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/test", testRouter)
rootRouter.use("/", clientRouter)

// place your server-side routes here

export default rootRouter
