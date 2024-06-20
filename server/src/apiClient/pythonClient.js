import got from "got"
import convertPythonScenarios from "../services/convertPythonScenarios.js"

class PythonClient {
  static async runScenario(scenarioInputs) {
    try {
      const url = `http://127.0.0.1:5000/api/v1/scenario`
      const gotOptions = {
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        json: scenarioInputs,
      }

      const response = await got(gotOptions)
      const parsedData = JSON.parse(response.body)
      const scenarios = await convertPythonScenarios(
        parsedData,
        scenarioInputs.stochConfig.id,
      )
      return { scenarios }
    } catch (error) {
      console.log("error in the python client api: ", error)
      return { error: error.message }
    }
  }
}

export default PythonClient
