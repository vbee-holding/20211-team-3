import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// redux packages
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import allReducers from "./reducers";

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>,
  document.getElementById("root")
);
