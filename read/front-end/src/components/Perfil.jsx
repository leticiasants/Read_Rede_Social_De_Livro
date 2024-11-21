import React, { useState } from 'react';
import imgBook from '../assets/book.svg';

export default function Perfil() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [username, setUsername] = useState('Username');
    const [email, setEmail] = useState('user@example.com');
    const [biografia, setBiografia] = useState('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eveniet aliquam saepe odio reprehenderit, similique praesentium voluptatem dolores magni in vel molestiae sapiente aut cum quod dignissimos ratione amet maiores.');
    const [newPassword, setNewPassword] = useState('');

    const [originalUsername, setOriginalUsername] = useState(username);
    const [originalEmail, setOriginalEmail] = useState(email);
    const [originalBiografia, setOriginalBiografia] = useState(biografia);
    const [originalNewPassword, setOriginalNewPassword] = useState(newPassword);

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

    const handleDelete = () => {
        alert('Perfil deletado!');
        closeDeleteModal();
    };

    const handleSaveEdit = () => {
        alert('Alterações salvas!');
        setOriginalUsername(username);
        setOriginalEmail(email);
        setOriginalBiografia(biografia);
        setOriginalNewPassword(newPassword);
        closeEditModal();
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
                                Biografia: <br /> {biografia}
                            </div>
                        </div>
                    </section>
                    <section className='flex ml-36 mt-8 -mb-4'>
                        <p className='text-slate-100 mr-4 cursor-pointer' onClick={openEditModal}>Editar</p>
                        <p className='text-slate-100 cursor-pointer' onClick={openDeleteModal}>Deletar</p>
                    </section>
                </div>
            </header>
            <main>
                AS PUBLICAÇÕES VÃO VIR AQUI
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
                                    onClick={handleSaveEdit} 
                                    className="bg-[#081738] text-white px-4 py-2 rounded-md">
                                    Salvar
                                </button>
                                <button 
                                    onClick={closeEditModal} 
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md">
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
