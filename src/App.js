import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './utilities/PrivateRoute';

import Navigation from './components/Navigation';
import Login from './components/userLogin/Login';
import Logout from './components/userLogin/Logout';
import Dashboard from './components/Dashboard';
import NonProfitList from './components/NonProfitList/NonProfitList';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route exact path="/" component={Login} />
      <PrivateRoute path="/home" component={Dashboard} />
      <PrivateRoute path="/search" component={NonProfitList} />
      <PrivateRoute path="/logout" component={Logout} />
    </div>
  );
}

export default App;
