// App.js
import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={Login} />
          <Redirect to="/" />
        </Switch>
      </>
  );
}

export default App;
