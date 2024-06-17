import React, { useState, useEffect } from "react"
import PortfolioTile from "./PortfolioTile"
import ScenarioTile from "./ScenarioTile.js"
import Projection from "./Projection.js"
import NewPortfolioForm from "./NewPortfolioForm.js"
import getScenariosFromPortfolios from "../services/getScenariosFromPortfolios.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([])
  const [projection, setProjection] = useState([])
  const [configIdForScens, setConfigIdForScens] = useState(null)
  const [scenIdForProj, setScenIdForProj] = useState(null)
  const [showNewPorfolio, setShowNewPortfolio] = useState(false)

  const getPortfolios = async () => {
    try {
      const response = await fetch("/api/v1/portfolio")
      const parsedData = await response.json()
      setPortfolios(parsedData.portfolios)
    } catch (error) {
      console.log(error)
    }
  }

  const getProjection = async (scenarioId) => {
    try {
      const response = await fetch(`/api/v1/projection/${scenarioId}`)
      const parsedData = await response.json()
      setProjection(parsedData.projection)
    } catch (error) {
      console.log(error)
    }
  }

  const populateProjection = (scenarioId) => {
    setScenIdForProj(scenarioId)
    if (scenarioId == null || configIdForScens == null) {
      setProjection([])
    } else {
      getProjection(scenarioId)
    }
  }

  useEffect(() => {
    getPortfolios()
  }, [])

  const toggleNewPortfolio = () => {
    setShowNewPortfolio(!showNewPorfolio)
  }


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

  let projectionDisplay = "No scenario selected"  
  if (scenIdForProj && configIdForScens) {
    projectionDisplay = <Projection projection={projection} />
  }


  let scenarioTiles = "No configuration selected"
  if (configIdForScens) {
    const scenarios = getScenariosFromPortfolios(portfolios, configIdForScens)
    scenarioTiles = scenarios.map((scenario) => {
      return <ScenarioTile scenario={scenario} scenIdForProj={scenIdForProj} populateProjection={populateProjection} key={scenario.id} />
    })
  }

  return (
    <div className="background-color">
      {showNewPorfolio ? <NewPortfolioForm toggleNewPortfolio={toggleNewPortfolio}/> : null}
      {/* {showNewPorfolio ? <NewPortfolioForm /> : null} */}
      <div className="grid-x grid-padding-x">
        <h1 className="cell small-12 dashboard-title">Retirement Forecaster</h1>
        <div className="dashboard-body">
          <div className="cell small-12 dashboard-container">
            <h3>
              <FontAwesomeIcon icon="fas fa-file-invoice-dollar" /> Portfolios
            </h3>
            <h5 className="add-portfolio-button" onClick={toggleNewPortfolio}>
              <FontAwesomeIcon icon="fas fa-plus-circle" /> Add Portfolio
            </h5>
            <div className="cell small-12 horiz-overflow-container">
              {portfolioTiles}
            </div>
          </div>
          <div className="cell small-12 dashboard-container">
            <h3>
              <FontAwesomeIcon icon="fas fa-clone" /> Scenarios
            </h3>
            <div className="cell small-2 horiz-overflow-container">
              {scenarioTiles}
            </div>
            <h5 className="add-portfolio-button">
              <FontAwesomeIcon icon="fas fa-sliders-h" /> Sort/Filter Scenarios
            </h5>
          </div>
          <div className="cell small-12 dashboard-container">
            <h3>
              <FontAwesomeIcon icon="fas fa-receipt" /> Annual Projection
            </h3>
            <div className="cell small-2 horiz-overflow-container projection-container">
              {projectionDisplay}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
