import express from "express"
import PythonClient from "../../../apiClient/pythonClient.js"
import StochConfig from "../../../models/StochConfig.js"

const scenarioRouter = new express.Router()

scenarioRouter.post("/", async (req, res) => {
  try {
    const stochConfig = await StochConfig.query().findById(
      req.body.stochConfigId,
    )
    const portfolio = await stochConfig.$relatedQuery("portfolio")
    stochConfig.age = portfolio.age
    const response = await PythonClient.runScenario(stochConfig)
    res.status(200).json({ message: response.message })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default scenarioRouter
