const replaceScenarios = (scenarios, portfolios, configIdForScens) => {
  const updatedPortfolios = []
  for (let portfolio of portfolios) {
    const updatedStochConfigs = []
    for (let stochConfig of portfolio.stochConfigs) {
      const updatedStochConfig = {
        ...stochConfig,
        scenarios: scenarios
      }
      updatedStochConfigs.push(updatedStochConfig)      
    }
    const updatedPortfolio = {
      ...portfolio,
      stochConfigs: updatedStochConfigs
    }
    updatedPortfolios.push(updatedPortfolio)
  }
  return updatedPortfolios
}

export default replaceScenarios
