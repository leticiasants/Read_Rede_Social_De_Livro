import React, { useState, useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Publications() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [bookList, setBookList] = useState([]); 
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [authorName, setAuthorName] = useState(''); 
    const [readingStatus, setReadingStatus] = useState('');
    const [publicationContent, setPublicationContent] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        // Buscar os livros do backend
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/posts/books?search=${searchQuery}`, {
                    method: 'GET',  
                    credentials: 'include',  
                });
        
                if (!response.ok) {
                    throw new Error('Erro ao buscar livros');
                }
        
                const data = await response.json();
        
                //a resposta é um array? antes de atualizar o estado
                if (Array.isArray(data)) {
                    setBookList(data); 
                    setFilteredBooks(data); 
                } else {
                    console.error('Resposta inválida:', data);
                }
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            }
        };
        

        fetchBooks();
    }, []);

    useEffect(() => {
        // Filtra os livros com base no que o usuário digitar
        const results = bookList.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(results);
    }, [searchQuery, bookList]);

    const handleOpenForm = () => setIsFormOpen(true);
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedBook(null);
        setAuthorName('');
        setReadingStatus(''); 
        setPublicationContent(''); 
        setSearchQuery(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const postData = {
            content: publicationContent, 
            bookId: selectedBook,         
            statusLeitura: readingStatus,
        };
    
        try {
            const response = await fetch(`${SERVER_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
                credentials: 'include',
            });
    
            if (response.ok) {
                const result = await response.json();
                alert('Publicação criada com sucesso!');
                handleCloseForm();
            } else {
                const error = await response.json();
                alert(`Erro ao criar publicação: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro ao criar publicação:', error);
            alert('Erro ao criar publicação.');
        }
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
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bookSearch">
                                    Nome do Livro:
                                </label>
                                <input
                                    id="bookSearch"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Digite o nome do livro"
                                    required
                                />
                                {filteredBooks.length > 0 && searchQuery && (
                                    <ul className="mt-2 bg-white border rounded-md max-h-40 overflow-y-auto">
                                        {filteredBooks.map((book) => (
                                            <li
                                                key={book.id}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setSelectedBook(book.id);
                                                    setSearchQuery(book.title); 
                                                    setAuthorName(book.authors.join(', ')); 
                                                }}
                                            >
                                                {book.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="authorName">
                                    Nome do Autor:
                                </label>
                                <input
                                    id="authorName"
                                    type="text"
                                    value={authorName}
                                    readOnly 
                                    className="w-full px-4 py-2 border rounded-md"
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
