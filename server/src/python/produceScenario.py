from services.configureDataframe import configureDataframe
from services.withdrawAndRebalance import withdrawAndRebalance
from services.calcTaxRate import calcTaxRate
from services.getYields import getYields
from services.rebalance import rebalance
from services.applyYields import applyYields
from services.getInflationRate import getInflationRate
from services.canRetire import canRetire
from services.raisePercent import raisePercent
from services.calcSavings import calcSavings

def produceScenario(scenarioInputs):
  scenarioResult = configureDataframe(scenarioInputs)

  config = scenarioInputs["stochConfig"]
  portfolio = scenarioInputs["portfolio"]

  deathAge = config["deathAge"]
  targetRetAge = config["targetRetAge"]
  retSpendingDropPerc = config["retSpendingDropPerc"]
  savingsType = config["savingsType"]
  savingsPerc = config["savingsPerc"]

  age = portfolio["age"]
  mixReg = portfolio["mixReg"]
  mixRoth = portfolio["mixRoth"]
  isRetired = False

  initBalReg = portfolio["balanceReg"]
  initBalRoth = portfolio["balanceRoth"]
  initBalBank = portfolio["balanceBank"]
  initBalHomeEq = portfolio["balanceHomeEq"]
  initBalTotal = sum([initBalReg, initBalRoth, initBalBank, initBalHomeEq])

  salary = portfolio["salary"]
  expenses = portfolio["expenses"]
  savings = portfolio["annualSavings"]
  inflationRate = getInflationRate()
  raisePerc = raisePercent(inflationRate)
  taxRate = calcTaxRate(salary)
  taxes = salary * taxRate

  while age < deathAge:
    print('****************** at the start of the loop with age -> ', age, flush=True)
    print('****************** isRetired -> ', isRetired, flush=True)
    if not isRetired:
      begYrBalReg = initBalReg
      begYrBalRoth = initBalRoth
      begYrBalBank = initBalBank + savings
      begYrBalHomeEq = initBalHomeEq
      mixReg, mixRoth, begYrBalBank, begYrBalHomeEq = rebalance(
        begYrBalReg,
        begYrBalRoth,
        begYrBalBank,
        begYrBalHomeEq,
        age
      )
      withdrawals = 0
    else:
      (
        begYrBalReg,
        begYrBalRoth,
        begYrBalBank,
        begYrBalHomeEq,
        withdrawals,
        taxRate,
        taxes,
        mixReg,
        mixRoth
      ) = withdrawAndRebalance(
        initBalReg, initBalRoth, initBalBank, initBalHomeEq, expenses, age
      )
    begYrBalTotal = sum([begYrBalReg, begYrBalRoth, begYrBalBank, begYrBalHomeEq])

    yieldReg, yieldRoth, yieldBank, yieldHomeEq = getYields(mixReg, mixRoth, inflationRate)

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

    endYrBalTotal = sum([endYrBalReg, endYrBalRoth, endYrBalBank, endYrBalHomeEq])

    scenarioResult.loc[scenarioResult['age'] == age, [
      "isRetired",
      "initBalReg",
      "initBalRoth",
      "initBalBank",
      "initBalHomeEq",
      "initBalTotal",
      "salary",
      "withdrawals",
      "taxRate",
      "taxes",
      "expenses",
      "savings",
      "begYrBalReg",
      "begYrBalRoth",
      "begYrBalBank",
      "begYrBalHomeEq",
      "begYrBalTotal",
      "yieldReg",
      "yieldRoth",
      "yieldBank",
      "yieldHomeEq",
      "inflationRate",
      "raisePerc",
      "endYrBalReg",
      "endYrBalRoth",
      "endYrBalBank",
      "endYrBalHomeEq",
      "endYrBalTotal"]] = [
      isRetired,
      initBalReg,
      initBalRoth,
      initBalBank,
      initBalHomeEq,
      initBalTotal,
      salary,
      withdrawals,
      taxRate,
      taxes,
      expenses,
      savings,
      begYrBalReg,
      begYrBalRoth,
      begYrBalBank,
      begYrBalHomeEq,
      begYrBalTotal,
      yieldReg,
      yieldRoth,
      yieldBank,
      yieldHomeEq,
      inflationRate,
      raisePerc,
      endYrBalReg,
      endYrBalRoth,
      endYrBalBank,
      endYrBalHomeEq,
      endYrBalTotal]

    age += 1
    if age < deathAge:
      initBalReg = endYrBalReg
      initBalRoth = endYrBalRoth
      initBalBank = endYrBalBank
      initBalHomeEq = endYrBalHomeEq
      initBalTotal = sum([initBalReg, initBalRoth, initBalBank, initBalHomeEq])
      
      expenses *= (1 + inflationRate)

      if not isRetired:
        if (
          age >= 65
          or (age >= targetRetAge and canRetire(targetRetAge, age, endYrBalTotal, expenses))
        ):
          # retirement event, only happens once
          isRetired = True
          expenses *= (1 - retSpendingDropPerc)
          salary = 0
          savings = 0
        else:
          # just another year goes by
          salary *= (1 + raisePerc)
          taxRate = calcTaxRate(salary)
          taxes = salary * taxRate
          savings = calcSavings(savings, savingsType, savingsPerc, salary, taxes, expenses)

      inflationRate = getInflationRate()
      raisePerc = raisePercent(inflationRate)

  return scenarioResult

