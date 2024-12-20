import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const fetchWithCookies = fetchCookie(fetch);

const apiUrlLogin = 'http://localhost:4000/users/login';
const apiUrlComments = 'http://localhost:4000/posts/:postId/comments/:commentId'; 

const loginUser = async () => {
    const loginResponse = await fetchWithCookies(apiUrlLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'jjj@jjj.com',
            password: 'jjj123',
        }),
        credentials: 'include', // Inclui cookies
    });

    const text = await loginResponse.text();
    let loginData = null;
    try {
        loginData = JSON.parse(text);
    } catch (error) {
        console.error("Erro ao parsear JSON:", error);
    }

    if (!loginData) {
        console.log('Erro no login. Não é possível deletar o comentário.');
        return false;
    }

    console.log('Login:', loginData);
    return true;
};

const deleteComment = async (postId, commentId) => {
    const url = apiUrlComments
        .replace(':postId', postId)
        .replace(':commentId', commentId);

    console.log("\n \n URL para deletar: ", url);

    const response = await fetchWithCookies(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    const text = await response.text();

    console.log('Resposta ao deletar comentário:', text);

    if (!response.ok) {
        console.error(`Erro ao deletar o comentário ${commentId}: ${response.statusText}`);
        return null;
    }

    return true;
};

const testDeleteComment = async () => {
    const loggedIn = await loginUser();
    const postId = 9; 
    const commentId = 8;

    if (loggedIn) {
        const success = await deleteComment(postId, commentId);
        if (success) {
            console.log('Comentário deletado com sucesso!');
        } else {
            console.log('Erro ao deletar o comentário.');
        }
    } else {
        console.log('Erro no login. Não é possível deletar o comentário.');
    }
};

testDeleteComment();
