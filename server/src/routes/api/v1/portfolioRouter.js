import express from "express"
import PortfolioSerializer from "./../../../serializers/PortfolioSerializer.js"
import Portfolio from "../../../models/Portfolio.js"
import portfolioConfigRouter from "./portfolioConfigRouter.js"

const portfolioRouter = new express.Router()

portfolioRouter.use("/:id/stochConfig", portfolioConfigRouter)

portfolioRouter.get("/", async (req, res) => {
  try {
    const portfolios = await PortfolioSerializer.dashboardData()
    res.status(200).json({ portfolios })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

portfolioRouter.post("/", async (req, res) => {
  try {
    const formInput = req.body
    console.log(formInput)
    const newPortfolio = await Portfolio.query().insertAndFetch(formInput)
    const serializedNewPortfolio = PortfolioSerializer.postPortfolio(newPortfolio)
    res.status(200).json({ portfolio: serializedNewPortfolio })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default portfolioRouter