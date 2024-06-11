import express from "express"
import PythonClient from "../../../apiClient/pythonClient.js"

const testRouter = new express.Router()

testRouter.get("/python", async (req, res) => {
  const response = await PythonClient.testPythonApi()
  console.log(response)
  res.status(200).json({ message: response.message })
})


testRouter.get("/", (req, res) => {
  res.send("hello from the root api")
})

export default testRouter
