import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import InputForm from './components/input_form/InputForm';
import RedirectUrl from './components/redirect/RedirectUrl';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/home">
            <InputForm />
          </Route>
          {/* <Route
            path="/redirect"
            component={() => {
              const path = window.location.pathname.split('/');
              if (path.length > 3 || path.length === 2) {
                return <RedirectUrl />;
              } else {
                window.location.href = 'https://example.com/1234';
                return null;
              }
            }}
          /> */}
          <Route path="/redirect">
            <RedirectUrl />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
