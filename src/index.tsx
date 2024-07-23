import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/index";
import MyRouter from "./router/MyRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <MyRouter />
  </Provider>
);
