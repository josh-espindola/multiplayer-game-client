import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate();

    const goToLogin = ()=>{
        navigate("/login");
    }

    return (
        <>
            <h1>Home</h1>
            <p>Bienvenido a nuestra Plataforma web</p>

            <p>Ve al login para entrar a nuestro mundo</p>

            <button
            onClick={goToLogin}>Ir al login</button>  
        
        </>
    )

}
export { Home }