import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Todo from './pages/todo';
import Login from './pages/login';
import Register from './pages/register';

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;
