import { createContext, useEffect, useState } from "react";
import { isTokenExpired } from "../utils/token";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    /* Estado de usuario */
    const [user, setUser] = useState(null) // no logueado


    const navigate = useNavigate();

    const login = (token) => {
        localStorage.setItem("token", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    /* UseEffect para saber si hay token o no */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isTokenExpired(token)) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser(payload);
        }
    }, []);

    console.log(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };