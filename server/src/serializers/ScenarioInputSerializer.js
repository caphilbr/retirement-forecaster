
class ScenarioInputSerializer {
  static dashboardData = async (portfolio) => {
    const allowedFields = [
      "id",
      "targetRetAge",
      "deathAge",
      "savingsType",
      "savingsPerc",
      "retSpendingDropPerc"
    ]
    const scenarioInputs = await portfolio.$relatedQuery("scenarioInputs")
    const serializedScenarioInputs = scenarioInputs.map(scenarioInput => {
      const serializedScenarioInput = {}
      allowedFields.forEach(field => {
        serializedScenarioInput[field] = scenarioInput[field]
      })
      return serializedScenarioInput
    })
    return serializedScenarioInputs
  }
}

export default ScenarioInputSerializer