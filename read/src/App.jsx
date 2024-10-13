import Auth from "./Page/Auth";
import imgLogin from "./assets/LoginImg.jpg";

function App() {
  return (
    <div className="w-screen h-screen">
      <img src={imgLogin} alt="Login Image" className="w-screen h-screen" />
      <Auth />
    </div>
  );
}

export default App;
