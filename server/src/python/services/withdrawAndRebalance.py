from calcTaxRate import calcTaxRate
from rebalance import rebalance

def withdrawAndRebalance(
      initBalReg, initBalRoth, initBalBank, initBalHomeEq, expenses, age
    ):
  
  begYrBalReg = initBalReg
  begYrBalRoth = initBalRoth
  begYrBalBank = initBalBank
  begYrBalHomeEq = initBalHomeEq
  remainingExpenses = expenses

  bankWithdrawal = min(begYrBalBank, remainingExpenses)
  begYrBalBank -= bankWithdrawal
  remainingExpenses -= bankWithdrawal

  rothWithdrawal = min(begYrBalRoth, remainingExpenses)
  begYrBalRoth -= rothWithdrawal
  remainingExpenses -= rothWithdrawal

  taxRate = 0
  taxes = 0
  regWithdrawal = 0
  if remainingExpenses > 0:
    taxRate = calcTaxRate(remainingExpenses)
    preTaxRemainingExpenses = remainingExpenses / (1 - taxRate)
    regWithdrawal = min(begYrBalReg, preTaxRemainingExpenses)
    begYrBalReg -= regWithdrawal
    remainingExpenses -= regWithdrawal * (1 - taxRate)
    taxes = regWithdrawal * taxRate

  homeWithdrawal = remainingExpenses
  begYrBalHomeEq -= homeWithdrawal
  remainingExpenses = 0
  
  mixReg, mixRoth, begYrBalBank, begYrBalHomeEq = rebalance(
    begYrBalReg,
    begYrBalRoth,
    begYrBalBank,
    begYrBalHomeEq,
    age
  )
  
  withdrawals = bankWithdrawal + rothWithdrawal + regWithdrawal + homeWithdrawal

  return (
      begYrBalReg,
      begYrBalRoth,
      begYrBalBank,
      begYrBalHomeEq,
      withdrawals,
      taxRate,
      taxes,
      mixReg,
      mixRoth
    )