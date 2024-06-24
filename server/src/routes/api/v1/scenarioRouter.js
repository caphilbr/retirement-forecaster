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
    const scenarioInputs = { stochConfig, portfolio }
    const updatedStochConfig = await PythonClient.runScenario(scenarioInputs)
    res.status(200).json({ stochConfig: updatedStochConfig.stochConfig })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default scenarioRouter
