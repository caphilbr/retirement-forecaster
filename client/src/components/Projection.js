import React from "react"
import formatProjection from "../utilities/formatProjection"

const Projection = (props) => {
  
  if (props.projection.length == 0) {
    return <p>No projection selected</p>
    }
  const projection = formatProjection(props.projection)
  const columns = Object.keys(projection[0])

  return (
    <table className="projection-table">
      <thead className="projection-header">
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="projection-body">
        {projection.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Projection
