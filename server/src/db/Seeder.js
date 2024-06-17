/* eslint-disable no-console */
import { connection } from "../boot.js"
import seederTakeWithdrawal from "./../services/seederTakeWithdrawal.js"
import {
  Portfolio,
  StochConfig,
  Scenario,
  ProjectionYear,
} from "./../models/index.js"

class Seeder {
  static async seed() {
    let initBalReg = 455296
    let initBalRoth = 23598
    let initBalBank = 8654
    let initBalHomeEq = 829495
    let initBalTotal = initBalReg + initBalRoth + initBalBank + initBalHomeEq
    let salary = 94500
    let expenses = 54750
    let savings = 10250

    console.log("Seeding a portfolio...")
    await Portfolio.query().insert({
      name: "Test Portfolio #1",
      date: new Date("2024-06-01"),
      salary: salary,
      expenses: expenses,
      annualSavings: savings,
      balanceReg: initBalReg,
      mixReg: "1-24-75",
      balanceRoth: initBalRoth,
      mixRoth: "2-48-50",
      balanceBank: initBalBank,
      balanceHomeEq: initBalHomeEq,
    })

    // *********************** //
    // Stoch Config #1

    console.log("Seeding stochastic configuration #1...")
    const stochConfig1 = await StochConfig.query().insertAndFetch({
      numberOfScens: 100,
      targetRetAge: 58,
      deathAge: 95,
      savingsType: "fixed",
      savingsPerc: 0.05,
      retSpendingDropPerc: 0.1,
      portfolioId: 1,
    })

    console.log("Generating dummy scenario results...")
    for (let scen = 1; scen <= 100; scen++) {
      const retAge = Math.floor(58 + 5 * Math.random())
      const balanceAtDeath = -500000 + 3000000 * Math.random()
      let numYrsFrugal = 0
      if (Math.random() > 0.8) {
        numYrsFrugal += Math.floor(1 + 7 * Math.random())
      }
      const stochConfigsId = 1
      await Scenario.query().insert({
        retAge,
        balanceAtDeath,
        numYrsFrugal,
        stochConfigsId,
      })
    }

    console.log("Computing stochastic results...")
    await stochConfig1.getStochResults()
    await StochConfig.query().findById(stochConfig1.id).patch(stochConfig1)

    for (let scen = 1; scen <= 100; scen++) {
      console.log("Creating projection years for scenario # ", scen)
      let calYear = 2024
      let age = 45
      let isRetired = false
      let isFrugal = false
      initBalReg = 455296
      initBalRoth = 23598
      initBalBank = 8654
      initBalHomeEq = 829495
      initBalTotal = initBalReg + initBalRoth + initBalBank + initBalHomeEq
      salary = 94500
      expenses = 54750
      savings = 10250
      let withdrawals = 0
      let taxRate = 0.3
      let taxes = taxRate * salary
      let yieldReg = 0.06
      let yieldRoth = 0.07
      let yieldBank = 0.02
      let yieldHomeEq = 0.03
      let inflationRate = 0.025
      let raisePerc = 0.03
      let exhaustAge = 0
      let scenarioId = scen

      do {
        const begYrBalances = seederTakeWithdrawal(
          initBalReg,
          initBalRoth,
          initBalBank,
          initBalHomeEq,
          withdrawals - savings,
        )
        let begYrBalReg = begYrBalances.newRegBal
        let begYrBalRoth = begYrBalances.newRothBal
        let begYrBalBank = begYrBalances.newBankBal
        let begYrBalHomeEq = begYrBalances.newHomeEqBal
        let begYrBalTotal =
          begYrBalReg + begYrBalRoth + begYrBalBank + begYrBalHomeEq
        
        // add a bit of randomness in
        yieldReg = -.08 + 0.24 * Math.random()
        yieldRoth = -.07 + 0.21 * Math.random()

        let endYrBalReg = (begYrBalReg *= 1 + yieldReg)
        let endYrBalRoth = (begYrBalRoth *= 1 + yieldRoth)
        let endYrBalBank = (begYrBalBank *= 1 + yieldBank)
        let endYrBalHomeEq = (begYrBalHomeEq *= 1 + yieldHomeEq)
        let endYrBalTotal =
          endYrBalReg + endYrBalRoth + endYrBalBank + endYrBalHomeEq
        if (exhaustAge == 0 && begYrBalTotal < 0 && initBalTotal > 0) {
          exhaustAge = age
        }

        await ProjectionYear.query().insert({
          calYear,
          age,
          isRetired,
          isFrugal,
          initBalReg,
          initBalRoth,
          initBalBank,
          initBalHomeEq,
          initBalTotal,
          salary,
          withdrawals,
          taxRate,
          taxes,
          expenses,
          savings,
          begYrBalReg,
          begYrBalRoth,
          begYrBalBank,
          begYrBalHomeEq,
          begYrBalTotal,
          yieldReg,
          yieldRoth,
          yieldBank,
          yieldHomeEq,
          inflationRate,
          raisePerc,
          endYrBalReg,
          endYrBalRoth,
          endYrBalBank,
          endYrBalHomeEq,
          endYrBalTotal,
          scenarioId,
        })

        // calculate next year's starting & known values
        calYear++
        age++
        if (age >= 58) {
          isRetired = true
        }
        initBalReg = endYrBalReg
        initBalRoth = endYrBalRoth
        initBalBank = endYrBalBank
        initBalHomeEq = endYrBalHomeEq
        initBalTotal = initBalReg + initBalRoth + initBalBank + initBalHomeEq

        // add a bit of randomness in
        inflationRate = 0.025 - 0.01 + 0.02 * Math.random()
        raisePerc = .03 - 0.01 + 0.02 * Math.random()

        expenses *= 1 + inflationRate
        if (age == 58) {
          expenses *= 1 - 0.1
        }
        if (isRetired) {
          salary = 0
          withdrawals = expenses / (1 - taxRate)
          taxes = withdrawals - expenses
        } else {
          salary *= 1 + raisePerc
          withdrawals = 0
          taxes = salary * taxRate
        }
      } while (age < 95)
    }

    // *********************** //
    // Stoch Config #2 (no scenarios for this one)

    console.log("Seeding stochastic configuration #2...")
    const stochConfig2 = await StochConfig.query().insertAndFetch({
      numberOfScens: 100,
      targetRetAge: 65,
      deathAge: 93,
      savingsType: "fixed",
      savingsPerc: 0.05,
      retSpendingDropPerc: 0.15,
      portfolioId: 1,
    })

    console.log("Generating dummy scenario results...")
    for (let scen = 1; scen <= 100; scen++) {
      const retAge = Math.floor(65 + 2 * Math.random())
      const balanceAtDeath = -200000 + 3000000 * Math.random()
      let numYrsFrugal = 0
      if (Math.random() > 0.9) {
        numYrsFrugal += Math.floor(1 + 3 * Math.random())
      }
      const stochConfigsId = 2
      await Scenario.query().insert({
        retAge,
        balanceAtDeath,
        numYrsFrugal,
        stochConfigsId,
      })
    }

    console.log("Computing stochastic results...")
    await stochConfig2.getStochResults()
    await StochConfig.query().findById(stochConfig2.id).patch(stochConfig2)

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
