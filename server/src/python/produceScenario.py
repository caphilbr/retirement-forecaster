from services.configureDataframe import configureDataframe
from services.netCfAndRebalance import netCfAndRebalance

def produceScenario(scenarioInputs):
  scenarioResult = configureDataframe(scenarioInputs)

  config = scenarioInputs["stochConfig"]
  portfolio = scenarioInputs["portfolio"]

  deathAge = config["deathAge"]
  targetRetAge = config["targetRetAge"]
  retSpendingDropPerc = config["retSpendingDropPerc"]

  age = portfolio["age"]
  isRetired = False

  initBalReg = portfolio["balanceReg"]
  initBalRoth = portfolio["balanceRoth"]
  initBalBank = portfolio["balanceBank"]
  initBalHomeEq = portfolio["balanceHomeEq"]
  initBalTotal = sum([initBalReg, initBalRoth, initBalBank, initBalHomeEq])

  salary = portfolio["salary"]
  expenses = portfolio["expenses"]
  savings = portfolio["annualSavings"]

  while age < deathAge:
    (
      begYrBalReg,
      begYrBalRoth,
      begYrBalBank,
      begYrBalHomeEq,
      withdrawals,
      taxRate,
      taxes
    ) = netCfAndRebalance(
      initBalReg, initBalRoth, initBalBank, initBalHomeEq, savings - expenses
    )

    yieldReg, yieldRoth, yieldBank, yieldHomeEq = getYields()

    endYrBalReg, endYrBalRoth, endYrBalBank, endYrBalHomeEq = applyYields(
      begYrBalReg,
      begYrBalRoth,
      begYrBalBank,
      begYrBalHomeEq,
      yieldReg,
      yieldRoth,
      yieldBank,
      yieldHomeEq,
    )

    # persist all columns to the dataframe
    # scenarioResult.loc[scenarioResult["age"] == age, "colName"] = xyz

    age += 1
    if age < deathAge:
      initBalReg = endYrBalReg
      initBalRoth = endYrBalRoth
      initBalBank = endYrBalBank
      initBalHomeEq = endYrBalHomeEq
      initBalTotal = sum([initBalReg, initBalRoth, initBalBank, initBalHomeEq])

      inflationRate = # get infl rate
      expenses *= (1 + inflationRate)

      if not isRetired:
        if (
          age >= 65
          or (age >= targetRetAge and canRetire(age, endYrBalTotal))
        ):
          # retirement event, only happens once
          isRetired = True
          expenses *= (1 - retSpendingDropPerc)
          salary = 0
        else:
          # just another year goes by
          raisePerc = # get raise Perc
          salary *= (1 + raisePerc)
          savings = # determine savings

      # expenses (with drop if just retired), salary

  return scenarioResult

