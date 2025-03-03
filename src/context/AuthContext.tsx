import { createContext, useState, useContext, ReactNode } from "react";
import {
  User,
  LoginCredentials,
  AuthResponse,
  AuthContextType,
} from "../types/auth.types";

//Skapa context
const AuthContext = createContext<AuthContextType | null>(null);

//Interface för context
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
      setUser(data.user);
    } catch {
      throw new Error("Något gick fel...");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
};
