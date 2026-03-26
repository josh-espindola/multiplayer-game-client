import  { useEffect, useState} from 'react'
import './game.css'
import { useSocket } from '../context/useSocket.js'
import { useAuth } from '../context/useAuth.js';
import { Canvas } from '../Components/Canvas.jsx';

const Game = () => {
    const { user, logout } = useAuth();
    const { socket, isConnected, setIsConnected , players ,setPlayers } = useSocket();
    const [messages,setMessage] = useState([])
    const [inputValue,setInputValue] = useState("")


    const inputHandler = (e) => {
        /* Esta seccion es para manejar la logica de guardar lo que se escriba en algun estado o array? o mandarlos a redis? */
        const value = e.target.value;
        setInputValue(value);
    }


    const submitHandler = (e) => {
        /* Esta seccion sería para que al completar el submit del form se envie el evento del socket al servidor.
        aun no creo la funcion*/
        e.preventDefault();
        socket.emit("chat",{ username: user.username, text: inputValue});
        setInputValue("");
        
    }

    useEffect(()=>{
        socket.on("chat",(data)=>{
            setMessage(prev => [...prev,data])
        })          
        return ()=> socket.off("chat");
    },[])


    useEffect(()=>{
        if(!user || !socket) return;
        // Al montar componente pedimos lista de jugadores actuales
        socket.emit("players:get");
      
        return() => socket.off("players:update");
    },[user,socket])


    
    return (
        <section className='gameContainer'>
            <aside>
                <h1> Chat Global</h1>
                <p> Jugadores Online : {players.length}</p>
                <button type="button" onClick={logout}>Logout</button>
                <ul className='message-container'>
                    { messages.map((msg,index)=>(
                        <li key={index}>{msg.username}: {msg.text}</li>
                    ))}
                </ul>
                <form 
                    onSubmit={submitHandler}
                    action="submit">
                    
                          <input
                        required
                        type='text'
                        placeholder='Escribe un mensaje..'
                        value={inputValue}
                        onChange={inputHandler} />
                    <button
                        type="submit">Enviar</button>
                </form>
            </aside>

           <Canvas/>

        </section>
    )
}

export { Game } 