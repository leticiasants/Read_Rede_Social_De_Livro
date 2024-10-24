import { Routes, Route } from 'react-router-dom';
import Auth from './Page/Auth';
import Login from './components/Login';
import Register from './components/Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
