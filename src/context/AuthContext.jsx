/* CONTROLA USUARIO Y TOKEN */
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



    /*Detectar token al iniciar la app*/
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) console.log("no hay token guardado");
        /* Si hay token al iniciar la app, extraerlo setear usuario y mandar evento de actualización. */
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
                logout,
            }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };