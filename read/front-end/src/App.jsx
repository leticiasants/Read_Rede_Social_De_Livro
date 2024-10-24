import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Importando o arquivo de rotas
import imgLogin from './assets/LoginImg.jpg';

function App() {
  return (
    <Router>
      <div className="w-screen h-screen">
        <img src={imgLogin} alt="Login Image" className="w-screen h-screen" />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
