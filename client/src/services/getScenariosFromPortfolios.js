const getScenariosFromPortfolios = (portfolios, configIdForScens) => {
  for(const portfolio of portfolios) {
    for(const stochConfig of portfolio.stochConfigs) {  
      if (stochConfig.id == configIdForScens) {
        return stochConfig.scenarios
      }
    }
  }
  return []
}

export default getScenariosFromPortfolios