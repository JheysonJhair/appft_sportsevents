import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute ";
import { Reportes } from "../modules/reports/Reportes";
import { AreaJuego } from "../modules/area/AreaJuego";
import { User } from "../modules/user/pages/User";
import { NewUser } from "../modules/user/pages/NewUser";
import { Horarios } from "../modules/horario/Horarios";

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
        path: "/areadejuego/",
        element: <AreaJuego />,
      },
      {
        path: "/administrador",
        element: <Horarios />,
      },
      {
        path: "/reportes/",
        element: <Reportes />,
      },
      {
        path: "/usuarios/",
        element: <User />,
      },
      {
        path: "/nuevousuario/",
        element: <NewUser />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
