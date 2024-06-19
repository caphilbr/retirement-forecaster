from configureDataframes import configureDataframes
from convertScenariosToJson import convertScenariosToJson

def run(scenarioInputs):
  scenarios = configureDataframes(scenarioInputs)
  jsonScenarios = convertScenariosToJson(scenarios)
  return jsonScenarios
  # scenariosSetup = configureDataframes(stochConfig)
  # scenarios = runAllScenarios(stochConfig, scenariosSetup)
  # updatedStochConfig = stochConfig
  # updatedStochConfig["scenarios"] = scenarios
  # print('test python print', flush=True)
  # return updatedStochConfig