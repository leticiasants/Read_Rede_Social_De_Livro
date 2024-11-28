import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Ler o JSON dos livros
  const booksData = JSON.parse(fs.readFileSync('./books.json', 'utf-8'));

  // Filtrar apenas as informações necessárias
  const filteredBooks = booksData.map((book) => ({
    googleId: book.id,
    title: book.volumeInfo.title || null,
    subtitle: book.volumeInfo.subtitle || null,
    description: book.volumeInfo.description || null,
    authors: book.volumeInfo.authors || [],
    publisher: book.volumeInfo.publisher || null,
    pageCount: book.volumeInfo.pageCount || null,
    categories: book.volumeInfo.categories || [],
    averageRating: book.volumeInfo.averageRating || null,
    ratingsCount: book.volumeInfo.ratingsCount || null,
    language: book.volumeInfo.language || null,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail || null,
  }));

  try {
    // Buscar os livros já existentes no banco com base no googleId
    const existingBooks = await prisma.books.findMany({
      where: {
        googleId: {
          in: filteredBooks.map(book => book.googleId),
        },
      },
      select: {
        googleId: true,
      },
    });

    // Criar um conjunto de googleIds já existentes
    const existingGoogleIds = new Set(existingBooks.map(book => book.googleId));

    // Filtrar os livros que não estão no banco de dados
    const newBooks = filteredBooks.filter(book => !existingGoogleIds.has(book.googleId));

    if (newBooks.length > 0) {
      // Inserir os livros novos
      const result = await prisma.books.createMany({
        data: newBooks,
      });
      console.log(`${result.count} novos livros inseridos com sucesso.`);
    } else {
      console.log('Não há novos livros para inserir.');
    }
  } catch (error) {
    console.error('Erro ao inserir livros:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
