import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import Dashboard from "./Dashboard"

import "../assets/scss/main.scss"

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default hot(App)
