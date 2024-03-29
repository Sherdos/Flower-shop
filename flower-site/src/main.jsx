import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { UserProvider } from "./store/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <UserProvider>
    <App />
  </UserProvider>
  </Provider>,
);
