import './App.css'
import { ProtectedRoute } from './Components/ProtectedRoute';
import { Login } from './pages/Login';
import { Routes,  Route } from 'react-router';

function App() {

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
