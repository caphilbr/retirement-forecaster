def canRetire(targetRetAge, age, endYrBalTotal, expenses, deathAge):
    if age < targetRetAge:
        return False
    if age >= 70:
        return True

    annualYield = 0.04
    remainingYears = deathAge - age
    taxRate = 0.30

    requiredBalance = (
        expenses
        * (1 - (1 + annualYield) ** (-remainingYears))
        / annualYield
        / (1 - taxRate)
    )

    return endYrBalTotal >= requiredBalance
