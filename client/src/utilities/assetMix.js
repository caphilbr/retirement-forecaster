const assetMix = (mixString) => {
  const mixArray = mixString.split("-")
  const cash = mixArray[0]/100
  const fixedIncome = mixArray[1]/100
  const equity = mixArray[2]/100
  return { cash, fixedIncome, equity }
}

export default assetMix