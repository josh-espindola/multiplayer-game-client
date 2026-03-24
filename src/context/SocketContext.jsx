import { createContext } from "react";
import { useState, useEffect } from "react";
import  socket  from '../socket.js';

const SocketContext = createContext();

const SocketProvider = ({children})=>{
    const [isConnected,setIsConnected] = useState(socket.connected);

    /* Iniciar conexion al servidor, con el token como auth */
    useEffect(() => {
        socket.connect()

        socket.on("connect", () => {
            setIsConnected(true)
            console.log("se ha creado la conexion al socket desde el Provider");
        })
        socket.on("disconnect", () => setIsConnected(false))

        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.disconnect()
        }
        }, [])

    return(
        <SocketContext.Provider
        value={{
            isConnected,
            socket,
            setIsConnected}}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContext, SocketProvider}