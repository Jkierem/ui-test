import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store';
import App from "./App";
import firebase from "./middleware/firebase"

firebase.match({
  Right: () => console.log("Firebase initialized"),
  Left: () => console.log("Firebase not initialized... Will fallback to mocks.")
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
