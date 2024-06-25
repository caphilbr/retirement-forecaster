import ProjectionYear from "../models/ProjectionYear.js"
import StochConfig from "../models/StochConfig.js"
import Scenario from "../models/Scenario.js"
import deleteScenarios from "./deleteScenarios.js"
import StochConfigSerializer from "../serializers/StochConfigSerializer.js"

const persistScenarios = async (rawScenarios, stochConfigsId) => {
  await deleteScenarios(stochConfigsId)
  
  const scenariosInObject = {}
  for (let key in rawScenarios) {
    if (rawScenarios.hasOwnProperty(key)) {
      scenariosInObject[key] = JSON.parse(rawScenarios[key])
    }
  }
  
  const updatedScenarios = []
  for (const scenario of Object.keys(scenariosInObject)) {
    const newScenario = await Scenario.query().insertAndFetch({
      stochConfigsId: stochConfigsId
    })
    const arrayOfYearObjects = scenariosInObject[scenario]
    for (const yearObject of arrayOfYearObjects) {
      yearObject.scenarioId = newScenario.id
    }
    await ProjectionYear.query().insertGraph(arrayOfYearObjects)
    await newScenario.getScenarioResults()
    await Scenario.query().findById(newScenario.id).patch(newScenario)
    const updatedScenario = await Scenario.query().findById(newScenario.id)
    updatedScenarios.push(updatedScenario)
  }
  const stochConfig = await StochConfig.query().findById(stochConfigsId)
  await stochConfig.getStochResults()
  await StochConfig.query().findById(stochConfigsId).patch(stochConfig)
  const updatedStochConfig = await StochConfig.query().findById(stochConfigsId)
  
  const serializedStochConfig = StochConfigSerializer.reRunConfig(updatedStochConfig, updatedScenarios)
  
  return { stochConfig: serializedStochConfig }
}

export default persistScenarios
