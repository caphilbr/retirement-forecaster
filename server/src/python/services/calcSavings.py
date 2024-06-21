def calcSavings(savings, savingsType, savingsPerc, salary, taxes, expenses):
  if savingsType == "fixed":
    return savings
  if savingsType == "percent":
    return salary * savingsPerc
  if savingsType == "remainder":
    return salary - taxes - expenses