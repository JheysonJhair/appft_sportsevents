import { useAuth } from "../hooks/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, history]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;