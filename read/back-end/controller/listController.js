import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addBookToList = async (req, res) => {
  const { bookId, statusLeitura } = req.body;
  const userId = req.user.id;

  try {
    let list;
    switch (statusLeitura) {
      case 'Lido':
        list = 'readBooks';
        break;
      case 'Lendo':
        list = 'readingBooks';
        break;
      case 'Vou ler':
        list = 'toReadBooks';
        break;
      default:
        return res.status(400).json({ message: 'Status de leitura inválido' });
    }

    const existingEntry = await prisma[list].findUnique({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId
        }
      }
    });

    if (existingEntry) {
      return res.status(400).json({ message: `O livro já está na lista de ${statusLeitura}.` });
    }

    await prisma[list].create({
      data: {
        userId: userId,
        bookId: bookId
      }
    });

    res.status(201).json({ message: `Livro adicionado à lista de ${statusLeitura}.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar o livro à lista.' });
  }
};

export const removeBookFromList = async (req, res) => {
  const { bookId, statusLeitura } = req.body;
  const userId = req.user.id;

  try {
    let list;
    switch (statusLeitura) {
      case 'Lido':
        list = 'readBooks';
        break;
      case 'Lendo':
        list = 'readingBooks';
        break;
      case 'Vou ler':
        list = 'toReadBooks';
        break;
      default:
        return res.status(400).json({ message: 'Status de leitura inválido' });
    }

    const entry = await prisma[list].findUnique({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId
        }
      }
    });

    if (!entry) {
      return res.status(404).json({ message: 'Livro não encontrado na lista.' });
    }

    await prisma[list].delete({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId
        }
      }
    });

    res.status(200).json({ message: 'Livro removido da lista.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover o livro da lista.' });
  }
};

export const getBooksByStatus = async (req, res) => {
  const { statusLeitura } = req.params;
  const userId = req.user.id;

  try {
    let list;
    switch (statusLeitura) {
      case 'Lido':
        list = 'readBooks';
        break;
      case 'Lendo':
        list = 'readingBooks';
        break;
      case 'Vou ler':
        list = 'toReadBooks';
        break;
      default:
        return res.status(400).json({ message: 'Status de leitura inválido' });
    }

    const books = await prisma[list].findMany({
      where: {
        userId: userId
      },
      include: {
        book: true
      }
    });

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar livros da lista.' });
  }
};
