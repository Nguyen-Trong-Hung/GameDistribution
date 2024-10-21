import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => { 
  const [isLoggedIn, setIsLoggedIn] = useState( 
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (data) => {
    setIsLoggedIn(data);
  };

  const logout = () => {
    setIsLoggedIn(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};