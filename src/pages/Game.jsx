import  { useEffect, useState} from 'react'
import './game.css'
import { useSocket } from '../context/useSocket.js'
import { useAuth } from '../context/useAuth.js';

const Game = () => {
    const { user } = useAuth();
    const { socket, isConnected } = useSocket();
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
        console.log("Se ha montado la pagina.", socket);
        socket.on("chat",(data)=>{
            setMessage(prev => [...prev,data])
        })

        return ()=> socket.off("chat");
    },[])

    return (
        <section className='gameContainer'>
            <aside>
                <h1> Chat Global</h1>
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
                        value={inputValue}
                        onChange={inputHandler} />
                    <button
                        type="submit">Enviar</button>
                </form>
            </aside>

            <canvas id="canvas" width={800} height={600}></canvas>

        </section>
    )
}

export { Game } 