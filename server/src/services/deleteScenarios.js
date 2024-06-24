import Scenario from "../models/Scenario.js"
import ProjectionYear from "../models/ProjectionYear.js"

const deleteScenarios = async (stochConfigsId) => {
  const scenarios = await Scenario.query().where({
    stochConfigsId: stochConfigsId
  })
  for (const scenario of scenarios) {
    await ProjectionYear.query().delete().where({ scenarioId: scenario.id })
  }
  await Scenario.query().delete().where({ stochConfigsId: stochConfigsId })
}

export default deleteScenarios