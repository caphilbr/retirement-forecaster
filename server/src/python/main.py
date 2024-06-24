from produceScenario import produceScenario
from services.convertScenariosToJson import convertScenariosToJson

def run(scenarioInputs):
  scenarios = {}
  numberOfScenarios = scenarioInputs["stochConfig"]["numberOfScens"]
  for scenarioNumber in range(numberOfScenarios):
    scenarioName = f"scenario{scenarioNumber}"
    scenarioResult = produceScenario(scenarioInputs)
    scenarios[scenarioName] = scenarioResult
  jsonScenarios = convertScenariosToJson(scenarios)
  return jsonScenarios
