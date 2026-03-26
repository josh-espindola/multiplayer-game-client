import { createContext } from "react";
import { useState, useEffect } from "react";
import  socket  from '../socket.js';
import { useAuth } from "./useAuth.js";



const SocketContext = createContext();

const SocketProvider = ({children})=>{

    const { user } = useAuth();
    const [isConnected,setIsConnected] = useState(socket.connected);
    const [players,setPlayers]= useState([]);

    useEffect(() => {
        /* Si no hay usuario no tiramos effect */
        if(!user) return;

        socket.connect()

        /* Al conectarse el socket desde el cliente. */
        socket.on("connect", () => {
            setIsConnected(true)

            socket.emit("player:join",{
                userId : user.id,
                username: user.username,
            })
            socket.emit("players:update",players)
        })
        
        socket.on("players:update",(playersfromServer) =>{
            setPlayers(playersfromServer);
            
        })

        socket.on("disconnect", () => setIsConnected(false))
        console.log("jugadores en memoria",players)

        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.disconnect()
        }
        }, []
    )

    return(
        <SocketContext.Provider
        value={{
            isConnected,
            socket,
            players,
            setIsConnected}}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContext, SocketProvider}