import React, { useState } from 'react';

export default function Publications() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [readingStatus, setReadingStatus] = useState('');
    const [publicationContent, setPublicationContent] = useState('');

    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setBookName('');
        setAuthorName('');
        setReadingStatus('');
        setPublicationContent('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Publicação adicionada:\n
        Nome do Livro: ${bookName}\n
        Nome do Autor: ${authorName}\n
        Status de Leitura: ${readingStatus}\n
        Publicação: ${publicationContent}`);
        handleCloseForm(); 
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                {/* Campo de entrada estilizado como um botão */}
                {!isFormOpen && (
                    <div 
                        onClick={handleOpenForm}
                        className="w-full bg-[#f1f1f1] border border-gray-300 text-gray-600 p-3 rounded-md cursor-pointer text-center shadow-md hover:bg-[#e0e0e0] transition mx-auto"
                    >
                        Adicionar publicação...
                    </div>
                )}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[95%] sm:w-[400px] shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Adicionar Publicação</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bookName">
                                    Nome do Livro:
                                </label>
                                <input
                                    id="bookName"
                                    type="text"
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="authorName">
                                    Nome do Autor:
                                </label>
                                <input
                                    id="authorName"
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="readingStatus">
                                    Status de Leitura:
                                </label>
                                <select
                                    id="readingStatus"
                                    value={readingStatus}
                                    onChange={(e) => setReadingStatus(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="Lendo">Lendo</option>
                                    <option value="Lido">Lido</option>
                                    <option value="Vou ler">Vou ler</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="publicationContent">
                                    Publicação:
                                </label>
                                <textarea
                                    id="publicationContent"
                                    value={publicationContent}
                                    onChange={(e) => setPublicationContent(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md text-sm"
                                    rows="4"
                                    placeholder="Escreva sua publicação aqui..."
                                    required
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    type="submit"
                                    className="bg-[#081738] text-white px-4 py-2 rounded-md shadow hover:bg-[#193778] transition text-sm"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md shadow hover:bg-gray-500 transition text-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
