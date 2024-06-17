const formatDate = (date, style = "forShow") => {
  const dateObject = new Date(date)
  const year = dateObject.getFullYear()
  if (style == "forShow") {
    const day = dateObject.getDate()
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const month = months[dateObject.getMonth()]
    return `${month} ${day}, ${year}`
  }
  if (style == "forForm") {
    const day = String(dateObject.getDate()).padStart(2, "0")
    const month = String(dateObject.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}-${day}`
  }
  return date
}

export default formatDate
