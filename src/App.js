import React from 'react';
import HomeScreen from './conteiners/homeScreen/HomeScreen'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './conteiners/auth/login/Login';

function App() {
  const user = {name: "anicita"};
  return (
    <div className="app">

     <Router>
      {
       !user ? (
         <Login />
       ): (
        <Switch>
        <Route exact={true} path="/">
         <HomeScreen />
        </Route>
      </Switch>
       )
      }

     </Router>
    </div>
  );
}

export default App;
