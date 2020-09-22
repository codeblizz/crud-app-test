import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";

ReactDOM.render(
  <Provider store={store}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode>, */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
