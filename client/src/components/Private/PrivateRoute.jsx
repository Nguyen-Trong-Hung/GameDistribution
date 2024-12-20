import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children, requiredRole }) => {
    // const { user } = useContext(AuthContext);

    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/" />;
    }
    try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
            return <Navigate to="/" />;
        }

        if (requiredRole && decodedToken.role !== requiredRole) {
            return <Navigate to="/" />;
        }
        return children;
    } catch (error) {
        console.error("Token error", error);
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;