
class ScenarioSerializer {
  static dashboardData = (scenarios) => {
    const allowedFields = [
      "id",
      "retAge",
      "balanceAtDeath"
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