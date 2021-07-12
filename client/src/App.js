import React, { useEffect } from "react";
import { useGlobalContext } from "./context/TodoProvider";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/Landing";
import TodoCaller from "./components/api/TodoCaller";

function App() {
  const { isAuthenticated, dispatch } = useGlobalContext();

  async function isAuth() {

    const url = TodoCaller + "/auth/verify";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log("isAuth: parseRes: ", parseRes);

      parseRes === true
        ? dispatch({ type: "AUTH", payload: true })
        : dispatch({ type: "AUTH", payload: false });

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <Router basename="/playground/todo-pern">
        <Switch>
          <Route exact path="/">
            {!isAuthenticated ? <Landing /> : <Redirect to="/dashboard" />}
          </Route>

          <Route exact path="/login">
            {!isAuthenticated ? (
              <Login />
            ) : (
              <Redirect to="/dashboard" />
            )}
          </Route>

          <Route exact path="/register">
            {!isAuthenticated ? (
              <Register />
            ) : (
              <Redirect to="/dashboard" />
            )}
          </Route>

          <Route exact path="/dashboard">
            {!isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <Dashboard />
            )}
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
