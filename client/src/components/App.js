import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import pythonApiTest from "./pythonApiTest"

import "../assets/scss/main.scss"

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={pythonApiTest} />
      </Switch>
    </Router>
  )
}

export default hot(App)
