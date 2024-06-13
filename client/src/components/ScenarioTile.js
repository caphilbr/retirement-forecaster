import React from "react"
import formatCurrency from "../utilities/formatCurrency.js"

const ScenarioTile = (props) => {
  
  const handleShowProjection = () => {
    if (props.scenIdForProj == null) {
      props.setScenIdForProj(props.scenario.id)
    } else {
      props.setScenIdForProj(null)
    }
  }

  return (
    <div className="scenario-tile">
      <table><tbody>
        <tr>
          <td className="wide-scen-col">Ending Balance:</td>
          <td className="narrow-scen-col">{formatCurrency(props.scenario.balanceAtDeath,false)}</td>
        </tr>
        <tr>
          <td className="wide-scen-col">Retirement Age:</td>
          <td className="narrow-scen-col">{props.scenario.retAge}</td>
        </tr>
        <tr>
          <td className="wide-scen-col">Frugal Years:</td>
          <td className="narrow-scen-col">{props.scenario.numYrsFrugal}</td>
        </tr>
      </tbody></table>
      {props.scenIdForProj ?
        <span onClick={handleShowProjection} className="button-show-projection">Hide Projection</span>
      :
        <span onClick={handleShowProjection} className="button-show-projection">Show Projection</span>
      }
    </div>
  )
}

export default ScenarioTile