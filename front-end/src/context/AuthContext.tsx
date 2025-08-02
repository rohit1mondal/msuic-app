import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

// Define the User type based on what your backend returns
interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

// Define the context value type
interface AuthContextType {
  backendUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
  checkingAuth: boolean;
  checkAuthStatus: () => Promise<void>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// create the provider component
export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/is-auth`, {
        withCredentials: true,
      });
      // console.log("🟢 /is-auth response", res.data);

      if (res.data.success) {
        setIsLoggedIn(true);
        setUserData(res.data.user);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error: any) {
      // console.log("🔴 /is-auth error", error.response?.data || error.message);
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    checkingAuth,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
