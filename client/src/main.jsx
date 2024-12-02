import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./User/pages/Home";
import Login from "./User/pages/Login";
import Register from "./User/pages/Register";
import UserIndex from "./User/UserIndex";
import { Provider } from "react-redux";
import Store, { StorePersister } from "./toolkits/Store";
import AdminIndex from "./Admin/AdminIndex";
import AdminHome from "./Admin/pages/AdminHome";
import AdminLogin from "./Admin/pages/AdminLogin";
import Products from "./User/pages/Products";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserIndex />,
        children: [
          { path: "/", element: <Home /> },
          { path: "Login", element: <Login /> },
          { path: "Register", element: <Register /> },
          { path: "product", element: <Products /> },
        ],
      },
      {
        path: "/admin",
        element: <AdminIndex />,
        children: [
          { path: "/admin/", element: <AdminHome /> },
          { path: "/admin/login", element: <AdminLogin /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={<div>Loading...</div>} persistor={StorePersister}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
