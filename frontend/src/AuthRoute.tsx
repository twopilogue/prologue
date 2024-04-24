import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "stores/authStore";

function AuthRoute({ component }: { component: JSX.Element }) {
  const login = useAuthStore((state) => state.login);
  const location = useLocation();

  if (!login) {
    return <Navigate to="/" state={{ from: location, alertOn: true }} replace />;
  }
  return component;
}

export default AuthRoute;
