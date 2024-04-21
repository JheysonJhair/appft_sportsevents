import AuthLayout from "../layouts/AuthLayout";
import Login from "../modules/auth/pages/Login";

const createAuthRoute = (element: React.ReactNode) => (
  <AuthLayout>{element}</AuthLayout>
);

const authRouter = [
  {
    path: "/login",
    element: createAuthRoute(<Login />),
  }
];

export default authRouter;
