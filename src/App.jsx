import './App.css'
import { ProtectedRoute } from './Components/ProtectedRoute';
import { useAuth } from './context/useAuth.js';
import { Login } from './pages/Login';
import { Routes,  Route } from 'react-router';

function App() {
  const {user} = useAuth();
  console.log("Usuario Actual",user)

  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/login" element={<Login/>}/>
      <Route 
        path="/register" 
        element=
          {<h1>Register</h1>}/>

      <Route 
        path="/game" 
        element={
         <ProtectedRoute>
            <h1>Game</h1>
          </ProtectedRoute>}
      />
      
    </Routes>
  )
}
export default App
