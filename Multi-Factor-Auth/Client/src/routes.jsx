import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Setup2Fa from "./pages/Setup2Fa";
import Verify2Fa from "./pages/Verify2Fa";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2Fa />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2Fa />,
        errorElement: <Error />,
      },
    ],
  },
]);
