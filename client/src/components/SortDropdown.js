import React from "react"

const SortDropdown = (props) => {
  
  const handleSort = (event) => {
    const sortType = event.currentTarget.getAttribute('value')
    props.sort(sortType)
  }

  return (
    <div className="dropdown-box">
      <span className="sort-option" onClick={handleSort} value="highBalance">
        Sort: Highest ending balance
      </span>
      <br />
      <span className="sort-option" onClick={handleSort} value="lowBalance">
        Sort: Lowest ending balance
      </span>
      <br />
      <span className="sort-option" onClick={handleSort} value="oldestRet">
        Sort: Oldest retirement age
      </span>
      <br />
      <span className="sort-option" onClick={handleSort} value="youngestRet">
        Sort: Youngest retirement age
      </span>
      <br />
    </div>
  )
}

export default SortDropdown
