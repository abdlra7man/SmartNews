import React from 'react';
import {
  Route
} from 'react-router-dom';
import { ConnectedRouter as Router} from 'react-router-redux';

import { history } from './store';
import Marketplace from './app/js/pages/marketplace';

const routes = [
  {
    path: '/',
    component: Marketplace
  }
];

function App() {
  return (
    <Router history={history}>
      <div>
        {routes.map( (route, key) => (
        <Route key={key} {...route} />
        ))}
      </div>
    </Router>
  );
}

export default App;