import ProjectionYear from "../models/ProjectionYear.js"
import StochConfig from "../models/StochConfig.js"
import Scenario from "./../models/Scenario.js"

const convertPythonScenarios = async (rawScenarios, stochConfigsId) => {
  const scenariosInObject = {}
  for (let key in rawScenarios) {
    if (rawScenarios.hasOwnProperty(key)) {
      scenariosInObject[key] = JSON.parse(rawScenarios[key])
    }
  }

  for (const scenario of Object.keys(scenariosInObject)) {
    const newScenario = await Scenario.query().insertAndFetch({
      stochConfigsId: stochConfigsId,
    })
    const arrayOfYearObjects = scenariosInObject[scenario]
    for (const yearObject of arrayOfYearObjects) {
      yearObject.scenarioId = newScenario.id
    }
    await ProjectionYear.query().insertGraph(arrayOfYearObjects)
    await newScenario.getScenarioResults()
    await Scenario.query().findById(newScenario.id).patch(newScenario)
  }
  const stochConfig = await StochConfig.query().findById(stochConfigsId)
  await stochConfig.getStochResults()
  await StochConfig.query().findById(stochConfigsId).patch(stochConfig)
  return "tbd WIP" // right now there is nothing to return because it's just persisting to the database without a fetch
}

export default convertPythonScenarios
