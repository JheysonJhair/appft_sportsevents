import AuthLayout from "../layouts/AuthLayout";
import Login from "../modules/auth/pages/Login";
import { Register } from "../modules/auth/pages/Register";

const createAuthRoute = (element: React.ReactNode) => (
  <AuthLayout>{element}</AuthLayout>
);

const authRouter = [
  {
    path: "/login",
    element: createAuthRoute(<Login />),
  },
  {
    path: "/register",
    element: createAuthRoute(<Register />),
  },
];

export default authRouter;
