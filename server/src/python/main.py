from produceScenario import produceScenario
from services.convertScenariosToJson import convertScenariosToJson

def run(scenarioInputs):
  scenarios = {}
  numberOfScenarios = scenarioInputs["stochConfig"]["numberOfScens"]
  for scenarioNumber in range(numberOfScenarios):
    scenarioName = f"scenario{scenarioNumber}"
    scenarioResult = produceScenario(scenarioInputs)
    scenarios[scenarioName] = scenarioResult
    fileName = f"scenario{scenarioNumber}.csv"
    scenarioResult.to_csv(fileName,index=False)
  print("python scens before jsonifying", scenarios, flush=True)
  jsonScenarios = convertScenariosToJson(scenarios)
  return jsonScenarios
