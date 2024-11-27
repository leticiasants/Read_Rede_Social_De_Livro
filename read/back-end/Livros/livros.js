import axios from 'axios';
import fs from 'fs';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const MAX_RESULTS_PER_PAGE = 40;
const QUERY = 'social'; // Altere para o tema desejado
const OUTPUT_FILE = './books.json';

async function fetchBooks(query, maxResults) {
  let allBooks = [];
  let startIndex = 0;

  console.log(`Iniciando a busca por livros sobre "${query}"...`);

  // Carregar dados existentes, se o arquivo já existir
  if (fs.existsSync(OUTPUT_FILE)) {
    console.log('Carregando dados existentes do arquivo...');
    const existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    allBooks = existingData;
    console.log(`Carregados ${existingData.length} livros existentes.`);
  }

  try {
    while (startIndex < maxResults) {
      console.log(`Buscando livros a partir do índice ${startIndex}...`);

      const response = await axios.get(GOOGLE_BOOKS_API_URL, {
        params: {
          q: query,
          startIndex,
          maxResults: MAX_RESULTS_PER_PAGE,
        },
      });

      const books = response.data.items || [];
      allBooks.push(...books);

      console.log(`Encontrados ${books.length} livros nesta página.`);
      if (books.length < MAX_RESULTS_PER_PAGE) {
        // Se retornar menos que o máximo, não há mais livros
        break;
      }

      startIndex += MAX_RESULTS_PER_PAGE;
    }

    console.log(`Busca finalizada. Total de livros encontrados agora: ${allBooks.length}`);

    // Remover duplicatas pelo `id` do volume
    const uniqueBooks = Array.from(new Map(allBooks.map(book => [book.id, book])).values());

    // Salvar no arquivo JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueBooks, null, 2), 'utf8');
    console.log(`Dados salvos no arquivo ${OUTPUT_FILE}. Total único: ${uniqueBooks.length}`);
  } catch (error) {
    console.error('Erro ao buscar livros:', error.message);
  }
}

// Define o número máximo de livros que você quer buscar
const MAX_BOOKS = 2500; // Ajuste conforme necessário
fetchBooks(QUERY, MAX_BOOKS);
