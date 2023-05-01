import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "store";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "pages/HomePage";
import OrdersPage from "pages/OrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create_order",
    element: <HomePage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
