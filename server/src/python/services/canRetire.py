def canRetire(targetRetAge, age, endYrBalTotal, expenses, deathAge, inflationRate):
    if age < targetRetAge:
        return False
    if age >= 70:
        return True

    annualYield = 0.03
    remainingYears = deathAge - age
    taxRate = 0.30

    requiredBalance = (
        expenses
        * (1 + inflationRate) ** (remainingYears / 2)
        * (1 - (1 + annualYield) ** (-remainingYears))
        / annualYield
        / (1 - taxRate)
    )

    return endYrBalTotal >= requiredBalance
