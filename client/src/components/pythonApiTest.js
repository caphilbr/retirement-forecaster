import React, { useState, useEffect } from "react"

const pythonApiTest = () => {
  
  const [pythonData, setPythonData] = useState("nothing yet...")
  
  const getPython = async () => {
    try {
      const response = await fetch("/api/v1/test/python")
      const parsedData = await response.json()
      console.log(parsedData)
      setPythonData(parsedData.message)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPython()
  },[])

  return (
    <>
      <p>python api return this...</p>
      <p>{pythonData}</p>
    </>
  )
}

export default pythonApiTest