import express from "express"
import PortfolioSerializer from "./../../../serializers/PortfolioSerializer.js"

const portfolioRouter = new express.Router()

portfolioRouter.get("/", async (req, res) => {
  try {
    const portfolios = await PortfolioSerializer.dashboardData()
    res.status(200).json({ portfolios })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default portfolioRouter