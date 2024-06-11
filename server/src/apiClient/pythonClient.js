import got from 'got'

class PythonClient {
  static async testPythonApi() {
    try {
      const url = `http://127.0.0.1:5000/api/data`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      const parsedBody = JSON.parse(responseBody)
      return { message: parsedBody.message }
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default PythonClient