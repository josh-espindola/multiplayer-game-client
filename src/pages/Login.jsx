import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Login = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit =  async (e)=>{
        e.preventDefault();

        try{
            /* 1 - FETCH devuelve promesa => await espera la respuesta http */
            const response = await fetch("http://localhost:3000/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({username, password})
            }) 
            /* 2.- response.ok es falso, sis el statusCode es 4xx o 5xx */
            if(!response.ok){
                const error = await response.json(); // lee el body del error
                throw new Error(error.message); // lanza el mensaje del backend
            }
            /* 3.- response.json(), tambien es una promesa => await lee el body */
            const data = await response.json();
            localStorage.setItem("token",data.token);
            toast.success(`Has iniciado sesión!
                 Bienvenido ${username}`)
            navigate("/game");

        }catch(err){
            toast.error(err.message); // manda el error del backend o de red.
        }
    }    
    return(
        <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <label htmlFor="username">
                Nombre de usuario: 
                <input 
                    id="username"
                    type="text" 
                    placeholder='Nombre de usuario'
                    required
                    onChange={(e)=> {
                        setUsername(e.target.value)
                        console.log("nombre de usuario:",e.target.value)
                    }}
                />    
            </label>
            <label htmlFor="password">
                Contraseña:  
                <input 
                    id="password" 
                    type="text" 
                    placeholder='Contraseña'
                    required
                    onChange={(e)=> {
                        setPassword(e.target.value)
                        console.log("contraseña:",e.target.value)
                    }}
                />
            </label>

        <button type="submit">Iniciar Sesión</button>
        </form>
    )
}

export { Login }