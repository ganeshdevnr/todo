import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { supabase } from "../supabase";

// 3 things that need to be done
// 1. Create an AuthContextType interface
// 2. Create an AuthContext object which will be shared by other components
// 3. Create a custom hook to call useContext
// 4. Create an Auth Provider

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );

  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    setIsAuthenticated(true);
    setUser({
      email: localStorage.getItem("email") || "",
      id: localStorage.getItem("uid") || "",
    });
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    if (data.session) {
      localStorage.setItem("authToken", data.session.access_token);
      localStorage.setItem("refreshToken", data.session.refresh_token);
      localStorage.setItem("uid", data.user.id);
      localStorage.setItem("email", data.user.email || "");
      setIsAuthenticated(true); // ✅ Store user info in state
      setUser({
        email: data.user.email || "",
        id: data.user.id,
      });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
