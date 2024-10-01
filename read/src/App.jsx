import Login from './Login';
import imgLogin from './assets/LoginImg.jpg';

function App() {
  return (
    <div className='w-screen h-screen'>
      <img src={imgLogin} alt="Login Image" className='w-screen h-screen' />
      <Login />
    </div>
  );
}

export default App;
