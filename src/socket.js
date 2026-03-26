import { io } from 'socket.io-client';

const URL = "http://localhost:3000";
const socket = io(URL,{
    autoConnect: false,
    auth: {
        token: localStorage.getItem("token")
    },
    reconnection: true,      // por defecto true
    reconnectionAttempts: 2, // número de intentos
    reconnectionDelay: 1000, // tiempo entre intentos
    reconnectionDelayMax: 3000,
    });

export default socket;
