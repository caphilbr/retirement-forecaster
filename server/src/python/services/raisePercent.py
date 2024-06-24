import random
def raisePercent(inflationRate):

  realWageAvg = 0.005
  realWageStdDev = 0.0025
  realWageRaise = random.gauss(realWageAvg, realWageStdDev)
  
  return inflationRate + realWageRaise