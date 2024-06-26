const sortScenarios = (scenarios, sortType) => {
  if (sortType == "highBalance") {
    scenarios.sort((a,b) => b.balanceAtDeath - a.balanceAtDeath)
    return scenarios
  }
  if (sortType == "lowBalance") {
    scenarios.sort((a,b) => a.balanceAtDeath - b.balanceAtDeath)
    return scenarios
  }
  if (sortType == "oldestRet") {
    scenarios.sort((a,b) => b.retAge - a.retAge)
    return scenarios
  }
  if (sortType == "youngestRet") {
    scenarios.sort((a,b) => a.retAge - b.retAge)
    return scenarios
  }
}

export default sortScenarios