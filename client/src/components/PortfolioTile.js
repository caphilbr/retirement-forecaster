import React, { useState } from "react"
import portfolioTotal from "./../utilities/portfolioTotal.js"
import formatCurrency from "../utilities/formatCurrency.js"
import showAssetMix from "../utilities/showAssetMix.js"
import StochConfigTile from "./StochConfigTile.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PortfolioTile = (props) => {
  const portfolio = props.portfolio
  const [showConfigs, setShowConfigs] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  let configTiles = portfolio.stochConfigs.map((stochConfig) => {
    return (
      <StochConfigTile
        configIdForScens={props.configIdForScens}
        setConfigIdForScens={props.setConfigIdForScens}
        stochConfig={stochConfig}
        key={stochConfig.id}
      />
    )
  })

  if (configTiles.length > 0) {
    configTiles = [
      <h6 className="add-config-button">
        <FontAwesomeIcon icon="fas fa-plus-circle" /> Add Configuration
      </h6>,
      ...configTiles
    ]
  }

  const portfolioDetails = (
    <table><tbody>
      <tr>
        <td>Salary:</td>
        <td>{formatCurrency(portfolio.salary, false)}</td>
        <td></td>
      </tr>
      <tr>
        <td>Expenses:</td>
        <td>{formatCurrency(portfolio.expenses, false)}</td>
        <td></td>
      </tr>
      <tr>
        <td>Registered Savings:</td>
        <td>{formatCurrency(portfolio.balanceReg, false)}</td>
        <td>({showAssetMix(portfolio.mixReg)})</td>
      </tr>
      <tr>
        <td>Roth Savings:</td>
        <td>{formatCurrency(portfolio.balanceRoth, false)}</td>
        <td>({showAssetMix(portfolio.mixRoth)})</td>
      </tr>
      <tr>
        <td>Bank Savings:</td>
        <td>{formatCurrency(portfolio.balanceBank, false)}</td>
        <td></td>
      </tr>
      <tr>
        <td>Home Equity:</td>
        <td>{formatCurrency(portfolio.balanceHomeEq, false)}</td>
        <td></td>
      </tr>

  </tbody></table>

  )

  const toggleScenarios = () => {
    setShowConfigs(!showConfigs)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
      {!showDetails ? (
        <span className="hover-button" onClick={toggleDetails}>
          Show Portfolio Details{" "}
          <FontAwesomeIcon icon="fas fa-chevron-circle-down" />
        </span>
      ) : (
        <span className="hover-button" onClick={toggleDetails}>
          Hide Details{" "}
          <FontAwesomeIcon icon="fas fa-chevron-circle-up" />
        </span>
      )}
      {showDetails && portfolioDetails}
      {!showConfigs ? (
        <>
          <br/><span className="hover-button" onClick={toggleScenarios}>
            Stochastic Configurations{" "}
            <FontAwesomeIcon icon="fas fa-chevron-circle-down" />
          </span>
        </>
      ) : (
        <>
          <br/><span className="hover-button" onClick={toggleScenarios}>
            Stochastic Configurations{" "}
            <FontAwesomeIcon icon="fas fa-chevron-circle-up" />
          </span>
        </>
      )}
      {showConfigs && configTiles}
    </div>
  )
}

export default PortfolioTile
