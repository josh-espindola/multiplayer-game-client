import './App.css'
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
/* import { useAuth } from './context/useAuth.js'; */
import { Login } from './pages/Login.jsx';
import { Routes, Route } from 'react-router';
import { SocketProvider } from './context/SocketContext.jsx';
import { Game } from './pages/Game.jsx';
import { Home } from './pages/Home.jsx';
import { Register } from './pages/Register.jsx';

function App() {
  /*   const { user } = useAuth();
    console.log("Usuario Actual", user)
   */
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/game" element=
      {
        <SocketProvider>
          <ProtectedRoute>
            <Game/>
          </ProtectedRoute>
        </SocketProvider>
      }
      />

    </Routes>
  )
}
export default App
