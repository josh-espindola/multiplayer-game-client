import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth.js"

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return toast.error("Las contraseñas no coinciden")
        }
        try {
            /* Quitar confirmpassword y guardar la info a guaradr en db */

            const { confirmPassword, ...dataToSend } = form;

            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend)
            })
            /* Si la respuesta falla */
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            /* Si la respuesta es positiva osea response.ok = true */
            const data = await response.json();
            toast.success("Usuario creado correctamente!")
            login(data.token);
            navigate("/game");

        } catch (error) {
            toast.error(error.message);
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <p>Crea tu cuenta para explorar nuestro mundo</p>

                <label htmlFor="username">Nombre de usuario</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={form.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />
                <label htmlFor="confirmPassword">Contraseña</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma contraseña"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Ingrese su Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <button type="submit">Registrarse</button>
            <button onClick={navigate("/")}> Inicio</button>
            </form>



        </>
    )
}
export { Register } 
