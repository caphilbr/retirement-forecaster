import random
def getInflationRate():
  avgInflation = 0.03
  stdDevInflation = 0.02
  return random.gauss(avgInflation, stdDevInflation)