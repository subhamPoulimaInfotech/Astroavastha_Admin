import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    if (!token) {
        return <Navigate to="/login" replace={true}></Navigate>;
    }
    return children;
};

export default PrivateRoute;
