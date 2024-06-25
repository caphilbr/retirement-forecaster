const updateConfigInPortfolios = (stochConfig, portfolios) => {
  const updatedPortfolios = portfolios.map((portfolio) => {
    if (portfolio.id == stochConfig.portfolioId) {
      return {
        ...portfolio,
        stochConfigs: portfolio.stochConfigs.map((config) => {
          if (config.id == stochConfig.id) {
            return stochConfig
          } else {
            return config
          }
        }),
      }
    } else {
      return portfolio
    }
  })
  return updatedPortfolios
}

export default updateConfigInPortfolios
