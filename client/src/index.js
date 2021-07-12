import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import App from "./App";
import Header from "./components/Header"
import Footer from "./components/Footer";
import {TodoProvider} from "./context/TodoProvider";

ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <Header />
      <App />
      <Footer />
    </TodoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
