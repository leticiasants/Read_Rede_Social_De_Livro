import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const fetchWithCookies = fetchCookie(fetch);

const apiUrlPosts = 'http://localhost:4000/posts/:postId/comments';
const apiUrlLogin = 'http://localhost:4000/users/login';

const loginUser = async () => {
    const loginResponse = await fetchWithCookies(apiUrlLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'ccc@ccc.com',
            password: 'ccc123',
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
        console.log('Erro no login. Não é possível continuar.');
        return null;
    }

    console.log('Login:', loginData);
    return true;
};

const createComment = async (postId, content) => {
  console.log("\n \n Conteudo: ", content);
  const url = apiUrlPosts.replace(':postId', postId);
  console.log("\n \n NOVA URL ", url)
    const response = await fetchWithCookies(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
        }),
        credentials: 'include',
    });

    const data = await response.json();
    console.log('Comentário Criado:', data);
};

const testCreateComment = async () => {
    const userData = await loginUser();
    console.log("usuario logou");
    if (userData) {
        await createComment(2, 'ccc tambem comenta no post do aaa sobre um livro');
    } else {
        console.log('Erro no login. Não é possível criar comentário.');
    }
};

testCreateComment();
