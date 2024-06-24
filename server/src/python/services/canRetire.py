def canRetire(targetRetAge, age, endYrBalTotal, expenses):
  if age < targetRetAge:
    return False
  if age >= 70:
    return True
  
  annualYield = 0.05
  remainingYears = 95 - age

  requiredBalance = expenses * (1 - (1 + annualYield)**(-remainingYears)) / annualYield

  return endYrBalTotal >= requiredBalance