import got from "got"

class PythonClient {
  static async runScenario(stochConfig) {
    try {
      const url = `http://127.0.0.1:5000/api/v1/scenario`
      const gotOptions = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
        json: stochConfig
      }
      
      const apiResponse = await got(gotOptions)
      const responseBody = apiResponse.body
      const parsedBody = JSON.parse(responseBody)
      console.log('api client parsedBody', parsedBody)
      return { message: parsedBody.message }
    } catch (error) {
      console.log('error in the python client api: ', error)
      return { error: error.message }
    }
  }
}

export default PythonClient
