import pandas as pd
import numpy as np

def configureDataframe(scenarioInputs):
    # scenarios = {}
    columns = [
        "calYear",
        "age",
        "isRetired",
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
    startYear = int(scenarioInputs["portfolio"]["date"][:4])
    age = int(scenarioInputs["portfolio"]["age"])
    # numberOfScenarios = scenarioInputs["stochConfig"]["numberOfScens"]
    numberOfYears = (
        scenarioInputs["stochConfig"]["deathAge"] - scenarioInputs["portfolio"]["age"]
    )
    # for scenario in range(numberOfScenarios):
        # scenarioName = f"scenario{scenario}"
    data = np.full((numberOfYears, len(columns)), 0)
    emptyScenarioDf = pd.DataFrame(data, columns=columns)
    emptyScenarioDf["calYear"] = np.arange(startYear, startYear + numberOfYears)
    emptyScenarioDf["age"] = np.arange(age, age + numberOfYears)
        # scenarios[scenarioName] = df
    return emptyScenarioDf
