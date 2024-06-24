import express from "express"

import clientRouter from "./clientRouter.js"
import portfolioRouter from "./api/v1/portfolioRouter.js"
import projectionRouter from "./api/v1/projectionRouter.js"
import scenarioRouter from "./api/v1/scenarioRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/portfolio", portfolioRouter)
rootRouter.use("/api/v1/projection", projectionRouter)
rootRouter.use("/api/v1/scenario", scenarioRouter)
rootRouter.use("/", clientRouter)

export default rootRouter
