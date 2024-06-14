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
      "avgFrugalYrs",
      "percRetAtTgt",
      "percExhaust",
      "percFrugal",
    ]
    const stochConfigs = await portfolio.$relatedQuery("stochConfigs")
    const serializedstochConfigs = await Promise.all(stochConfigs.map(async stochConfig => {
      const serializedstochConfig = {}
      allowedFields.forEach(field => {
        serializedstochConfig[field] = stochConfig[field]
      })
      const relatedScenarios = await stochConfig.$relatedQuery("scenarios")
      serializedstochConfig["scenarios"] = await ScenarioSerializer.dashboardData(relatedScenarios)
      return serializedstochConfig
    }))
    return serializedstochConfigs
  }
}

export default StochConfigSerializer