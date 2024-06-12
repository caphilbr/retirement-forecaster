import React from "react"
import formatCurrency from "../utilities/formatCurrency"

const ScenarioSummaryTile = (props) => {
  const scenarioInput = props.scenarioInput
  const scenarioOutput = props.scenarioOutput

  let resultBoolean = <span className="success">SUCCESS!</span>
  if (scenarioOutput.balanceAtDeath < 0) {
    resultBoolean = <span className="fail">FAIL!</span>
  }
  
  const inputs = (
    <div className="inputs-summary">
      <p className="scenario-header">Inputs</p>
      <table><tbody>
        <tr>
          <td className="wide">Target Retirement Age:</td>
          <td className="narrow">{scenarioInput.targetRetAge}</td>
        </tr>
        <tr>
          <td className="wide">Death Age:</td>
          <td className="narrow">{scenarioInput.deathAge}</td>
        </tr>
        <tr>
          <td className="wide">Savings Type:</td>
          <td className="narrow">{scenarioInput.savingsType}</td>
        </tr>
        <tr>
          <td className="wide">Expense Drop @ Retirement:</td>
          <td className="narrow">{scenarioInput.retSpendingDropPerc}</td>
        </tr>
      </tbody></table>
    </div>
  )

  const results = (
    <div className="inputs-summary">
      <span className="scenario-header">Results</span>{resultBoolean}
      <table><tbody>
        <tr>
          <td className="wide">Actual Retirement Age:</td>
          <td className="narrow">{scenarioOutput.retAge}</td>
        </tr>
        <tr>
          <td className="wide">Excess Funds:</td>
          <td className="narrow">{formatCurrency(scenarioOutput.balanceAtDeath, false)}</td>
        </tr>
        <tr>
          <td className="wide">Fund Exhaust Age:</td>
          <td className="narrow">{scenarioOutput.exhaustAge > 0 ? scenarioOutput.exhaustAge : "n/a"}</td>
        </tr>
        <tr>
          <td className="wide">Frugal Years:</td>
          <td className="narrow">{scenarioOutput.numYrsFrugal}</td>
        </tr>
      </tbody></table>
    </div>
  )
  
  
  return(
    <div className="grid-x scenario-summary-tile">
      <div className="cell small-6">
        {inputs}
      </div>
      <div className="cell small-6">
        {results}
      </div>
    </div>
  )
}

export default ScenarioSummaryTile


//       "scenarioInputs": [
//         {
//           "id": "1",
//           "targetRetAge": 58,
//           "deathAge": 95,
//           "savingsType": "fixed",
//           "savingsPerc": 0.05,
//           "retSpendingDropPerc": 0.1
//         },
//       "scenarioOutputs": [
//         {
//           "id": "1",
//           "retAge": 58,
//           "numYrsFrugal": 0,
//           "exhaustAge": 90,
//           "balanceAtDeath": -790008.94
//         },
