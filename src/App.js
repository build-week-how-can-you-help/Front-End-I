import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './utilities/PrivateRoute';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './components/userLogin/Login';
import Logout from './components/userLogin/Logout';
import Dashboard from './components/Dashboard';
import NonProfitList from './components/NonProfitList/NonProfitList';
import UserDisplay from './components/UserDisplay/UserDisplay';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route exact path="/" render={ props => localStorage.getItem("token") ? <Dashboard {...props} /> : <Login {...props} /> } />
      <PrivateRoute path="/home" component={Dashboard} />
      <PrivateRoute path="/nonprofits" component={NonProfitList} />
      <PrivateRoute path="/users" component={UserDisplay} />
      <PrivateRoute path="/logout" component={Logout} />
      {/* <Route path="/home" component={Dashboard} />
      <Route path="/nonprofits" component={NonProfitList} />
      <Route path="/users" component={UserDisplay} />
      <Route path="/logout" component={Logout} /> */}

      <Footer />
    </div>
  );
}

export default App;
