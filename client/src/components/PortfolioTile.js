import React, { useState } from "react"
import portfolioTotal from "./../utilities/portfolioTotal.js"
import StochConfigTile from "./StochConfigTile.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PortfolioTile = (props) => {
  const portfolio = props.portfolio
  const [showConfigs, setShowConfigs] = useState(false)

  const configTiles = portfolio.stochConfigs.map((stochConfig) => {
    return (
      <StochConfigTile
        configIdForScens={props.configIdForScens}
        setConfigIdForScens={props.setConfigIdForScens}
        stochConfig={stochConfig}
        key={stochConfig.id}
      />
    )
  })

  const toggleScenarios = () => {
    setShowConfigs(!showConfigs)
  }

  return (
    <div className="portfolio-tile">
      <table>
        <tbody>
          <tr>
            <td>Portfolio Name:</td>
            <td className="portfolio-name">{portfolio.name}</td>
          </tr>
          <tr>
            <td>Balance:</td>
            <td>{portfolioTotal(portfolio)}</td>
          </tr>
        </tbody>
      </table>
      {!showConfigs ? (
        <span className="hover-button" onClick={toggleScenarios}>
          Stochastic Configurations{" "}
          <FontAwesomeIcon icon="fas fa-chevron-circle-down" />
        </span>
      ) : (
        <span className="hover-button" onClick={toggleScenarios}>
          Stochastic Configurations{" "}
          <FontAwesomeIcon icon="fas fa-chevron-circle-up" />
        </span>
      )}
      {showConfigs && configTiles}
    </div>
  )
}

export default PortfolioTile
