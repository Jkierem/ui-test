import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import { Home } from "./views"
import "./App.scss"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
