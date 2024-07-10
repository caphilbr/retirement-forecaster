def applyYields(
  begYrBalReg,
  begYrBalRoth,
  begYrBalBank,
  begYrBalHomeEq,
  yieldReg,
  yieldRoth,
  yieldBank,
  yieldHomeEq,
  taxRate
):
  endYrBalReg = begYrBalReg * (1 + yieldReg)
  endYrBalRoth = begYrBalRoth * (1 + yieldRoth)
  endYrBalBank = begYrBalBank * (1 + yieldBank * (1 - taxRate))
  endYrBalHomeEq = begYrBalHomeEq * (1 + yieldHomeEq)

  return endYrBalReg, endYrBalRoth, endYrBalBank, endYrBalHomeEq
