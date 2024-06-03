import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute ";
import { Reportes } from "../modules/general-reports/Reportes";
import { Users } from "../modules/user/pages/Users";
import { NewUser } from "../modules/user/pages/NewUser";
import { AdimistratorHome } from "../modules/administrator/AdministratorHome";
import { DayReport } from "../modules/details-report/DayReport";
import { AllReport } from "../modules/details-report/AllReports";
import { ManagementArea } from "../modules/management-area/ManagementArea";
import { NewManagementArea } from "../modules/management-area/NewManagementArea";
import { SportPlay } from "../modules/details-report/SportPlay";
import { AdimistratorField } from "../modules/administrator/AdministratorField";

const appRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      // JUGADORES 1 Y 2
      {
        path: "/",
        element: <HomePage />,
      },
      // ADMINISTRADOR
      {
        path: "/administrator",
        element: <AdimistratorHome />,
      },
      {
        path: "/all-reports",
        element: <AllReport />,
      },
      {
        path: "/general-reports",
        element: <Reportes />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "/management-area",
        element: <ManagementArea />,
      },
      {
        path: "/new-management-area",
        element: <NewManagementArea />,
      },
      // ADMINISTRADOR CANCHA
      {
        path: "/administrator-field",
        element: <AdimistratorField />,
      },
      {
        path: "/day-report",
        element: <DayReport />,
      },
      {
        path: "/sport-play",
        element: <SportPlay />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
