import React from "react";
import ReactDOM from "react-dom/client"; // Note the new import
import App from "./App";
import "./index.css";  // Optional, you can add your styles here
import "bootstrap/dist/css/bootstrap.min.css";

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
