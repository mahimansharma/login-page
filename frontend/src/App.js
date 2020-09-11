import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './componets/login';
import Register from './componets/signup';
import Profile from './componets/profile';
import Users from './componets/Users';


class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Provider store={store}>
          <Switch>
             <Route exact path="/login" component={Login} />
             <Route exact path="/register" component={Register} />
             <Route exact path="/profile" component={Profile} />
             <Route exact path="/allUsers" component={Users} />
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default App;
