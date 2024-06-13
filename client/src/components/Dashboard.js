import React, { useState, useEffect } from "react"
import PortfolioTile from "./PortfolioTile"
import ScenarioTile from "./ScenarioTile.js"
import getScenariosFromPortfolios from "../services/getScenariosFromPortfolios.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([])
  const [projection, setProjection] = useState([])
  const [configIdForScens, setConfigIdForScens] = useState(null)
  const [scenIdForProj, setScenIdForProj] = useState(null)

  const getPortfolios = async () => {
    try {
      const response = await fetch("/api/v1/portfolio")
      const parsedData = await response.json()
      setPortfolios(parsedData.portfolios)
    } catch (error) {
      console.log(error)
    }
  }

  const getProjection = async () => {
    try {
      const response = "??"
      const parsedData = await response.json()
      setProjection(parsedData.projection)
    } catch (error) {
      console.log(error)
    }
  }

  if(scenIdForProj) {
    getProjection()
  }
  
  useEffect(() => {
    getPortfolios()
  }, [])
  
  const portfolioTiles = portfolios.map((portfolio) => {
    return (
      <PortfolioTile
        portfolio={portfolio}
        configIdForScens={configIdForScens}
        setConfigIdForScens={setConfigIdForScens}
        key={portfolio.id}
      />
    )
  })

  let scenarioTiles = null
  if (configIdForScens) {
    const scenarios = getScenariosFromPortfolios(portfolios, configIdForScens)
    scenarioTiles = scenarios.map((scenario) => {
      return <ScenarioTile scenario={scenario} scenIdForProj={scenIdForProj} setScenIdForProj={setScenIdForProj} key={scenario.id} />
    })
  }

  const projectionDisplay = <p>some sort of iteration and table to display the projection years</p>

  return (
    <div className="background-color">
      <div className="grid-x grid-padding-x">
        <h1 className="cell small-12 dashboard-title">Retirement Forecaster</h1>
        <div className="dashboard-body">
          <div className="cell small-12 dashboard-container">
            <h3>
              <FontAwesomeIcon icon="fas fa-file-invoice-dollar" /> Portfolios
            </h3>
            <div className="cell small-12 horiz-overflow-container">
              {portfolioTiles}
            </div>
            <h5 className="add-button">
              <FontAwesomeIcon icon="fas fa-plus-circle" /> Add New Portfolio
            </h5>
          </div>
          <div className="cell small-12 dashboard-container">
            <h3>
              <FontAwesomeIcon icon="fas fa-clone" /> Scenarios
            </h3>
            <div className="cell small-2 horiz-overflow-container">
              {scenarioTiles}
            </div>
            <h5 className="add-button">
              <FontAwesomeIcon icon="fas fa-sliders-h" /> Sort/Filter Scenarios
            </h5>
          </div>
          <div className="cell small-12 dashboard-container">
            <h3>
              <FontAwesomeIcon icon="fas fa-receipt" /> Annual Projection
            </h3>
            <div className="cell small-2 horiz-overflow-container">
              {projectionDisplay}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
