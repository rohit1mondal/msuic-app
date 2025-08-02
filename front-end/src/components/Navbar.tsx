import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide icons

axios.defaults.withCredentials = true;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    backendUrl,
    checkAuthStatus,
  } = useContext(AuthContext)!;

  // function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(false);
      setUserData(null);
      checkAuthStatus(); // Optional
      navigate("/login");
    } catch (err: any) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center font-semibold">
      <div className="flex items-center gap-2">
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black p-2 rounded-2xl cursor-pointer text-white hover:bg-gray-700 transition"
        />
        <ChevronRight
          onClick={() => navigate(1)}
          className="w-8 h-8 bg-black p-2 rounded-2xl cursor-pointer text-white hover:bg-gray-700 transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
          Explore Premium
        </p>
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-black text-white py-3 px-4 rounded-2xl text-[15px] hover:bg-gray-700 transition cursor-pointer"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white py-3 px-4 rounded-2xl text-[15px] hover:bg-gray-800 transition cursor-pointer"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
