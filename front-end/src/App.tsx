import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
import Display from "./components/Display";
import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";

const RedirectIfLoggedIn: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  const { checkingAuth, isLoggedIn } = authContext;

  useEffect(() => {
    if (!checkingAuth && isLoggedIn) {
      navigate("/app", { replace: true });
    }
  }, [checkingAuth, isLoggedIn, navigate]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Checking session...</p>
      </div>
    );
  }

  return <Landing />;
};

const App: React.FC = () => {
  return (
    <div className="h-screen bg-black">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<RedirectIfLoggedIn />} />

        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route element={<Display />}>
            <Route index element={<DisplayHome />} />
            <Route path="album/:id" element={<DisplayAlbum />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
