from configureDataframes import configureDataframes

def run(stochConfig):
  testCall = configureDataframes(stochConfig)
  return testCall
  # scenariosSetup = configureDataframes(stochConfig)
  # scenarios = runAllScenarios(stochConfig, scenariosSetup)
  # updatedStochConfig = stochConfig
  # updatedStochConfig["scenarios"] = scenarios
  # print('test python print', flush=True)
  # return updatedStochConfig