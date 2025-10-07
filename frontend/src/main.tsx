// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Bootstrap global
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// seu CSS global (se tiver)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
