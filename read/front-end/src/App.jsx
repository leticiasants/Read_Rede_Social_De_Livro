import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes'; // Importando o arquivo de rotas

function App() {
  return (
    <Router>
      <div className="w-screen h-screen">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
