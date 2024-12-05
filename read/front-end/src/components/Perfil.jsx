import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import imgBook from '../assets/book.svg';
import imgEdit from '../assets/edit.svg';
import imgLogOff from '../assets/logoff.svg';
import imgDelete from '../assets/delete.svg';
import imgFeed from '../assets/feed.svg';

export default function Perfil() {const navigate = useNavigate();
    const modalRef = useRef(null);  // Ref para o modal
    const buttonRef = useRef(null); // Ref para o botão "+"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [biografia, setBiografia] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [originalUsername, setOriginalUsername] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');
    const [originalBiografia, setOriginalBiografia] = useState('');
    const [originalNewPassword, setOriginalNewPassword] = useState('');

    const [books, setBooks] = useState([]); // Lista de livros
    const [newBooks, setNewBooks] = useState({
        Lendo: { name: '', author: '' },
        Lido: { name: '', author: '' },
        'Desejo ler': { name: '', author: '' },
    }); // Campos de entrada separados para cada lista

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const openEditModal = () => {
        setOriginalUsername(username);
        setOriginalEmail(email);
        setOriginalBiografia(biografia);
        setOriginalNewPassword(newPassword);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setUsername(originalUsername);
        setEmail(originalEmail);
        setBiografia(originalBiografia);
        setNewPassword(originalNewPassword);
        setIsEditModalOpen(false);
    };

    const addBook = (e, status) => {
        e.preventDefault();
        const newBook = newBooks[status];
        if (newBook.name && newBook.author) {
            setBooks([...books, { ...newBook, status, rating: 0 }]);
            setNewBooks({
                ...newBooks,
                [status]: { name: '', author: '' },
            });
        }
    };

    const deleteBook = (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
    };

    const changeStatus = (index, newStatus) => {
        const updatedBooks = [...books];
        updatedBooks[index].status = newStatus;
        setBooks(updatedBooks);
    };

    const updateRating = (index, newRating) => {
        const updatedBooks = [...books];
        updatedBooks[index].rating = newRating;
        setBooks(updatedBooks);
    };

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:4000/users/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok) {
                    setUsername(data.username);
                    setEmail(data.email);
                    setBiografia(data.biography || '');
                    setOriginalUsername(data.username);
                    setOriginalEmail(data.email);
                    setOriginalBiografia(data.biography || '');
                } else {
                    alert(data.message || 'Erro ao carregar perfil.');
                }
            } catch (error) {
                console.error('Erro ao buscar perfil:', error);
                alert('Erro ao carregar perfil.');
            }
        };

        loadUserProfile();
    }, []);

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:4000/users/delete', {
                method: 'DELETE',
                credentials: 'include',
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert('Perfil deletado com sucesso!');
            } else {
                alert(result.message || 'Erro ao excluir o perfil.');
            }
        } catch (error) {
            console.error('Erro ao deletar perfil:', error);
            alert('Erro ao deletar o perfil.');
        }
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch('http://localhost:4000/users/update-User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password: newPassword, 
                biography: biografia,
            }),
            credentials: 'include',
        });

        const result = await response.json();
        if (response.ok) {
            alert('Alterações salvas!');
            setOriginalUsername(username);
            setOriginalEmail(email);
            setOriginalBiografia(biografia);
            setOriginalNewPassword(newPassword);
            closeEditModal();
            window.location.reload();
        } else {
            alert(result.message || 'Erro ao salvar alterações.');
        }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao salvar alterações.');
        }
    };

    const handleLogout = () => {
        navigate('/login'); 
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Fechar modal ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

    return (
        <>
            <header>
                <div className="w-full p-8 bg-[#081738]">
                    <section className="flex items-center">
                        <div className="w-28 h-28 bg-[#f1eeee] rounded-full flex items-center justify-center">
                            <img src={imgBook} alt="Book Image" className="w-12" />
                        </div>
                        <div className='w-11/12 ml-4'>
                            <p className="ml-4 text-2xl text-slate-100">{username}</p>
                            <div className='ml-4 mt-4 text-slate-100'>
                                {biografia}
                            </div>
                        </div>
                    </section>

                    {/* Botão com "+" dentro de um círculo branco */}
                    <div 
                        ref={buttonRef} 
                        className="absolute top-8 right-8 bg-[#f1eeee] w-16 h-16 rounded-full flex items-center justify-center cursor-pointer" 
                        onClick={toggleModal}>
                        <span className="text-[#081738] text-4xl">+</span>
                    </div>
                </div>
            </header>

            {/* Modal com as opções */}
            {isModalOpen && (
                <div 
                    ref={modalRef} 
                    className="absolute top-14 right-28 bg-[#1b3366] p-4 rounded-lg shadow-lg w-52 z-50">
                    <div className="flex flex-col items-start">
                        <button onClick={() => navigate('/feed')} className="text-[#f1eeee] py-2 px-4 mb-2 w-full text-left flex items-center">
                            <img className='w-4 mr-2' src={imgFeed} alt="Feed Image" />
                            Feed
                        </button>
                        <button onClick={openEditModal} className="text-[#f1eeee] py-2 px-4 mb-2 w-full text-left flex items-center">
                            <img className='w-4 mr-2' src={imgEdit} alt="Edit Image" />
                            Editar
                        </button>
                        <button onClick={handleLogout} className="text-[#f1eeee] py-2 px-4 mb-2 w-full text-left flex items-center">
                            <img className='w-4 mr-2' src={imgLogOff} alt="LogOff Image" />
                            Sair
                        </button>
                        <button onClick={openDeleteModal} className="text-[#f1eeee] py-2 px-4 mb-2 w-full text-left flex items-center">
                            <img className='w-4 mr-2' src={imgDelete} alt="Delete Image" />
                            Deletar
                        </button>
                    </div>

                </div>
            )}

            {/* Modal para Deletar Perfil */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-80">
                        <p className="text-lg text-black mb-4">Deseja realmente deletar o perfil?</p>
                        <div className="flex justify-between">
                            <button 
                                onClick={handleDelete} 
                                className="bg-[#c72137] text-white px-4 py-2 rounded-md">
                                Deletar
                            </button>
                            <button 
                                onClick={closeDeleteModal} 
                                className="bg-[#081738] text-white px-4 py-2 rounded-md">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Editar Perfil */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h2 className="text-lg text-black mb-4">Editar Perfil</h2>

                        <form>
                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="username">Username</label>
                                <input 
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="biografia">Biografia</label>
                                <textarea
                                    id="biografia"
                                    value={biografia}
                                    onChange={(e) => setBiografia(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="password">Nova Senha</label>
                                <input 
                                    id="password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button 
                                    type="button" 
                                    onClick={handleSaveEdit}
                                    className="bg-[#081738] text-white px-4 py-2 rounded-md">
                                    Salvar
                                </button>
                                <button 
                                    type="button" 
                                    onClick={closeEditModal} 
                                    className="bg-[#c72137] text-white px-4 py-2 rounded-md">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <main className="p-4 flex gap-4 justify-center">
                {['Desejo ler', 'Lendo', 'Lido'].map((status) => (
                    <div
                        key={status}
                        className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                        <h3 className="text-lg font-bold text-center mb-4">{status}</h3>

                        <ul>
                            {books
                                .filter((book) => book.status === status)
                                .map((book, index) => (
                                    <li
                                        key={index}
                                        className="relative flex flex-col gap-2 p-2 border rounded bg-white mb-4"
                                    >
                                        <button
                                            className="absolute top-2 right-2"
                                            onClick={() => deleteBook(index)}
                                        >
                                            <img
                                                src={imgDelete}
                                                alt="Delete"
                                                className="w-4 h-4"
                                            />
                                        </button>
                                        <div>
                                            <p className="font-medium">{book.name}</p>
                                            <p className="text-sm text-gray-500">{book.author}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <select
                                                className="p-1 border rounded text-sm"
                                                value={book.status}
                                                onChange={(e) => changeStatus(index, e.target.value)}
                                            >
                                                <option value="Lendo">Lendo</option>
                                                <option value="Lido">Lido</option>
                                                <option value="Desejo ler">Desejo ler</option>
                                            </select>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        onClick={() => updateRating(index, star)}
                                                        className={`cursor-pointer text-lg ${
                                                            book.rating >= star
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>

                        <form onSubmit={(e) => addBook(e, status)} className="mt-4">
                            <input
                                type="text"
                                placeholder="Nome do Livro"
                                value={newBooks[status].name}
                                onChange={(e) =>
                                    setNewBooks({
                                        ...newBooks,
                                        [status]: { ...newBooks[status], name: e.target.value },
                                    })
                                }
                                className="w-full border rounded px-2 py-1 mb-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nome do Autor"
                                value={newBooks[status].author}
                                onChange={(e) =>
                                    setNewBooks({
                                        ...newBooks,
                                        [status]: { ...newBooks[status], author: e.target.value },
                                    })
                                }
                                className="w-full border rounded px-2 py-1 mb-2"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                Adicionar Livro
                            </button>
                        </form>
                    </div>
                ))}
            </main>
        </>
    );
}
