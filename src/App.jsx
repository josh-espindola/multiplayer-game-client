import './App.css'
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
/* import { useAuth } from './context/useAuth.js'; */
import { Login } from './pages/Login';
import { Routes, Route } from 'react-router';
import { SocketProvider } from './context/SocketContext.jsx';

function App() {
/*   const { user } = useAuth();
  console.log("Usuario Actual", user)
 */
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element=
        {<h1>Register</h1>} />

      <Route
        path="/game"
        element={
          <SocketProvider>
            <ProtectedRoute>
              <h1>Game</h1>
            </ProtectedRoute>
          </SocketProvider>
        }
      />

    </Routes>
  )
}
export default App
