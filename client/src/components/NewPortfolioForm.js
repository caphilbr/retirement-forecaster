import React, { useState } from "react"
import MixSliders from "./MixSliders"
import FormError from "./utilities/FormError"
import formatDate from "../utilities/formatDate"
import config from "./../config.js"

const NewPortfolioForm = (props) => {
  const [errors, setErrors] = useState({})
  const [formPayload, setFormPayload] = useState({
    name: "",
    date: formatDate(new Date(), "forForm"),
    age: "0",
    salary: "0",
    expenses: "0",
    balanceReg: "0",
    mixReg: "1-29-70",
    balanceRoth: "0",
    mixRoth: "1-44-55",
    balanceBank: "0",
    balanceHomeEq: "0",
  })

  const toggleNewPortfolio = () => {
    props.toggleNewPortfolio()
  }

  const setMixState = (mix, account) => {
    setFormPayload({
      ...formPayload,
      [account]: mix,
    })
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
      name,
      date,
      age,
      salary,
      expenses,
      balanceReg,
      mixReg,
      balanceRoth,
      mixRoth,
      balanceBank,
      balanceHomeEq,
    } = payload
    const currencyRegexp = config.validation.currency.regexp.currencyRegex
    const dateRegexp = config.validation.date.regexp.dateRegex
    const integerRegexp = config.validation.integer.regexp.integerRegex
    let newErrors = {}
    if (name.trim() == "") {
      newErrors = {
        ...newErrors,
        name: "amount cannot be blank",
      }
    }
    if (!salary.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        salary: "must be a number (no more than 2 decimals)",
      }
    }
    if (salary.trim() == "") {
      newErrors = {
        ...newErrors,
        salary: "amount cannot be blank",
      }
    }
    if (!age.match(integerRegexp)) {
      newErrors = {
        ...newErrors,
        age: "must be an integer",
      }
    }
    if (age.trim() == "") {
      newErrors = {
        ...newErrors,
        age: "amount cannot be blank",
      }
    }
    if (age < 0 || age >= 110) {
      newErrors = {
        ...newErrors,
        age: "must be an integer between 0 and 110",
      }
    }
    if (!expenses.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        expenses: "must be a number (no more than 2 decimals)",
      }
    }
    if (expenses.trim() == "") {
      newErrors = {
        ...newErrors,
        expenses: "amount cannot be blank",
      }
    }
    if (!balanceReg.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        balanceReg: "must be a number (no more than 2 decimals)",
      }
    }
    if (balanceReg.trim() == "") {
      newErrors = {
        ...newErrors,
        balanceReg: "amount cannot be blank",
      }
    }
    if (!balanceRoth.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        balanceRoth: "must be a number (no more than 2 decimals)",
      }
    }
    if (balanceRoth.trim() == "") {
      newErrors = {
        ...newErrors,
        balanceRoth: "amount cannot be blank",
      }
    }
    if (!balanceBank.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        balanceBank: "must be a number (no more than 2 decimals)",
      }
    }
    if (balanceBank.trim() == "") {
      newErrors = {
        ...newErrors,
        balanceBank: "amount cannot be blank",
      }
    }
    if (!balanceHomeEq.match(currencyRegexp)) {
      newErrors = {
        ...newErrors,
        balanceHomeEq: "must be a number (no more than 2 decimals)",
      }
    }
    if (balanceHomeEq.trim() == "") {
      newErrors = {
        ...newErrors,
        balanceHomeEq: "amount cannot be blank",
      }
    }
    if (date.trim() == "") {
      newErrors = {
        ...newErrors,
        date: "date cannot be blank",
      }
    }
    if (!date.match(dateRegexp)) {
      newErrors = {
        ...newErrors,
        date: "date format is invalid",
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (validateInput(formPayload)) {
      try {
        const response = await fetch("/api/v1/portfolio", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(formPayload),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        } else {
          const parsedData = await response.json()

          const updatedPortfolios = [
            ...props.portfolios,
            parsedData.portfolio
          ]
          props.setPortfolios(updatedPortfolios)
          props.toggleNewPortfolio()
        }
      } catch(error) {
        console.log('error in posting new portfolio: ', error)
      }
    }
  }
  
  return (
    <div className="gray-background">
      <div className="new-portfolio-form">
        <form className="grid-x grid-padding-x align-center" onSubmit={handleSubmit}>
          <div className="small-12 large-5">
            <label htmlFor="name">
              Portfolio Name:
              <input
                type="text"
                value={formPayload.name}
                name="name"
                onChange={handleFormChange}
              />
              <FormError error={errors.name} />
            </label>
            <label htmlFor="date">
              As Of Date:
              <input
                type="date"
                value={formPayload.date}
                name="date"
                onChange={handleFormChange}
              />
              <FormError error={errors.date} />
            </label>
            <label htmlFor="age">
              Age:
              <input
                type="text"
                value={formPayload.age}
                name="age"
                onChange={handleFormChange}
              />
              <FormError error={errors.age} />
            </label>
            <label htmlFor="salary">
              Salary:
              <input
                type="text"
                value={formPayload.salary}
                name="salary"
                onChange={handleFormChange}
              />
              <FormError error={errors.salary} />
            </label>
            <label htmlFor="expenses">
              Annual Expenses:
              <input
                type="text"
                value={formPayload.expenses}
                name="expenses"
                onChange={handleFormChange}
              />
              <FormError error={errors.expenses} />
            </label>
          </div>
          <div className="small-12 large-1"></div>
          <div className="small-12 large-5">
            <label htmlFor="balanceReg">
              Registered Savings (401k, IRA):
              <input
                type="text"
                value={formPayload.balanceReg}
                name="balanceReg"
                onChange={handleFormChange}
                className="inline-block"
              />
              <FormError error={errors.balanceReg} />
              <div className="slider-container">
                <MixSliders
                  account="mixReg"
                  mix={formPayload.mixReg}
                  setMixState={setMixState}
                />
              </div>
            </label>
            <label htmlFor="balanceRoth">
              Roth Savings:
              <input
                type="text"
                value={formPayload.balanceRoth}
                name="balanceRoth"
                onChange={handleFormChange}
              />
              <FormError error={errors.balanceRoth} />
              <div className="slider-container">
                <MixSliders
                  account="mixRoth"
                  mix={formPayload.mixRoth}
                  setMixState={setMixState}
                />
              </div>
            </label>
            <label htmlFor="balanceBank">
              Bank Balance:
              <input
                type="text"
                value={formPayload.balanceBank}
                name="balanceBank"
                onChange={handleFormChange}
              />
              <FormError error={errors.balanceBank} />
            </label>
            <label htmlFor="balanceHomeEq">
              Home Equity:
              <input
                type="text"
                value={formPayload.balanceHomeEq}
                name="balanceHomeEq"
                onChange={handleFormChange}
              />
              <FormError error={errors.balanceHomeEq} />
            </label>
          </div>
          <p className="form-button-container">
            <span className="form-button" onClick={toggleNewPortfolio}>
              Cancel
            </span>
            <input type="submit" className="form-button" value="Submit" />
          </p>
        </form>
      </div>
    </div>
  )
}

export default NewPortfolioForm
