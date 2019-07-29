import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './utilities/PrivateRoute';

import Navigation from './components/Navigation';
import Login from './components/userLogin/Login';
import NonProfitList from './components/NonProfitList/NonProfitList';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route exact path="/" component={Login} />
      <PrivateRoute path="/home" component={NonProfitList} />
      <PrivateRoute path="/search" component={Search} />
    </div>
  );
}

export default App;
