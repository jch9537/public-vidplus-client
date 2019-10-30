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

store.dispatch({
  type: "ADD_SPACES",
  spaces: [
    { id: 1, name: "Space 1", current: false },
    { id: 2, name: "Space 2", current: false }
  ]
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
