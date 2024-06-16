import React from "react"

const NewPortfolioForm = (props) => {

  const toggleNewPortfolio = () => {
    props.toggleNewPortfolio()
  }

  return (
    <div className="gray-background">
      <div className="new-portfolio-form grid-x">
        <div className="small-6 medium-3">column 1</div>
        <div className="small-6 medium-3">column 2</div>
        <div className="small-6 medium-3">column 3</div>
        <div className="small-6 medium-3">column 4</div>
        <p className="form-button-container">
          <span className="form-button" onClick={toggleNewPortfolio}>Cancel</span>
          <span className="form-button">Submit</span>
        </p>
      </div>
    </div>
  )
}

export default NewPortfolioForm