def canRetire(targetRetAge, age, endYrBalTotal, expenses, deathAge):
  if age < targetRetAge:
    return False
  if age >= 70:
    return True
  
  annualYield = 0.035 # after-tax
  remainingYears = deathAge - age

  requiredBalance = expenses * (1 - (1 + annualYield)**(-remainingYears)) / annualYield

  return endYrBalTotal >= requiredBalance