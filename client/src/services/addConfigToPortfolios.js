const addConfigToPortfolios = (stochConfig, portfolios) => {
  const updatedPortfolios = []
  for (let portfolio of portfolios) {
    if (portfolio.id == stochConfig.portfolioId) {
      portfolio.stochConfigs.push(stochConfig)
    }
    updatedPortfolios.push(portfolio)
  }
  return updatedPortfolios
}

export default addConfigToPortfolios