import Portfolio from "../models/Portfolio.js"
import assetMix from "../utilities/assetMix.js"
import StochConfigSerializer from "./StochConfigSerializer.js"

class PortfolioSerializer {
  static dashboardData = async () => {
    const allowedFields = [
      "id",
      "name",
      "date",
      "age",
      "salary",
      "expenses",
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

  static postPortfolio = (portfolio) => {
    const allowedFields = [
      "id",
      "name",
      "date",
      "age",
      "salary",
      "expenses",
      "balanceReg",
      "mixReg",
      "balanceRoth",
      "mixRoth",
      "balanceBank",
      "balanceHomeEq"
    ]
    const serializedPortfolio = {}
    for(const field of allowedFields) {
      if(field == "mixReg" || field == "mixRoth") {
        serializedPortfolio[field] = assetMix(portfolio[field])
      } else {
        serializedPortfolio[field] = portfolio[field]
      }
    }
    serializedPortfolio["stochConfigs"] = []
    return serializedPortfolio
  }

}

export default PortfolioSerializer