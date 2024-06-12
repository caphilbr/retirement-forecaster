import formatCurrency from "./formatCurrency"

const portfolioTotal = (portfolio) => {
  const total = 
    portfolio.balanceReg +
    portfolio.balanceRoth +
    portfolio.balanceBank +
    portfolio.balanceHomeEq
  
  return formatCurrency(total, false)
}

export default portfolioTotal
