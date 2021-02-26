import React from "react";
import Navbar from './Navigation/NavBar';
import './App.css';
import MainPage from './Pages/Home/MainPage';
import Province from './Pages/ProvTerr/Province';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/province/:id" component={Province} />
          </Switch>
      </div>
    </Router>
      
  );
}
