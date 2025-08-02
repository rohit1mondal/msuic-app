import React, { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const context = useContext(AuthContext);

  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Auth context not found.</p>
      </div>
    );
  }

  const { isLoggedIn, checkingAuth } = context;

  if (!checkingAuth && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
