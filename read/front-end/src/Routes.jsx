import { Routes, Route } from 'react-router-dom';
import Auth from './Page/Auth';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default AppRoutes;
