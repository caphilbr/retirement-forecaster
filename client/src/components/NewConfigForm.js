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
    savingsPerc: "n/a",
    retSpendingDropPerc: "0.10",
  })

  const toggleNewConfig = () => {
    props.toggleNewConfig()
  }

  const handleFormChange = (event) => {
    setFormPayload({
      ...formPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const validateInput = (payload) => {
    setErrors({})
    const {
      numberOfScens,
      targetRetAge,
      deathAge,
      savingsType,
      savingsPerc,
      retSpendingDropPerc,
    } = payload
    const percentRegex = config.validation.percent.regexp.percentRegex
    const integerRegex = config.validation.integer.regexp.integerRegex
    let newErrors = {}
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
    if (numScenariosInt < 1 || numScenariosInt > 1000) {
      newErrors = {
        ...newErrors,
        numberOfScens: "must be an integer between 1 and 1,000",
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
    if (!savingsPerc.match(percentRegex) && savingsPerc != "n/a") {
      newErrors = {
        ...newErrors,
        savingsPerc: "must be a number between 0 and 1 (no more than 3 decimals), or 'n/a'",
      }
    }
    if (savingsPerc.trim() == "") {
      newErrors = {
        ...newErrors,
        savingsPerc: "amount cannot be blank",
      }
    }
    const savingsPercNum = parseFloat(savingsPerc)
    if (savingsPercNum < 0 || savingsPercNum > 1) {
      newErrors = {
        ...newErrors,
        savingsPerc: "must be a number between 0 and 1, or 'n/a'",
      }
    }
    if (!retSpendingDropPerc.match(percentRegex)) {
      newErrors = {
        ...newErrors,
        retSpendingDropPerc: "must be a number between 0 and 1, no more than 3 decimals",
      }
    }
    if (retSpendingDropPerc.trim() == "") {
      newErrors = {
        ...newErrors,
        retSpendingDropPerc: "amount cannot be blank",
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
          avgFrugalYrs: null,
          percRetAtTgt: null,
          percExhaust: null,
          percFrugal: null,
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
            parsedData.config, props.portfolios
          )
          props.setPortfolios(updatedPortfolios)
          props.toggleNewConfig()
        }
      } catch (error) {
        console.log("error in posting new portfolio: ", error)
      }
    }
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
              <input
                type="text"
                value={formPayload.savingsType}
                name="savingsType"
                onChange={handleFormChange}
              />
              <FormError error={errors.savingsType} />
            </label>
            <label htmlFor="savingsPerc">
              Savings % (of Salary):
              <input
                type="text"
                value={formPayload.savingsPerc}
                name="savingsPerc"
                onChange={handleFormChange}
              />
              <FormError error={errors.savingsPerc} />
            </label>
            <label htmlFor="retSpendingDropPerc">
              % Expense Drop at Retirement:
              <input
                type="text"
                value={formPayload.retSpendingDropPerc}
                name="retSpendingDropPerc"
                onChange={handleFormChange}
              />
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
