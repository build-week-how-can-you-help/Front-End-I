import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'react-thunk';
import reducers from './store/reducers';

import App from './App';

import './scss/index.scss';

const store = createStore( store, applyMiddleware(thunk));
ReactDOM.render(<App />, document.getElementById('root'));