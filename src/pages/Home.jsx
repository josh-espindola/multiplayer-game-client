import { useNavigate , Link} from 'react-router'

const Home = () => {
    const navigate = useNavigate();

    const goToLogin = ()=>{
        navigate("/login");
    }

    return (
        <>
            <form>
            <h1>Home</h1>
            <p>Bienvenido a nuestra Plataforma web</p>

            <p>Ve al login para entrar a nuestro mundo</p>

            <button 
                type="button"
                onClick={goToLogin}>Ir al login</button> 
            <Link to="/register">¿No tienes una cuenta?. Registrate aquí.</Link>
            </form> 
        </>
    )

}
export { Home }