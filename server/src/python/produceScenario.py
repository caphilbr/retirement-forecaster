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
from classes.ScenarioYear import ScenarioYear
from services.columns import columns


def produceScenario(scenarioInputs):
    scenarioResult = configureDataframe(scenarioInputs)
    
    config = scenarioInputs["stochConfig"]
    portfolio = scenarioInputs["portfolio"]
    age = portfolio["age"]
    scenarioYear = ScenarioYear(scenarioResult, age)

    deathAge = config["deathAge"]
    targetRetAge = config["targetRetAge"]
    retSpendingDropPerc = config["retSpendingDropPerc"]
    savingsType = config["savingsType"]
    savingsPerc = config["savingsPerc"]

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
        if not isRetired:
            begYrBalReg = initBalReg
            begYrBalRoth = initBalRoth
            begYrBalBank = initBalBank + savings
            begYrBalHomeEq = initBalHomeEq
            mixReg, mixRoth, begYrBalBank, begYrBalHomeEq = rebalance(
                begYrBalReg, begYrBalRoth, begYrBalBank, begYrBalHomeEq, age
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
                mixRoth,
            ) = withdrawAndRebalance(
                initBalReg, initBalRoth, initBalBank, initBalHomeEq, expenses, age
            )
        begYrBalTotal = sum([begYrBalReg, begYrBalRoth, begYrBalBank, begYrBalHomeEq])

        yieldReg, yieldRoth, yieldBank, yieldHomeEq = getYields(
            mixReg, mixRoth, inflationRate
        )

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

        for column_name in columns:
          local_variables = locals()
          value = local_variables[column_name]
          scenarioYear.setValue(age, column_name, value)

        age += 1
        if age < deathAge:
            initBalReg = endYrBalReg
            initBalRoth = endYrBalRoth
            initBalBank = endYrBalBank
            initBalHomeEq = endYrBalHomeEq
            initBalTotal = sum([initBalReg, initBalRoth, initBalBank, initBalHomeEq])

            expenses *= 1 + inflationRate

            if not isRetired:
                if age >= 65 or (
                    age >= targetRetAge
                    and canRetire(targetRetAge, age, endYrBalTotal, expenses)
                ):
                    # retirement event, only happens once
                    isRetired = True
                    expenses *= 1 - retSpendingDropPerc
                    salary = 0
                    savings = 0
                else:
                    # just another year goes by
                    salary *= 1 + raisePerc
                    taxRate = calcTaxRate(salary)
                    taxes = salary * taxRate
                    savings = calcSavings(
                        savings, savingsType, savingsPerc, salary, taxes, expenses
                    )

            inflationRate = getInflationRate()
            raisePerc = raisePercent(inflationRate)

    return scenarioResult
