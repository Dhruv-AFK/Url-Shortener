import { Navigate, useLocation } from "react-router-dom";
import { useStoreContext } from "./ContextApi/ContextApi";

const PrivateRoute = ({ children, publicPage = false }) => {
  const { token } = useStoreContext();
  const location = useLocation();

  if (publicPage && token) return <Navigate to="/dashboard" replace />;
  if (!publicPage && !token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
};

export default PrivateRoute;
