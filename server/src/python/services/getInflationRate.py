import random

def getInflationRate(prevInflationRate=0.03):
    avgInflation = 0.03
    stdDevInflation = 0.02
    minInflationRate = prevInflationRate - 0.02
    maxInflationRate = prevInflationRate + 0.02
    return max(
        minInflationRate,
        min(maxInflationRate, random.gauss(avgInflation, stdDevInflation)),
    )
