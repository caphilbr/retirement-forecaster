def rebalance(
    begYrBalReg,
    begYrBalRoth,
    begYrBalBank,
    begYrBalHomeEq,
    age
  ):

  cashMix = 0.01
  mixReg = {"cash": cashMix}
  mixRoth = {"cash": cashMix}
  
  totalBalance = begYrBalReg + begYrBalRoth + begYrBalBank + begYrBalHomeEq
  if totalBalance > 0:
    targetEquityBalance = (100 - age) / 100 * totalBalance
  else:
    targetEquityBalance = 0
    
  if (begYrBalReg + begYrBalRoth) > 0:
    regRothEqMix = min(0.99, targetEquityBalance / (begYrBalReg + begYrBalRoth))
  else:
    regRothEqMix = 0
  
  regRothFixedIncomeMix = 1 - cashMix - regRothEqMix

  mixReg["equity"] = regRothEqMix
  mixReg["fixedIncome"] = regRothFixedIncomeMix
  mixRoth["equity"] = regRothEqMix
  mixRoth["fixedIncome"] = regRothFixedIncomeMix

  maxBankBalance = 300000
  minBankBalance = 100000
  transferToHomeEq = 0
  if begYrBalBank < minBankBalance:
    transferToHomeEq = begYrBalBank - minBankBalance
  if begYrBalBank > maxBankBalance:
    transferToHomeEq = begYrBalBank - maxBankBalance
  begYrBalBank -= transferToHomeEq
  begYrBalHomeEq += transferToHomeEq

  return mixReg, mixRoth, begYrBalBank, begYrBalHomeEq