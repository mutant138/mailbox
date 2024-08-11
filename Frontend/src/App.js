import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';

function App() {
  // Select authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Navbar />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={Login} />
        <Route
          path="/home">
         {isAuthenticated ? <Home /> : <Redirect to="/signin" />}
        </Route>
        <Redirect to="/signup" />
      </Switch>
    </>
  );
}

export default App;
