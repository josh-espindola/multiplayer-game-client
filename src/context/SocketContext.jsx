/* CONTROLA CONEXION DEL SOCKET, JUGADORES Y EVENTOS. */
import { createContext } from "react";
import { useState, useEffect } from "react";
import socket from '../socket.js';
import { useAuth } from "./useAuth.js";


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if(!user) return; // sin usuario cortamos flujo


        socket.auth = { token: localStorage.getItem("token")};
        socket.connect()

        /* Evento de socket al conectarse */
        socket.on("connect",()=>{
            setIsConnected(true);
            socket.emit("player:join",{userId: user.id, username: user.username,})

        })

        /* Evento actualizar jugadores online */
        socket.on("players:update",(playersFromServer)=>{
            setPlayers(playersFromServer)})

        /* Evento al desconectar socket */
        socket.on("disconnect",()=>{ setIsConnected(false); })

        return () => {
            socket.off("connect")
            socket.off("player:update")
            socket.off("disconnect")
            socket.disconnect()
        }
    }, [user]);

    return (
        <SocketContext.Provider
            value={{
                isConnected,
                socket,
                players,
                setPlayers,
                setIsConnected
            }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }

