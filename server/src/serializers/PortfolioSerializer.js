import Portfolio from "../models/Portfolio.js"
import assetMix from "../utilities/assetMix.js"
import StochConfigSerializer from "./StochConfigSerializer.js"

class PortfolioSerializer {
  static dashboardData = async () => {
    const allowedFields = [
      "id",
      "name",
      "salary",
      "expenses",
      "annualSavings",
      "balanceReg",
      "mixReg",
      "balanceRoth",
      "mixRoth",
      "balanceBank",
      "balanceHomeEq"
    ]
    const portfolios = await Portfolio.query()
    const serializedPortfolios = Promise.all(portfolios.map(async portfolio => {
      const serializedPortfolio = {}
      for(const field of allowedFields) {
        if(field == "mixReg" || field == "mixRoth") {
          serializedPortfolio[field] = assetMix(portfolio[field])
        } else {
          serializedPortfolio[field] = portfolio[field]
        }
      }
      serializedPortfolio["stochConfigs"] = await StochConfigSerializer.dashboardData(portfolio)
      return serializedPortfolio
    }))
    return serializedPortfolios
  }
}

export default PortfolioSerializer