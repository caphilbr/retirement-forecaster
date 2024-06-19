import pandas as pd
import numpy as np

def configureDataframes(scenarioInputs):
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
    startYear = int(scenarioInputs["portfolio"]["date"][:4])
    age = int(scenarioInputs["portfolio"]["age"])
    numberOfScenarios = scenarioInputs["stochConfig"]["numberOfScens"]
    numberOfYears = (
        scenarioInputs["stochConfig"]["deathAge"] - scenarioInputs["portfolio"]["age"]
    )
    for scenario in range(numberOfScenarios):
        scenarioName = f"scenario{scenario}"
        data = np.full((numberOfYears, len(columns)), 0)
        df = pd.DataFrame(data, columns=columns)
        df["calYear"] = np.arange(startYear, startYear + numberOfYears)
        df["age"] = np.arange(age, age + numberOfYears)
        scenarios[scenarioName] = df
    return scenarios
