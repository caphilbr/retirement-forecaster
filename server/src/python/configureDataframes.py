import pandas as pd
import numpy as np

def configureDataframes(stochConfig):
    scenarios = {}
    columns = [
        "calYear",
        "age",
        "isRetired",
        "isFrugal",
        "initBalReg",
        "initBalRoth",
        "initBalBank",
        "initBalHomeEq",
        "initBalTotal",
        "salary",
        "withdrawals",
        "taxRate",
        "taxes",
        "expenses",
        "savings",
        "begYrBalReg",
        "begYrBalRoth",
        "begYrBalBank",
        "begYrBalHomeEq",
        "begYrBalTotal",
        "yieldReg",
        "yieldRoth",
        "yieldBank",
        "yieldHomeEq",
        "inflationRate",
        "raisePerc",
        "endYrBalReg",
        "endYrBalRoth",
        "endYrBalBank",
        "endYrBalHomeEq",
        "endYrBalTotal",
    ]
    numberOfScenarios = stochConfig["numberOfScens"]
    numberOfYears = stochConfig["deathAge"] - stochConfig["age"]
    for scenario in range(numberOfScenarios):
      scenarioName = f'scenario{scenario}'
      yearsData = np.nan * np.empty((numberOfYears, len(columns)))
      scenarios[scenarioName] = pd.DataFrame(yearsData, columns=columns)
    return scenarios
