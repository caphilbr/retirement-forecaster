import formatCurrency from "./formatCurrency.js"
import formatPercent from "./formatPercent.js"

const formatProjection = (projection) => {
  const skip = ["id", "scenarioId"]
  const percent = [
    "taxRate",
    "yieldReg",
    "yieldRoth",
    "yieldBank",
    "yieldHomeEq",
    "inflationRate",
    "raisePerc"
  ]
  const currency = [
    "initBalReg",
    "initBalRoth",
    "initBalBank",
    "initBalHomeEq",
    "initBalTotal",
    "salary",
    "withdrawals",
    "taxes",
    "expenses",
    "savings",
    "begYrBalReg",
    "begYrBalRoth",
    "begYrBalBank",
    "begYrBalHomeEq",
    "begYrBalTotal",
    "endYrBalReg",
    "endYrBalRoth",
    "endYrBalBank",
    "endYrBalHomeEq",
    "endYrBalTotal"
  ]
  const boolean = ["isRetired", "isFrugal"]

  const formattedProjection = projection.map(year => {
    const formattedYear = {}
    Object.keys(year).forEach(key => {
      if (percent.includes(key)) {
        formattedYear[key] = formatPercent(year[key])
      }
      else if (currency.includes(key)) {
        formattedYear[key] = formatCurrency(year[key],false)
      }
      else if (boolean.includes(key)) {
        formattedYear[key] = year[key]
      }
      else if (skip.includes(key)) {
      } else {
        formattedYear[key] = year[key]
      }

    })
    return formattedYear
  })
  return formattedProjection
}

export default formatProjection