import { Navigate } from 'react-router';
import { isTokenExpired } from '../utils/token.js';


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        return <Navigate to="/login" />
    }
    return children;
}

export { ProtectedRoute };