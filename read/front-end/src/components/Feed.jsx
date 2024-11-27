import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgBook from '../assets/book.svg';
import imgLogOff from '../assets/logoff.svg';  // Certifique-se de que a imagem de logoff está sendo importada corretamente
import Publications from './Publication';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen w-full">
      <header className="bg-[#081738] text-white py-4 px-8 shadow-md fixed top-0 w-full z-50 flex items-center justify-between">
        <div
          className="bg-[#f1eeee] h-12 w-12 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => navigate('/perfil')}
        >
          <img src={imgBook} alt="Book Icon" className="h-6 w-6" />
        </div>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <img src={imgLogOff} alt="Log Off" className="h-6 w-6 mr-1" />
          <span className="text-sm">Sair</span>
        </div>
      </header>

      {/* Espaço para evitar sobreposição do header */}
      <div className="h-16"></div>

      <div className="mx-auto w-full max-w-4xl">
        <div className="bg-white p-8 shadow-lg rounded-lg mt-8 flex h-20">
          <div className="flex-1 flex items-center">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold text-gray-800">Novo Post</h2>
            </div>
          </div>
          <div className="flex-1 ml-4 flex items-center">
            <div className="mt-4 w-full">
              <Publications />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl mt-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200"
            >
              <p className="text-gray-800 text-lg">{post.content}</p>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg">Nenhuma publicação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
