import React, { useState } from "react"
import FormError from "./utilities/FormError"
import config from "./../config.js"
import addConfigToPortfolios from "../services/addConfigToPortfolios.js"

const NewConfigForm = (props) => {
  const [errors, setErrors] = useState({})
  const [formPayload, setFormPayload] = useState({
    numberOfScens: "100",
    targetRetAge: "65",
    deathAge: "95",
    savingsType: "fixed",
    savingsPerc: 0.05,
    annualSavings: "10000",
    retSpendingDropPerc: 0.1,
  })
  console.log(formPayload)
  const toggleNewConfig = () => {
    props.toggleNewConfig()
  }

  const handleFormChange = (event) => {
    let value = event.currentTarget.value
    if (
      event.currentTarget.name == "savingsPerc" ||
      event.currentTarget.name == "retSpendingDropPerc"
    ) {
      value /= 100
    }
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: value,
    })
  }

  const validateInput = (payload) => {
    setErrors({})
    const {
      numberOfScens,
      targetRetAge,
      deathAge,
      annualSavings,
      savingsPerc,
      retSpendingDropPerc,
    } = payload
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
    const integerRegex = config.validation.integer.regexp.integerRegex
    let newErrors = {}
    if (!annualSavings.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        annualSavings: "must be a number (no more than 2 decimals)",
      }
    }
    if (annualSavings.trim() == "") {
      newErrors = {
        ...newErrors,
        annualSavings: "amount cannot be blank",
      }
    }
    if (!numberOfScens.match(integerRegex)) {
      newErrors = {
        ...newErrors,
        numberOfScens: "must be an integer",
      }
    }
    if (numberOfScens.trim() == "") {
      newErrors = {
        ...newErrors,
        numberOfScens: "amount cannot be blank",
      }
    }
    const numScenariosInt = parseInt(numberOfScens)
    if (numScenariosInt < 1 || numScenariosInt > 200) {
      newErrors = {
        ...newErrors,
        numberOfScens:
          "must be an integer between 1 and 200 (results converge at around 100 scenarios)",
      }
    }
    if (!targetRetAge.match(integerRegex)) {
      newErrors = {
        ...newErrors,
        targetRetAge: "must be an integer",
      }
    }
    if (targetRetAge.trim() == "") {
      newErrors = {
        ...newErrors,
        targetRetAge: "amount cannot be blank",
      }
    }
    if (!deathAge.match(integerRegex)) {
      newErrors = {
        ...newErrors,
        deathAge: "must be an integer",
      }
    }
    if (deathAge.trim() == "") {
      newErrors = {
        ...newErrors,
        deathAge: "amount cannot be blank",
      }
    }
    const deathAgeInt = parseInt(deathAge)
    if (deathAgeInt > 110) {
      newErrors = {
        ...newErrors,
        deathAge: "cannot be greater than 110",
      }
    }
    const savingsPercNum = parseFloat(savingsPerc)
    if (savingsPercNum < 0 || savingsPercNum > 1) {
      newErrors = {
        ...newErrors,
        savingsPerc: "must be a number between 0 and 1, or 'n/a'",
      }
    }
    const retSpendingDropPercNum = parseFloat(retSpendingDropPerc)
    if (retSpendingDropPercNum < 0 || retSpendingDropPercNum > 1) {
      newErrors = {
        ...newErrors,
        retSpendingDropPerc: "must be a number between 0 and 1",
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(formPayload)) {
      try {
        const id = props.portfolioId
        const fullPayload = {
          ...formPayload,
          avgRetAge: null,
          avgBalAtDeath: null,
          percRetAtTgt: null,
          percExhaust: null,
          portfolioId: id,
        }
        const response = await fetch(`/api/v1/portfolio/${id}/stochConfig`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(fullPayload),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        } else {
          const parsedData = await response.json()
          const updatedPortfolios = addConfigToPortfolios(
            parsedData.config,
            props.portfolios,
          )
          props.setPortfolios(updatedPortfolios)
          props.toggleNewConfig()
        }
      } catch (error) {
        console.log("error in posting new portfolio: ", error)
      }
    }
  }

  let selectSavingsPercent = null
  if (formPayload.savingsType == "percent") {
    selectSavingsPercent = (
      <label htmlFor="savingsPerc">
        Savings % (of Gross Salary):
        <input
          className="percent-form"
          type="number"
          value={Math.floor(100 * formPayload.savingsPerc)}
          name="savingsPerc"
          onChange={handleFormChange}
          min="0"
          max="100"
        />
        %
        <FormError error={errors.savingsPerc} />
      </label>
    )
  }
  let selectSavingsAmount = null
  if (formPayload.savingsType == "fixed") {
    selectSavingsAmount = (
      <label htmlFor="annualSavings">
        Annual Savings Amount:
        <input
          type="text"
          value={formPayload.annualSavings}
          name="annualSavings"
          onChange={handleFormChange}
        />
        <FormError error={errors.annualSavings} />
      </label>
    )
  }
  return (
    <div className="gray-background">
      <div className="new-portfolio-form">
        <form
          className="grid-x grid-padding-x align-center"
          onSubmit={handleSubmit}
        >
          <div className="small-12">
            <label htmlFor="numberOfScens">
              Number of Scenarios:
              <input
                type="text"
                value={formPayload.numberOfScens}
                name="numberOfScens"
                onChange={handleFormChange}
              />
              <FormError error={errors.numberOfScens} />
            </label>
            <label htmlFor="targetRetAge">
              Target Retirement Age:
              <input
                type="text"
                value={formPayload.targetRetAge}
                name="targetRetAge"
                onChange={handleFormChange}
              />
              <FormError error={errors.targetRetAge} />
            </label>
            <label htmlFor="deathAge">
              Age at Death:
              <input
                type="text"
                value={formPayload.deathAge}
                name="deathAge"
                onChange={handleFormChange}
              />
              <FormError error={errors.deathAge} />
            </label>
            <label htmlFor="savingsType">
              Savings Approach:
              <select
                id="savingsType"
                name="savingsType"
                value={formPayload.savingsType}
                onChange={handleFormChange}
                className="savings-form"
              >
                <option value="fixed">Fixed</option>
                <option value="percent">% of Salary</option>
                <option value="remainder">Salary less taxes & expenses</option>
              </select>
              <FormError error={errors.savingsType} />
            </label>
            {selectSavingsPercent}
            {selectSavingsAmount}
            <label htmlFor="retSpendingDropPerc">
              % Expense Drop at Retirement:
              <input
                className="percent-form"
                type="number"
                value={Math.floor(100 * formPayload.retSpendingDropPerc)}
                name="retSpendingDropPerc"
                onChange={handleFormChange}
                min="0"
                max="100"
              />
              %
              <FormError error={errors.retSpendingDropPerc} />
            </label>
          </div>
          <p className="form-button-container">
            <span className="form-button" onClick={toggleNewConfig}>
              Cancel
            </span>
            <input type="submit" className="form-button" value="Submit" />
          </p>
        </form>
      </div>
    </div>
  )
}

export default NewConfigForm
