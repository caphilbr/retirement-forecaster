import ScenarioInput from "../models/ScenarioInput.js"

class ScenarioOutputSerializer {
  static dashboardData = async (scenarioInput) => {
    const allowedFields = [
      "id",
      "retAge",
      "numYrsFrugal",
      "exhaustAge",
      "balanceAtDeath",
      "scenarioInputsId"
    ]
    const fullScenarioInput = await ScenarioInput.query().findById(scenarioInput.id)
    const scenarioOutput = await fullScenarioInput.$relatedQuery("scenarioOutput")
    const serializedScenarioOutput = {}
    allowedFields.forEach(field => {
      serializedScenarioOutput[field] = scenarioOutput[field]
    })
    return serializedScenarioOutput
  }
}

export default ScenarioOutputSerializer