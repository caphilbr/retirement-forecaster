import ProjectionYear from "../models/ProjectionYear.js"
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
      retAge: 65,
      numYrsFrugal: 0,
      balanceAtDeath: 0,
      stochConfigsId: stochConfigsId,
    })
    const arrayOfYearObjects = scenariosInObject[scenario]
    for (const yearObject of arrayOfYearObjects) {
      yearObject.scenarioId = newScenario.id
    }
    await ProjectionYear.query().insertGraph(arrayOfYearObjects)
  }
  // create new method to populate Scenario with results from the years
  // call on the StochConfig method to get the summary results from the scenarios
  return "tbd WIP"
}

export default convertPythonScenarios
