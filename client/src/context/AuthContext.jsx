import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => { 
  // Định nghĩa một component provider cho AuthContext
  const [isLoggedIn, setIsLoggedIn] = useState( 
    // Khởi tạo state để quản lý trạng thái đăng nhập
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (data) => { // Định nghĩa một hàm để cập nhật trạng thái đăng nhập
    setIsLoggedIn(data); // Cập nhật state với trạng thái đăng nhập mới
  };

  useEffect(() => { // Sử dụng useEffect để thực hiện các tác dụng phụ
    localStorage.setItem("user", JSON.stringify(isLoggedIn)); 
    // Lưu trạng thái đăng nhập vào localStorage mỗi khi nó thay đổi
  }, [isLoggedIn]); // Mảng phụ thuộc để kích hoạt effect khi isLoggedIn thay đổi

  return ( // Trả về context provider với state hiện tại và hàm login
    <AuthContext.Provider value={{ isLoggedIn, login }}> 
      {children}
    </AuthContext.Provider>
  );
};