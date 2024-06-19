def convertScenariosToJson(dictOfDf):

  jsonDictOfDf = {}
  for key, df in dictOfDf.items():
    jsonDictOfDf[key] = df.to_json(orient="records")


  return jsonDictOfDf