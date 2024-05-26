import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
const selector = import.meta.env.VITE_MAIN_DOM || "%VITE_MAIN_DOM%";
ReactDOM.createRoot(document.getElementById(selector)!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
