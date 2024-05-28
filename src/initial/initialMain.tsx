import React from "react";
import ReactDOM from "react-dom/client";
import InitialApp from "./initialApp";
import "../index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <InitialApp />
  </React.StrictMode>
);
