def netCfAndRebalance(
      initBalReg, initBalRoth, initBalBank, initBalHomeEq, netCf
    ):
  if netCf > 0: # savings
    begYrBalBank = initBalBank + netCf
  else: # withdrawals
    expenses = -netCf
##
## Take a simple approach first... withdraw in this order...
# Bank
# Roth
# Reg
# HomeEq

  regWithdrawal * (1 - taxRate) + rothWithdrawal + bankWithdrawal + homeEqWithdrawal = expenses

  return begYrBalReg,
      begYrBalRoth,
      begYrBalBank,
      begYrBalHomeEq,
      withdrawals,
      taxRate,
      taxes