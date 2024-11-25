import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Publications from './Publication';
import imgBook from '../assets/book.svg';
import imgEdit from '../assets/edit.svg';
import imgLogOff from '../assets/logoff.svg';
import imgDelete from '../assets/delete.svg';

export default function Perfil() {
    const navigate = useNavigate();
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
                    <section className='flex ml-36 mt-8 -mb-4'>
                        <p className='text-slate-100 -ml-2 mr-5 cursor-pointer flex items-center' onClick={openEditModal}>
                            <img className='w-4 mt-px mr-1' src={imgEdit} alt="Edit Image" />
                            Editar
                        </p>
                        <p className='text-slate-100 mr-5 cursor-pointer flex items-center' onClick={handleLogout}>
                            <img className='w-4 mt-px mr-1' src={imgLogOff} alt="LogOff Image" />
                            Sair
                        </p>
                        <p className='text-slate-100 cursor-pointer flex items-center' onClick={openDeleteModal}>
                            <img className='w-4 mt-px mr-1' src={imgDelete} alt="Delete Image" />
                            Deletar
                        </p>
                    </section>
                </div>
            </header>
            <main>
                <Publications />
            </main>

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
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Digite seu nome de usuário"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Digite seu e-mail"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="newPassword">Nova Senha</label>
                                <input 
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Digite sua nova senha"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-black mb-2" htmlFor="biografia">Biografia</label>
                                <textarea 
                                    id="biografia"
                                    value={biografia}
                                    onChange={(e) => setBiografia(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Conte um pouco sobre você"
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
