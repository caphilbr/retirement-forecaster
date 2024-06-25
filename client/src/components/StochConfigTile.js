import React from "react"
import formatCurrency from "../utilities/formatCurrency"

const StochConfigTile = (props) => {
  const stochConfig = props.stochConfig

  const handleShowScenarios = () => {
    if (
      props.configIdForScens == null ||
      props.configIdForScens != stochConfig.id
    ) {
      props.setConfigIdForScens(stochConfig.id)
    } else {
      props.setConfigIdForScens(null)
    }
  }

  const runConfig = async () => {
    try {
      const response = await fetch("/api/v1/scenario", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ stochConfigId: stochConfig.id }),
      })
      const parsedData = await response.json()
      props.populateProjection(null)
      props.resetStochConfig(parsedData.stochConfig)
    } catch(error) {
      console.log("error running configuration scenarios: ", error)
    }
  }

  const config = (
    <div>
      <p className="config-header">Configuration</p>
      <table>
        <tbody>
          <tr>
            <td className="wide-config-col">Target Retirement Age:</td>
            <td className="narrow-config-col">{stochConfig.targetRetAge}</td>
          </tr>
          <tr>
            <td className="wide-config-col">Number of Scenarios:</td>
            <td className="narrow-config-col">{stochConfig.numberOfScens}</td>
          </tr>
          <tr>
            <td className="wide-config-col">Death Age:</td>
            <td className="narrow-config-col">{stochConfig.deathAge}</td>
          </tr>
          <tr>
            <td className="wide-config-col">Savings Type:</td>
            <td className="narrow-config-col">{stochConfig.savingsType}</td>
          </tr>
          <tr>
            <td className="wide-config-col">Expense Drop @ Retirement:</td>
            <td className="narrow-config-col">
              {(stochConfig.retSpendingDropPerc * 100).toFixed(0)}%
            </td>
          </tr>
        </tbody>
      </table>
      {!stochConfig.avgRetAge ? null : props.configIdForScens ===
        stochConfig.id ? (
        <span
          onClick={handleShowScenarios}
          className="button-show-scenarios-hide"
        >
          Hide Scenarios
        </span>
      ) : (
        <span onClick={handleShowScenarios} className="button-show-scenarios">
          Show Scenarios
        </span>
      )}
      <span className="button-run-config" onClick={runConfig}>
          Run Configuration
      </span>
    </div>
  )

  let results
  if (!stochConfig.avgRetAge) {
    results = null
  } else {
    results = (
      <div>
        <p className="config-header">Results</p>
        <table>
          <tbody>
            <tr>
              <td className="wide-config-col">Average Retirement Age:</td>
              <td className="narrow-config-col">
                {stochConfig.avgRetAge.toFixed(0)}
              </td>
            </tr>
            <tr>
              <td className="wide-config-col">Average Excess Funds:</td>
              <td className="narrow-config-col">
                {formatCurrency(stochConfig.avgBalAtDeath, false)}
              </td>
            </tr>
            <tr>
              <td className="wide-config-col">Chance of Ret at Tgt Age:</td>
              <td className="narrow-config-col">
                {(stochConfig.percRetAtTgt * 100).toFixed(0)}%
              </td>
            </tr>
            <tr>
              <td className="wide-config-col">Chance of Fund Exhaustion:</td>
              <td className="narrow-config-col">
                {(stochConfig.percExhaust * 100).toFixed(0)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="grid-x config-summary-tile">
      <div className="cell small-6">{config}</div>
      <div className="cell small-6">{results}</div>
    </div>
  )
}

export default StochConfigTile
