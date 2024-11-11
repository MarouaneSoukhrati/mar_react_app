import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./Component/Aerror";
import Home from "./Component/Home";
import Portfolio from "./Component/Subcomponent/Portfolio";
import About from "./Component/Subcomponent/About";
import Contact from "./Component/Subcomponent/Contact";
import Academics from "./Component/Subcomponent/Academics";
import Crypto from "./Component/Crypto/Crypto";
import MachineLearning from "./Component/MachineLearning/MachineLearning";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/crypto",
        element: <Crypto />,
      },
      {
        path: "/academics",
        element: <Academics />,
      },
      {
        path: "/machinelearning",
        element: <MachineLearning />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
