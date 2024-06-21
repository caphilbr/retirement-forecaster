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
  targetEquityBalance = (100 - age) / 100 * totalBalance
  regRothEqMix = min(0.99, targetEquityBalance / (begYrBalReg + begYrBalRoth))
  regRothFixedIncomeMix = 1 - cashMix - regRothEqMix

  mixReg["equity"] = regRothEqMix
  mixReg["fixedIncome"] = regRothFixedIncomeMix
  mixRoth["equity"] = regRothEqMix
  mixRoth["fixedIncome"] = regRothFixedIncomeMix

  return mixReg, mixRoth