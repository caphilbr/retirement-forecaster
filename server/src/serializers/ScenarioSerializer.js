
class ScenarioSerializer {
  static dashboardData = async (scenarios) => {
    const allowedFields = [
      "id",
      "retAge",
      "balanceAtDeath",
      "numYrsFrugal"
    ]
    const serializedScenarios = scenarios.map(scenario => {
      const serializedScenario = {}
      allowedFields.forEach(field => {
        serializedScenario[field] = scenario[field]
      })
      return serializedScenario
    })
    return serializedScenarios
  }
}

export default ScenarioSerializer