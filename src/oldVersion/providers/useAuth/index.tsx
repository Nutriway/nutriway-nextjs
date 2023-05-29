import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginRequest, registerRequest, welcomeEmail } from "../../api/auth";
import api from "../../api";

export type UserType = {
  id: number;
  email: string;
  username: string;
  type: "client" | "consultant" | "nutritionist";
  age: string;
  gender: string;
  height: string;
  weight: string;
  activity: string;
  metabolicRate: number;
  city: string;
  street: string;
  zipCode: string;
  phoneNumber: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createAt: string;
  updateAt: string;
  jwt: string;
};

type AuthProviderType = {
  children: React.ReactNode;
};

interface ContextProps {
  user?: UserType;
  setUser: (user: UserType) => void;
  login: (email: string, password: string) => Promise<any>;
  register: (
    email: string,
    password: string,
    name: string,
    type: "client" | "consultant" | "nutritionist"
  ) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<ContextProps>({
  user: undefined,
  setUser: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => undefined,
});

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType>();

  const fetchAuthenticatedUser = useCallback(async () => {
    const jwt = sessionStorage.getItem("@nutriplan-token");
    if (!user && jwt) {
      //Do a try catch here and move this endpoint to api folder
      const { data: user } = await api(jwt).get("users/me");
      setUser({ ...user, jwt });
    }
  }, [user, setUser]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  const login = async (email: string, password: string) => {
    let userData;

    try {
      userData = await loginRequest(email, password);
    } catch (error) {
      throw new Error("Email/Palavra-passe incorretos");
    }
    if (userData) {
      const { user, jwt } = userData;
      sessionStorage.setItem("@nutriplan-token", jwt);
      setUser({ ...user, jwt });
      return user;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    type: "client" | "consultant" | "nutritionist"
  ) => {
    let userData;

    try {
      userData = await registerRequest(email, password, name, type);
      await welcomeEmail(userData);
    } catch (error) {
      throw new Error("Algum campo incorreto");
    }

    if (userData) {
      const { user, jwt } = userData;
      sessionStorage.setItem("@nutriplan-token", jwt);
      setUser({ ...user, jwt });
      return user;
    }
  };

  const logout = () => {
    setUser(undefined);
    sessionStorage.removeItem("@nutriplan-token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
