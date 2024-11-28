import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Recupera o último post de um usuário
export const LatestPost = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
        const lastPost = await prisma.post.findFirst({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' },
        });
        if (lastPost) {
            res.json(lastPost);
        } else {
            res.status(404).json({ message: 'Post não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao recuperar o último post.' });
    }
};

// Cria um novo post
export const createPost = async (req, res) => {
    const { content, bookId, statusLeitura } = req.body;
    const userId = req.user.id;

    try {
        const newPost = await prisma.post.create({
            data: {
                content,
                statusLeitura,
                userId,
                bookId: bookId || null, // Relacionamento opcional com um livro
            },
            include: {
                book: true, // Inclui detalhes do livro relacionado
            },
        });

        res.status(201).json({ message: 'Postagem criada com sucesso!', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar postagem.' });
    }
};

// Edita um post existente
export const editPost = async (req, res) => {
    const { postId } = req.params;
    const { content, bookId, statusLeitura } = req.body;
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
        });

        if (!post) {
            return res.status(404).json({ message: 'Postagem não encontrada.' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ message: 'Você não tem permissão para editar essa postagem.' });
        }

        // Mantém o bookId atual caso não seja fornecido um novo
        const updatedPostData = {
            content: content || post.content, // Atualiza o conteúdo se fornecido
            statusLeitura: statusLeitura || post.statusLeitura, // Atualiza o status se fornecido
            bookId: bookId || post.bookId, // Mantém o bookId atual se não fornecido um novo
        };

        // Atualiza o post
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(postId) },
            data: updatedPostData,
            include: {
                book: true,
            },
        });

        res.status(200).json({ message: 'Postagem atualizada com sucesso!', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao editar postagem.' });
    }
};
  
  // Deleta um post
  export const deletePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      await prisma.post.delete({
        where: { id: parseInt(postId) },
      });
  
      res.status(200).json({ message: 'Postagem deletada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar postagem.' });
    }
  };
  
// Lista livros disponíveis com base na pesquisa
export const listAvailableBooks = async (req, res) => {
    const { search } = req.query;
    try {
        const books = await prisma.books.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            select: {
                id: true,
                title: true,
                authors: true,
            },
        });

        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar livros disponíveis.' });
    }
};
export const listPostsWithComments = async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              username: true,
            },
          },
          book: {
            select: {
              title: true,
              authors: true, 
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      if (!posts.length) {
        return res.status(404).json({ message: 'Nenhuma postagem encontrada.' });
      }
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Erro ao buscar postagens com comentários:', error);
      res.status(500).json({ message: 'Erro ao recuperar postagens.' });
    }
  };
  