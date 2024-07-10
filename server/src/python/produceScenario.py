from services.configureDataframe import configureDataframe
from services.calcTaxRate import calcTaxRate
from services.getInflationRate import getInflationRate
from services.canRetire import canRetire
from services.raisePercent import raisePercent
from services.calcSavings import calcSavings
from classes.ScenarioYear import ScenarioYear
from classes.Balances import Balances
from services.columns import columns


def produceScenario(scenarioInputs):
    scenarioResult = configureDataframe(scenarioInputs)
    config = scenarioInputs["stochConfig"]
    portfolio = scenarioInputs["portfolio"]
    age = portfolio["age"]
    scenarioYear = ScenarioYear(scenarioResult, age)
    balances = Balances(portfolio)

    deathAge = config["deathAge"]
    targetRetAge = config["targetRetAge"]
    retSpendingDropPerc = config["retSpendingDropPerc"]
    savingsType = config["savingsType"]
    savingsPerc = config["savingsPerc"]
    isRetired = False
    salary = portfolio["salary"]
    expenses = portfolio["expenses"]
    inflationRate = getInflationRate()
    raisePerc = raisePercent(inflationRate)
    taxRate = calcTaxRate(salary)
    taxes = salary * taxRate
    savings = calcSavings(
        config["annualSavings"], savingsType, savingsPerc, salary, taxes, expenses
    )

    while age < deathAge:
        if not isRetired:
            balances.calcBegYrNotRetired(savings, age)
            withdrawals = 0
        else:
            withdrawals, taxRate, taxes = balances.calcBegYrRetired(expenses, age)

        yieldReg, yieldRoth, yieldBank, yieldHomeEq = balances.calcEndYr(
            inflationRate, taxRate
        )

        for column_name in columns:
            local_variables = locals()
            value = balances.getValue(column_name)
            if value == "noAttribute":
                value = local_variables[column_name]
            scenarioYear.setValue(age, column_name, value)

        age += 1
        if age < deathAge:
            balances.initNextYear()

            expenses *= 1 + inflationRate

            if not isRetired:
                if age >= 65 or (
                    age >= targetRetAge
                    and canRetire(
                        targetRetAge,
                        age,
                        balances.getValue("endYrBalTotal"),
                        expenses,
                        deathAge,
                    )
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
