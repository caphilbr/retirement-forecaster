import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
      </Switch>
    </Router>
  )
}

export default hot(App)
