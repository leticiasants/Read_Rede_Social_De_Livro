import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './register';
import imgLogin from './assets/LoginImg.jpg';

function App() {
  return (
  //  <div className='w-screen h-screen'>
  //    <img src={imgLogin} alt="Login Image" className='w-screen h-screen' />
  //    <Login />
  //    <Register />
  //  </div>
  //);
    <Router>
        <div className='w-screen h-screen'>
          <img src={imgLogin} alt="Login Image" className='w-screen h-screen' />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App;
