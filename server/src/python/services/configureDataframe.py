import pandas as pd
import numpy as np
from services.columns import columns

def configureDataframe(scenarioInputs):
    allColumns = ["calYear", "age"] + columns
    startYear = int(scenarioInputs["portfolio"]["date"][:4])
    age = int(scenarioInputs["portfolio"]["age"])
    numberOfYears = (
        scenarioInputs["stochConfig"]["deathAge"] - scenarioInputs["portfolio"]["age"]
    )
    data = np.full((numberOfYears, len(allColumns)), 0)
    emptyScenarioDf = pd.DataFrame(data, columns=allColumns)
    emptyScenarioDf["calYear"] = np.arange(startYear, startYear + numberOfYears)
    emptyScenarioDf["age"] = np.arange(age, age + numberOfYears)
    return emptyScenarioDf
