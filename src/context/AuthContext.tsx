import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  User,
  LoginCredentials,
  AuthResponse,
  AuthContextType,
} from "../types/auth.types";

// Skapa context
const AuthContext = createContext<AuthContextType | null>(null);

// Interface för context
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Lägg till en loading state

  // Logga in
  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error("Inloggning misslyckades");
      }

      const data = (await res.json()) as AuthResponse;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch {
      throw new Error("Något gick fel...");
    }
  };

  // Logga ut
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch("http://localhost:3000/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        setUser(data.user);
      } else {
        console.error("Token validation failed:", resp.statusText);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error in checkToken:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false); // När vi har kontrollerat token så stoppar vi loading
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading ? <p>Loading...</p> : children}{" "}
      {/* Lägger till en loading state */}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth måste användas inom en AuthProvider");
  }

  return context;
};
