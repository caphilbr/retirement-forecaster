const formatCurrency = (number, showCents=true) => {
  if (showCents) {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
  const integer = Math.round(number)
  return integer.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export default formatCurrency