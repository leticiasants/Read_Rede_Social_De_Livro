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
            email: 'iii@iii.com',
            password: 'iii123',
        }),
        credentials: 'include',
    });

    const text = await loginResponse.text();
    let loginData = null;
    try {
        loginData = JSON.parse(text);
    } catch (error) {
        console.error("Erro ao parsear JSON:", error);
    }

    if (!loginData) {
        console.log('Erro no login. Não é possível editar o comentário.');
        return false;
    }

    console.log('Login:', loginData);
    return true;
};

const editComment = async (postId, commentId, content) => {
    const url = apiUrlComments
        .replace(':postId', postId)
        .replace(':commentId', commentId);

    console.log("\n \n URL para editar: ", url);

    const response = await fetchWithCookies(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
        credentials: 'include',
    });

    const text = await response.text();

    console.log('Resposta ao editar comentário:', text);

    if (!response.ok) {
        console.error(`Erro ao editar o comentário ${commentId}: ${response.statusText}`);
        return null;
    }

    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        console.error("Erro ao parsear resposta JSON:", error);
        return null;
    }

    return data;
};

const testEditComment = async () => {
    const loggedIn = await loginUser();
    const postId = 9; 
    const commentId = 9; 

    if (loggedIn) {
        const editedComment = await editComment(postId, commentId, 'iii viu jjj deletando o comentario D:');
        if (editedComment) {
            console.log('Comentário editado com sucesso!', editedComment);
        } else {
            console.log('Erro ao editar o comentário.');
        }
    } else {
        console.log('Erro no login. Não é possível editar o comentário.');
    }
};

testEditComment();
