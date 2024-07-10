from services.rebalance import rebalance
from services.withdrawAndRebalance import withdrawAndRebalance
from services.getYields import getYields
from services.applyYields import applyYields


class Balances:
    def __init__(self, portfolio):
        self.mixReg = portfolio["mixReg"]
        self.mixRoth = portfolio["mixRoth"]
        self.initBalReg = portfolio["balanceReg"]
        self.initBalRoth = portfolio["balanceRoth"]
        self.initBalBank = portfolio["balanceBank"]
        self.initBalHomeEq = portfolio["balanceHomeEq"]
        self.initBalTotal = 0
        self.begYrBalReg = 0
        self.begYrBalRoth = 0
        self.begYrBalBank = 0
        self.begYrBalHomeEq = 0
        self.begYrBalTotal = 0
        self.endYrBalReg = 0
        self.endYrBalRoth = 0
        self.endYrBalBank = 0
        self.endYrBalHomeEq = 0
        self.endYrBalTotal = 0
        self.calcTotals()

    def calcTotals(self):
        self.initBalTotal = sum(
            [self.initBalReg, self.initBalRoth, self.initBalBank, self.initBalHomeEq]
        )
        self.begYrBalTotal = sum(
            [
                self.begYrBalReg,
                self.begYrBalRoth,
                self.begYrBalBank,
                self.begYrBalHomeEq,
            ]
        )
        self.endYrBalTotal = sum(
            [
                self.endYrBalReg,
                self.endYrBalRoth,
                self.endYrBalBank,
                self.endYrBalHomeEq,
            ]
        )

    def calcBegYrNotRetired(self, savings, age):
        self.begYrBalReg = self.initBalReg
        self.begYrBalRoth = self.initBalRoth
        self.begYrBalBank = self.initBalBank + savings
        self.begYrBalHomeEq = self.initBalHomeEq
        self.mixReg, self.mixRoth, self.begYrBalBank, self.begYrBalHomeEq = rebalance(
            self.begYrBalReg,
            self.begYrBalRoth,
            self.begYrBalBank,
            self.begYrBalHomeEq,
            age,
        )
        self.calcTotals()

    def calcBegYrRetired(self, expenses, age):
        (
            self.begYrBalReg,
            self.begYrBalRoth,
            self.begYrBalBank,
            self.begYrBalHomeEq,
            withdrawals,
            taxRate,
            taxes,
            self.mixReg,
            self.mixRoth,
        ) = withdrawAndRebalance(
            self.initBalReg,
            self.initBalRoth,
            self.initBalBank,
            self.initBalHomeEq,
            expenses,
            age,
        )
        self.calcTotals()
        return withdrawals, taxRate, taxes

    def calcEndYr(self, inflationRate, taxRate):
        yieldReg, yieldRoth, yieldBank, yieldHomeEq = getYields(
            self.mixReg, self.mixRoth, inflationRate
        )

        self.endYrBalReg, self.endYrBalRoth, self.endYrBalBank, self.endYrBalHomeEq = (
            applyYields(
                self.begYrBalReg,
                self.begYrBalRoth,
                self.begYrBalBank,
                self.begYrBalHomeEq,
                yieldReg,
                yieldRoth,
                yieldBank,
                yieldHomeEq,
                taxRate
            )
        )
        self.calcTotals()

        return yieldReg, yieldRoth, yieldBank, yieldHomeEq

    def initNextYear(self):
        self.initBalReg = self.endYrBalReg
        self.initBalRoth = self.endYrBalRoth
        self.initBalBank = self.endYrBalBank
        self.initBalHomeEq = self.endYrBalHomeEq
        self.calcTotals()

    def getValue(self, key):
        return getattr(self, key, "noAttribute")
