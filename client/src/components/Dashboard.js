import React, { useState, useEffect } from "react"
import PortfolioTile from "./PortfolioTile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([])

  const getPortfolios = async () => {
    try {
      const response = await fetch("/api/v1/portfolio")
      const parsedData = await response.json()
      setPortfolios(parsedData.portfolios)
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getPortfolios()
  }, [])

  const portfolioTiles = portfolios.map((portfolio) => {
    return <PortfolioTile portfolio={portfolio} key={portfolio.id} />
  })

  return (
    <div className="background-color">
      <div className="grid-x grid-padding-x">
        <h1 className="cell small-12 dashboard-title">Retirement Forecaster</h1>
        <div className="cell small-12">
          <h4>
            <FontAwesomeIcon icon="fas fa-file-invoice-dollar" /> Portfolios
          </h4>
          <div className="cell small-12 horiz-overflow-container">
            {portfolioTiles}
          </div>
          <h5>
            <FontAwesomeIcon icon="fas fa-plus-circle" /> Add New Portfolio
          </h5>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
