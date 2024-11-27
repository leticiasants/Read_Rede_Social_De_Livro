import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imgBook from '../assets/book.svg';
import imgLogOff from '../assets/logoff.svg';
import Publications from './Publication';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedBook, setEditedBook] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const navigate = useNavigate();

  const postRefs = useRef([]);
  const optionsRefs = useRef([]);

  // Buscar as postagens com comentários
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/posts/publications`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Erro ao buscar publicações:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar publicações:', error);
      }
    };

    fetchPosts();
  }, []);

  // Alterna visibilidade dos comentários
  const toggleComments = (postId) => {
    setShowComments((prev) => (prev === postId ? null : postId));
  };

  //enviar comentário
  const handleCommentSubmit = async (postId) => {
    if (!commentContent) return;

    try {
      const response = await fetch(`${SERVER_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent }),
        credentials: 'include',
      });

      if (response.ok) {
        const newComment = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, newComment] }
              : post
          )
        );
        setCommentContent('');
        window.location.reload();
      } else {
        console.error('Erro ao enviar comentário:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  // Alterna visibilidade do menu de opções
  const toggleOptions = (postId) => {
    setShowOptions((prev) => (prev === postId ? null : postId));
  };

  // Fechar as opções ao clicar fora
  const handleClickOutside = (event) => {
    postRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        setShowComments((prev) => (prev === posts[index].id ? null : prev));
        setShowOptions((prev) => (prev === posts[index].id ? null : prev));
      }
    });

    optionsRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        setShowOptions((prev) => (prev === posts[index].id ? null : prev));
      }
    });
  };

  // Detecta o clique 
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [posts]);

  // Editar o conteúdo da postagem
  const handleEditPost = (postId) => {
    setEditingPost(postId);
    const post = posts.find((p) => p.id === postId);
    setEditedContent(post.content);
  };

  //salvar a edição
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/posts/${editingPost}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent }),
        credentials: 'include',
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          )
        );
        setEditingPost(null);
        setEditedContent('');
        window.location.reload();
      } else {
        console.error('Erro ao editar a postagem:', response.status);
      }
    } catch (error) {
      console.error('Erro ao editar a postagem:', error);
    }
  };

  // Excluir a postagem
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${SERVER_URL}/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        window.location.reload();
      } else {
        console.error('Erro ao deletar a postagem:', response.status);
      }
    } catch (error) {
      console.error('Erro ao deletar a postagem:', error);
    }
  };

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
          posts.map((post, index) => (
            <div key={post.id} ref={(el) => (postRefs.current[index] = el)} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 relative">
              <div className="flex justify-between items-center relative">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => toggleComments(post.id)}>
                    {post.book?.title || 'Título do Livro Desconhecido'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {post.book?.authors?.join(', ') || 'Autor do Livro Desconhecido'}
                  </p>
                  
                  {/* Autor da postagem */}
                  <p className="text-gray-600 text-sm mt-2">
                    Postado por: <strong>{post.user?.username || 'Usuário Anônimo'}</strong>
                  </p>
                </div>

                {/* Botão de opções */}
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-2 right-2 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOptions(post.id);
                  }}
                >
                  &#8230;
                </button>

                {/* Menu de Opções */}
                {showOptions === post.id && (
                  <div
                    ref={(el) => (optionsRefs.current[index] = el)}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20"
                  >
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>

              {editingPost === post.id ? (
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-gray-700">{post.content}</p>
              )}

              <div>
                <div className={`mt-4 ${showComments === post.id ? 'block' : 'hidden'}`}>
                  <div className="mb-4">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Adicione um comentário..."
                    />
                    <button
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleCommentSubmit(post.id)}
                    >
                      Comentar
                    </button>
                  </div>
                  {post.comments && post.comments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800">Comentários:</h3>
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="mt-2 text-gray-700 relative">
                          <strong>{comment.user?.username || 'Usuário Anônimo'}</strong>
                          <p>{comment.content}</p>

                          {/* Botão de opções do comentário */}
                          <button
                            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCommentOptions(comment.id);
                            }}
                          >
                            &#8230;
                          </button>

                          {/* Menu de Opções do Comentário */}
                          {showOptions === comment.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                              <button
                                onClick={() => handleEditComment(comment.id, comment.content)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                              >
                                Excluir
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma postagem encontrada.</p>
        )}
      </div>
    </div>
  );
}
