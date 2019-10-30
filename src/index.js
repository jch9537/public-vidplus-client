import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(logger))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
