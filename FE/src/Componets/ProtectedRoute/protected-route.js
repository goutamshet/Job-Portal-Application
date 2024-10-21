import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../AuthContext/auth-context';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children
    return children;
};

export default ProtectedRoute;
