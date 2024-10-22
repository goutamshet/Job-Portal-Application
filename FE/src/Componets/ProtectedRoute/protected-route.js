import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../AuthContext/auth-context';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const token = localStorage.getItem('token'); // Check if token exists in localStorage

    // If not authenticated and no token, redirect to the login page
    if (!isAuthenticated && !token) {
        return <Navigate to="/login" />;
    }

    // If authenticated or token exists, render the children
    return children;
};

export default ProtectedRoute;
