import AuthLayout from "../layouts/AuthLayout";
import Login from "../modules/auth/pages/Login";
import { Register } from "../modules/auth/pages/Register";
import VerificationCode from "../modules/auth/pages/VerificationCode";

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
  {
    path: "/verification-code",
    element: createAuthRoute(<VerificationCode />),
  },
];

export default authRouter;
