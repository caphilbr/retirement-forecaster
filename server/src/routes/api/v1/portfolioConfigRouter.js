import express from "express"
import StochConfig from "../../../models/StochConfig.js"
import StochConfigSerializer from "../../../serializers/StochConfigSerializer.js"

const portfolioConfigRouter = new express.Router({ mergeParams: true })

portfolioConfigRouter.post("/", async (req, res) => {
  try {
    const payload = req.body
    if (payload.savingsPerc == "n/a") {
      payload.savingsPerc = 0
    }
    const newConfig = await StochConfig.query().insertAndFetch(payload)
    const serializedConfig = StochConfigSerializer.postConfig(newConfig)
    res.status(200).json({ config: serializedConfig })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default portfolioConfigRouter