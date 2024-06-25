import ScenarioSerializer from "./ScenarioSerializer.js"

class StochConfigSerializer {
  static dashboardData = async (portfolio) => {
    const allowedFields = [
      "id",
      "numberOfScens",
      "targetRetAge",
      "deathAge",
      "savingsType",
      "savingsPerc",
      "retSpendingDropPerc",
      "avgRetAge",
      "avgBalAtDeath",
      "percRetAtTgt",
      "percExhaust",
      "portfolioId"
    ]
    const stochConfigs = await portfolio.$relatedQuery("stochConfigs")
    const serializedstochConfigs = await Promise.all(stochConfigs.map(async stochConfig => {
      const serializedstochConfig = {}
      allowedFields.forEach(field => {
        serializedstochConfig[field] = stochConfig[field]
      })
      const relatedScenarios = await stochConfig.$relatedQuery("scenarios")
      serializedstochConfig["scenarios"] = ScenarioSerializer.dashboardData(relatedScenarios)
      return serializedstochConfig
    }))
    return serializedstochConfigs
  }

  static postConfig = (stochConfig) => {
    const allowedFields = [
      "id",
      "numberOfScens",
      "targetRetAge",
      "deathAge",
      "savingsType",
      "savingsPerc",
      "retSpendingDropPerc",
      "avgRetAge",
      "avgBalAtDeath",
      "percRetAtTgt",
      "percExhaust",
      "portfolioId"
    ]
    const serializedstochConfig = {}
    allowedFields.forEach(field => {
      serializedstochConfig[field] = stochConfig[field]
    })
    serializedstochConfig["scenarios"] = []
    return serializedstochConfig    
  }

  static reRunConfig = (stochConfig, scenarios) => {
    const updatedConfig = StochConfigSerializer.postConfig(stochConfig)
    updatedConfig.scenarios = ScenarioSerializer.dashboardData(scenarios)
    return updatedConfig
  }
}

export default StochConfigSerializer