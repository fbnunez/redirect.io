import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import InputForm from './components/input_form/InputForm';
import RedirectUrl from './components/redirect/RedirectUrl';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/url">
            <RedirectUrl />
          </Route>
          <Header />
          <Route path="/">
            <InputForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
