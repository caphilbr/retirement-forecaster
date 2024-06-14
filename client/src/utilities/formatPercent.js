const formatPercent = (num) => {
  const percentage = (num * 100).toFixed(1)
  return `${percentage}%`
}

export default formatPercent