import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <div
          style={{
            backgroundColor: "#e2ebef",
            minHeight: "100vh",
          }}
        >
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
