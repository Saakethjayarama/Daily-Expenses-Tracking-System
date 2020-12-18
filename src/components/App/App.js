import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../Header";
import Menu from "../Menu";
import Add from "../Add";
import Manage from "../Manage";
import Profile from "../Profile";
import Password from "../ChangePassword";
import Login from "../LoginSignup";
import Dashboard from "../Dashboard";

import * as R from "react-bootstrap";

import { Day, Month, Year } from "../Reports";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <R.Row>
          <Switch>
            <Route path="/change">
              {/*/change => changepassword */}
              <Menu />
              <Password />
            </Route>
            <Route path="/profile">
              {/*/ => Profile */}
              <Menu />
              <Profile />
            </Route>
            <Route path="/year">
              {/*/Year => expenses by year */}
              <Menu />
              <Year />
            </Route>
            <Route path="/month">
              <Menu />
              <Month />
              {/*/month => expenses by month */}
            </Route>
            <Route path="/day">
              {/*/day => expenses by day */}
              <Menu />
              <Day />
            </Route>
            <Route path="/manage">
              {/*/manage => manage expenses */}
              <Menu />
              <Manage />
            </Route>
            <Route path="/add">
              {/*/add => add expenses */}
              <Menu />
              <Add />
            </Route>
            <Route path="/dashboard">
              {/*/dashboard => dashboard */}
              <Menu />
              <Dashboard />
            </Route>
            <Route path="/year">
              {/*/year => year */}
              <Menu />
            </Route>
            <Route path="/">
              {/*/login => login */}
              <Login />
            </Route>
          </Switch>
        </R.Row>
      </Router>
    </div>
  );
}

export default App;
