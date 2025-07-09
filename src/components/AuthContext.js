"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAuth, getCurrentUser, logout as signOutUser } from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const checkUser = async () => {
    try {
      await checkAuth();
      const user = getCurrentUser();
      
      // Get user data from session
      const session = await new Promise((resolve) => {
        user.getSession((err, session) => {
          if (err) throw err;
          resolve(session);
        });
      });
      
      const payload = session.getIdToken().decodePayload();
      setUserData({
        email: payload.email,
        initial: payload.email?.charAt(0).toUpperCase() || "",
        plan: payload['custom:plan'] || "free"
      });
      
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const loginSuccess = async () => {
    await checkUser();
  };

  const logout = () => {
    signOutUser();
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userData,
      loginSuccess,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
