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
            console.log("Usuario conectaado al srvidor, mi id es :",socket.id);
            console.log(socket);
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
        value={{isConnected,setIsConnected}}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContext, SocketProvider}