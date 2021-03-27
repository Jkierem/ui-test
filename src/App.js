import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Home } from "./views";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
