import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../domain/entities/AuthUser";

import { AuthLocalDataSource } from "../data/datasources/AuthLocalDataSource";
import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { GetCurrentUserUseCase } from "../domain/auth/usecases/GetCurrentUserUseCase";
import { LoginUseCase } from "../domain/auth/usecases/LoginUseCase";
import { LogoutUseCase } from "../domain/auth/usecases/LogoutUseCase";
import { SignupUseCase } from "../domain/auth/usecases/SignupUseCase";



// build the data source → repo → use cases
const localDataSource = new AuthLocalDataSource();
const repository = new AuthRepositoryImpl(localDataSource);

const loginUseCase = new LoginUseCase(repository);
const signupUseCase = new SignupUseCase(repository);
const logoutUseCase = new LogoutUseCase(repository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(repository);

type AuthContextType = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    getCurrentUserUseCase.execute().then(setUser);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUseCase.execute(email, password);
    setUser(loggedInUser);
  };

  const signup = async (email: string, password: string) => {
    const newUser = await signupUseCase.execute(email, password);
    setUser(newUser);
  };

  const logout = async () => {
    await logoutUseCase.execute();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
