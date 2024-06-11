const takeWithdrawal = (
  initBalReg,
  initBalRoth,
  initBalBank,
  initBalHomeEq,
  withdrawals
) => {
  let newRegBal = initBalReg
  let newRothBal = initBalRoth
  let newBankBal = initBalBank
  let newHomeEqBal = initBalHomeEq
  let remainingWithdrawals = withdrawals

  const bankWithdrawal = Math.min(newBankBal, remainingWithdrawals)
  newBankBal -= bankWithdrawal
  remainingWithdrawals -= bankWithdrawal

  const rothWithdrawal = Math.min(newRothBal, remainingWithdrawals)
  newRothBal -= rothWithdrawal
  remainingWithdrawals -= rothWithdrawal

  const regWithdrawal = Math.min(newRegBal, remainingWithdrawals)
  newRegBal -= regWithdrawal
  remainingWithdrawals -= regWithdrawal

  const homeWithdrawal = remainingWithdrawals
  newHomeEqBal -= homeWithdrawal
  remainingWithdrawals -= homeWithdrawal

  return { newRegBal, newRothBal, newBankBal, newHomeEqBal }
}

export default takeWithdrawal