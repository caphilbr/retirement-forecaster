import warnings

warnings.filterwarnings("ignore", category=FutureWarning)

class ScenarioYear:
    def __init__(self, scenarioResultDf, age):
        self.df = scenarioResultDf
        self.num_columns = len(self.df.columns)
        self.column_names = self.df.columns.tolist()
        self.values = [self.df.loc[self.df["age"] == age, "calYear"].iloc[0], age] + [
            None
        ] * (self.num_columns - 2)

    def setValue(self, age, column_name, value):
        column_index = self.column_names.index(column_name)
        self.values[column_index] = value
        self.df.loc[self.df["age"] == age, column_name] = value
