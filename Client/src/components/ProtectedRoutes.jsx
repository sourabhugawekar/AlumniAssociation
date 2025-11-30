import { Navigate } from "react-router-dom";

//Add authentication logic here
const isAuthenticated = localStorage.getItem("authToken");

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
