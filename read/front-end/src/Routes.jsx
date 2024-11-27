import { Routes, Route } from 'react-router-dom';
import Auth from './Page/Auth';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import Feed from './components/Feed';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
}

export default AppRoutes;
