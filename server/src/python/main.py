from services.convertScenariosToJson import convertScenariosToJson
from produceScenario import produceScenario

def run(scenarioInputs):
  # scenarios = configureDataframes(scenarioInputs)
  scenarios = {}
  numberOfScenarios = scenarioInputs["stochConfig"]["numberOfScens"]
  for scenarioNumber in range(numberOfScenarios):
    scenarioName = f"scenario{scenarioNumber}"
    scenarioResult = produceScenario(scenarioInputs)
    scenarios[scenarioName] = scenarioResult
  print("python scens before jsonifying", scenarios, flush=True)
  jsonScenarios = convertScenariosToJson(scenarios)
  return jsonScenarios
  # scenariosSetup = configureDataframes(stochConfig)
  # scenarios = runAllScenarios(stochConfig, scenariosSetup)
  # updatedStochConfig = stochConfig
  # updatedStochConfig["scenarios"] = scenarios
  # print('test python print', flush=True)
  # return updatedStochConfig