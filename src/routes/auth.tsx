import AuthLayout from "../layouts/AuthLayout";
import Login from "../modules/auth/pages/Login";
import ForgotPassword from "../modules/auth/pages/ForgotPassword";
import ResetPassword from "../modules/auth/pages/ResetPassword";
import { HomePage } from "../pages/Home";


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
    element: createAuthRoute(<HomePage />),
  },
  {
    path: "/forgot-password",
    element: createAuthRoute(<ForgotPassword />),
  },
  {
    path: "/reset-password",
    element: createAuthRoute(<ResetPassword />),
  },
];

export default authRouter;
