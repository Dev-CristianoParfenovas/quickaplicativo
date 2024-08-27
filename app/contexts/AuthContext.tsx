import React, { useState, createContext, ReactNode } from "react";

type AuthContextData = {
  user: userProps;
  isAuthenticated: boolean;
};

type userProps = {
  id: String;
  name: String;
  email: String;
  token: String;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const isAuthenticated = !!user.name; //converte pra booleano

  return (
    //Todas as páginas vão passar aqui
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
