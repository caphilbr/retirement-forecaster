const scenarioResults = (projectionYears) => {
  const numOfYears = projectionYears.length
  const retAge = projectionYears.find(year => year.isRetired).age
  const balanceAtDeath = projectionYears[numOfYears - 1].endYrBalTotal
  return {
    retAge,
    balanceAtDeath
  }
}

module.exports = scenarioResults