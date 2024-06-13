const stochResults = (scenarios, targetRetAge) => {
  const numOfScens = scenarios.length

  const avgRetAge = 
    scenarios.reduce((sum, scenario) => sum + scenario.retAge, 0) /
    numOfScens
  const percRetAtTgt =
    scenarios.filter((scenario) => scenario.retAge == targetRetAge).length /
    numOfScens

  const avgBalAtDeath = 
    scenarios.reduce((sum, scenario) => sum + scenario.balanceAtDeath, 0) /
    numOfScens
  const percExhaust =
    scenarios.filter((scenario) => scenario.balanceAtDeath < 0).length /
    numOfScens

  const avgFrugalYrs = 
    scenarios.reduce((sum, scenario) => sum + scenario.numYrsFrugal, 0) /
    numOfScens
  const percFrugal =
    scenarios.filter((scenario) => scenario.numYrsFrugal > 0).length /
    numOfScens

  return {
    avgRetAge,
    avgBalAtDeath,
    avgFrugalYrs,
    percRetAtTgt,
    percExhaust,
    percFrugal,
  }
}

module.exports = stochResults
