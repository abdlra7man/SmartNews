import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'; // required

import App from './app.js';
import store from './store';
import './app/less/main.less';


function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById('main')
  );
}

renderApp(); // Renders App on init

if (module.hot) {
  // Renders App every time a change in code happens.
  module.hot.accept('./app.js', renderApp);
}
