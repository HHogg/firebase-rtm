import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import Application from './components/Application';
import './initialiseFirebase';

const store = createStore();
const render = (AppComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('react-root')
  );
};

render(Application);

if (module.hot) {
  module.hot.accept('./components/Application',
    () => render(Application));
}
