import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "stores/authStore";

function AuthRoute({ component }: { component: JSX.Element }) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/" state={{ from: location, alertOn: true }} replace />;
  }
  return component;
}

export default AuthRoute;
