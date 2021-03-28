import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Mde from './pages/mde';
import Login from './pages/login';
import Register from './pages/register';

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Mde} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={Mde} />
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;
