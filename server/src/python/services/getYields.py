import random
from yieldAssumptions import (
    avgEquity,
    stdDevEquity,
    avgFixedIncome,
    stdDevFixedIncome,
    avgBankVsInflation,
    stdDevBank,
    avgHomeEq,
    stdDevHomeEq,
)


def getYields(mixReg, mixRoth, inflationRate):

    avgBank = inflationRate + avgBankVsInflation

    yieldEquity = random.gauss(avgEquity, stdDevEquity)
    yieldFixedIncome = random.gauss(avgFixedIncome, stdDevFixedIncome)
    yieldBank = max(0, random.gauss(avgBank, stdDevBank))
    yieldHomeEq = random.gauss(avgHomeEq, stdDevHomeEq)

    yieldReg = (1 - mixReg["cash"]) * (
        mixReg["fixedIncome"] * yieldFixedIncome + mixReg["equity"] * yieldEquity
    )
    yieldRoth = (1 - mixRoth["cash"]) * (
        mixRoth["fixedIncome"] * yieldFixedIncome + mixRoth["equity"] * yieldEquity
    )

    return yieldReg, yieldRoth, yieldBank, yieldHomeEq
