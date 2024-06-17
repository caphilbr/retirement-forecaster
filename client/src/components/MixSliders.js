import React, { useState } from "react"
import assetMix from "../utilities/assetMix"

const MixSliders = (props) => {
  const { cash, fixedIncome, equity } = assetMix(props.mix)
  const [mix, setMix] = useState({
    equity: Math.floor(equity * 100),
    fixedIncome: Math.floor(fixedIncome * 100),
    cash: Math.floor(cash * 100),
  })

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    const dynamicMix = {
      equity: mix.equity,
      fixedIncome: mix.fixedIncome,
      cash: mix.cash,
    }
    if (name == "equity") {
      dynamicMix.equity = value
      if (value > 100 - dynamicMix.cash) {
        dynamicMix.fixedIncome = 100 - value
        dynamicMix.cash = 0
      } else {
        dynamicMix.fixedIncome = 100 - dynamicMix.cash - value
      }
    }
    if (name == "fixedIncome") {
      dynamicMix.fixedIncome = value
      if (value > 100 - dynamicMix.cash) {
        dynamicMix.cash = 0
        dynamicMix.equity = 100 - value
      } else {
        dynamicMix.equity = 100 - dynamicMix.cash - value
      }
    }
    if (name == "cash") {
      dynamicMix.cash = value
      if (value > 100 - dynamicMix.fixedIncome) {
        dynamicMix.equity = 0
        dynamicMix.fixedIncome = 100 - value
      } else {
        dynamicMix.equity = 100 - dynamicMix.fixedIncome - value
      }
    }
    dynamicMix.equity = parseInt(dynamicMix.equity)
    dynamicMix.fixedIncome = parseInt(dynamicMix.fixedIncome)
    dynamicMix.cash = parseInt(dynamicMix.cash)
    setMix(dynamicMix)
    props.setMixState(
      `${mix.cash}-${mix.fixedIncome}-${mix.equity}`,
      props.account,
    )
  }

  return (
    <>
      <label htmlFor="equity">Equity:</label>
      <input
        type="range"
        id="equity"
        name="equity"
        min="0"
        max="100"
        value={mix.equity}
        onChange={handleChange}
      />
      <span>{mix.equity}%</span>

      <label htmlFor="fixedIncome">Fixed Income:</label>
      <input
        type="range"
        id="fixedIncome"
        name="fixedIncome"
        min="0"
        max="100"
        value={mix.fixedIncome}
        onChange={handleChange}
      />
      <span>{mix.fixedIncome}%</span>

      <label htmlFor="cash">Cash:</label>
      <input
        type="range"
        id="cash"
        name="cash"
        min="0"
        max="100"
        value={mix.cash}
        onChange={handleChange}
      />
      <span>{mix.cash}%</span>
    </>
  )
}

export default MixSliders
