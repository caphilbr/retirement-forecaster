const showAssetMix = (assetMixObject) => {
  let  mixString = ""
  mixString += Math.round(100*assetMixObject.cash) + "% Cash, "
  mixString += Math.round(100*assetMixObject.fixedIncome) + "% FI, "
  mixString += Math.round(100*assetMixObject.equity) + "% Equity"
  return mixString
}

export default showAssetMix
