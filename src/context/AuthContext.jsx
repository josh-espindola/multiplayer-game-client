import { createContext, useEffect, useState } from "react";
import { isTokenExpired } from "../utils/token";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) // no logueado

    const login = (token) => {
        localStorage.setItem("token", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    /* UseEffect para saber si hay token o no */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isTokenExpired(token)) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser(payload);
        }
    }, []);


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