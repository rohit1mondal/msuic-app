import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Music2, LogIn, UserPlus } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Auth context not available.</p>
      </div>
    );
  }

  const { backendUrl, setIsLoggedIn, setUserData, isLoggedIn, checkingAuth } = authContext;

  const [state, setState] = useState<"Sign Up" | "Login">("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checkingAuth && isLoggedIn) {
      navigate("/app", { replace: true });
    }
  }, [checkingAuth, isLoggedIn, navigate]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Checking authentication...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      setLoading(true);

      const url =
        state === "Sign Up"
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`;

      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        setIsLoggedIn(true);
        setUserData(data.user);
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Authentication error. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4">
      <Music2 className="text-green-500 w-12 h-12 mb-4" />

      <h1 className="text-xl font-semibold text-white mb-6">
        Welcome to the Music App
      </h1>

      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-sm">
        <div className="flex items-center justify-center gap-2 mb-3 text-white">
          {state === "Sign Up" ? <UserPlus size={20} /> : <LogIn size={20} />}
          <h2 className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create account" : "Login"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="mb-4 px-5 py-2.5 rounded-full bg-white">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div className="mb-4 px-5 py-2.5 rounded-full bg-white">
            <input
              type="email"
              placeholder="Email id"
              required
              className="bg-transparent outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4 px-5 py-2.5 rounded-full bg-white">
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 to-indigo-700 cursor-pointer"
            } text-white font-medium`}
          >
            {loading ? "Processing..." : state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Landing;
