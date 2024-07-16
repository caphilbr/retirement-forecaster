from bankBalance import bankBalance

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
    regRothEqMix = min(1 - cashMix, targetEquityBalance / (begYrBalReg + begYrBalRoth))
  else:
    regRothEqMix = 0
  
  regRothFixedIncomeMix = 1 - cashMix - regRothEqMix

  mixReg["equity"] = regRothEqMix
  mixReg["fixedIncome"] = regRothFixedIncomeMix
  mixRoth["equity"] = regRothEqMix
  mixRoth["fixedIncome"] = regRothFixedIncomeMix

  transferToHomeEq = 0
  if begYrBalBank > bankBalance["max"]:
    transferToHomeEq = begYrBalBank - bankBalance["max"]
  if begYrBalBank < bankBalance["min"]:
    transferToHomeEq = -(bankBalance["min"] - begYrBalBank)
  updatedBegYrBalBank = begYrBalBank - transferToHomeEq
  updatedBegYrBalHomeEq = begYrBalHomeEq + transferToHomeEq

  return mixReg, mixRoth, updatedBegYrBalBank, updatedBegYrBalHomeEq