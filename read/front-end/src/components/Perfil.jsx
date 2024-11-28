import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Publications from './Publication';
import imgBook from '../assets/book.svg';
import imgEdit from '../assets/edit.svg';
import imgLogOff from '../assets/logoff.svg';
import imgDelete from '../assets/delete.svg';
import imgFeed from '../assets/feed.svg';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Perfil() {
    const navigate = useNavigate();
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

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/users/profile`, {
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
            const response = await fetch(`${SERVER_URL}/users/delete`, {
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
            const response = await fetch(`${SERVER_URL}/users/update-User`, {
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
        </>
    );
}
