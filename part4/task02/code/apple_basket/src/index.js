import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from "./App.js";
import apples from "./stores/AppleStore.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider apples={apples}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
