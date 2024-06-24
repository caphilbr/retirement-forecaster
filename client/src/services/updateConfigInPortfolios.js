const updateConfigInPortfolios = (stochConfig, portfolios) => {
  const updatedPortfolios = portfolios
  updatedPortfolios.forEach((portfolio, portfolioIndex) => {
    if (portfolio.id == stochConfig.portfolioId) {
      portfolio.stochConfigs.forEach((config, configIndex) => {
        if (config.id == stochConfig.id) {
          updatedPortfolios[portfolioIndex].stochConfigs[configIndex] = stochConfig
        }
      })
    }
  })
  return updatedPortfolios
}

export default updateConfigInPortfolios