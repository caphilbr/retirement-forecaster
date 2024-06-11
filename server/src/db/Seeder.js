/* eslint-disable no-console */
import { connection } from "../boot.js"
import seederTakeWithdrawal from "./../services/seederTakeWithdrawal.js"
import {
  Portfolio,
  ScenarioInput,
  ScenarioOutput,
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
      name: "testPortfolio1",
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
    // Scenario #1

    console.log("Seeding scenario input #1...")
    await ScenarioInput.query().insert({
      targetRetAge: 58,
      deathAge: 95,
      savingsType: "fixed",
      savingsPerc: 0.05,
      retSpendingDropPerc: 0.1,
      portfolioId: 1,
    })
    let calYear = 2024
    let age = 45
    let isRetired = false
    let isFrugal = false
    let withdrawals = 0
    let taxRate = 0.3
    let taxes = taxRate * salary
    let yieldReg = 0.06
    let yieldRoth = 0.07
    let yieldBank = 0.02
    let yieldHomeEq = 0.03
    let inflationRate = 0.025
    let raisePerc = 0.03
    let scenarioInputsId = 1
    let loopCounter = 0
    let exhaustAge = 0

    console.log("Looping thru scenario #1 projection years...")
    do {
      loopCounter++
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
        scenarioInputsId,
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
      if (age == 94) {
        console.log("Seeding scenario output")
        await ScenarioOutput.query().insert({
          retAge: 58,
          numYrsFrugal: 0,
          exhaustAge: exhaustAge,
          balanceAtDeath: initBalTotal,
          scenarioInputsId: scenarioInputsId,
        })
      }
    } while (age < 95)

    // *********************** //
    // Scenario #2

    console.log("Seeding scenario input #2...")
    await ScenarioInput.query().insert({
      targetRetAge: 65,
      deathAge: 92,
      savingsType: "fixed",
      savingsPerc: 0.05,
      retSpendingDropPerc: 0.15,
      portfolioId: 1,
    })
    initBalReg = 455296
    initBalRoth = 23598
    initBalBank = 8654
    initBalHomeEq = 829495
    initBalTotal = initBalReg + initBalRoth + initBalBank + initBalHomeEq
    salary = 94500
    expenses = 54750
    savings = 10250
    calYear = 2024
    age = 45
    isRetired = false
    isFrugal = false
    withdrawals = 0
    taxRate = 0.3
    taxes = taxRate * salary
    yieldReg = 0.07
    yieldRoth = 0.08
    yieldBank = 0.015
    yieldHomeEq = 0.035
    inflationRate = 0.03
    raisePerc = 0.025
    scenarioInputsId = 2
    loopCounter = 0
    exhaustAge = 0

    console.log("Looping thru scenario #2 projection years...")
    do {
      loopCounter++
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
        scenarioInputsId,
      })

      // calculate next year's starting & known values
      calYear++
      age++
      if (age >= 65) {
        isRetired = true
      }
      initBalReg = endYrBalReg
      initBalRoth = endYrBalRoth
      initBalBank = endYrBalBank
      initBalHomeEq = endYrBalHomeEq
      initBalTotal = initBalReg + initBalRoth + initBalBank + initBalHomeEq
      expenses *= 1 + inflationRate
      if (age == 65) {
        expenses *= 1 - 0.15
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
      if (age == 91) {
        console.log("Seeding scenario output")
        await ScenarioOutput.query().insert({
          retAge: 65,
          numYrsFrugal: 0,
          exhaustAge: exhaustAge,
          balanceAtDeath: initBalTotal,
          scenarioInputsId: scenarioInputsId,
        })
      }
    } while (age < 92)

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
