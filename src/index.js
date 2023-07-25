import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { Quizprovider } from "./context/QuizContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Quizprovider>
      <App />
    </Quizprovider>
  </React.StrictMode>
);
