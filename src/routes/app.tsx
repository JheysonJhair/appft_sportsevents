import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute ";
import { Reportes } from "../modules/reports/Reportes";

const appRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
      <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/operaciones/membresiaspagos/",
        element: <Reportes />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
