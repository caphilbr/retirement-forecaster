import React, { useState } from "react"
import portfolioTotal from "./../utilities/portfolioTotal.js"
import ScenarioSummaryTile from "./ScenarioSummaryTile.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PortfolioTile = (props) => {
  const portfolio = props.portfolio
  const [showScenarios, setShowScenarios] = useState(false)

  const scenarioTiles = portfolio.scenarioInputs.map(scenarioInput => {
    const matchedScenarioOutput = portfolio.scenarioOutputs.filter(scenarioOutput => {
      
      return scenarioOutput.scenarioInputsId == scenarioInput.id
    })
    return <ScenarioSummaryTile scenarioInput={scenarioInput} scenarioOutput={matchedScenarioOutput[0]} key={scenarioInput.id} />
  })
  console.log(scenarioTiles)
  
  const toggleScenarios = () => {
    setShowScenarios(!showScenarios)
  }

  return (
    <div className="portfolio-tile">
      <table><tbody>
          <tr>
            <td>Portfolio Name:</td>
            <td className="portfolio-name">{portfolio.name}</td>
          </tr>
          <tr>
            <td>Balance:</td>
            <td>{portfolioTotal(portfolio)}</td>
          </tr>
      </tbody></table>
      <span className="hover-button" onClick={toggleScenarios}>
        Scenarios <FontAwesomeIcon icon="fas fa-chevron-circle-down" />
      </span>
      {showScenarios && scenarioTiles}
    </div>
  )
}

export default PortfolioTile