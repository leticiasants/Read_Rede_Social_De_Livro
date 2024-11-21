import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const apiUrl = 'http://localhost:4000/posts'; 
const apiUrlLogin = 'http://localhost:4000/users/login';
const postId = 1; 

const fetchWithCookies = fetchCookie(fetch);


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
        console.log('Erro no login. Não é possível criar o post.');
        return false; 
    }

    console.log('Login:', loginData);
    return loginData;
};


const getLastPost = async (userId) => {
    const response = await fetchWithCookies(`http://localhost:4000/posts/latest/${userId}`, {
        method: 'GET',
        credentials: 'include',
    });

    const post = await response.json();
    console.log('Último post:', post);
    return post;
};

const deletePost = async (postId) => {
    const response = await fetchWithCookies(`${apiUrl}/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const data = await response.json();
    console.log(data);
};


const testPost = async () => {
    const loggedIn = await loginUser(); 
    console.log("USER ID: ", loggedIn.id);
    if (loggedIn) {
        const userId = loggedIn.id; 
        const lastPost = await getLastPost(userId);
        if (lastPost) {
            await deletePost(lastPost.id);
        } else {
            console.log('Nenhum post encontrado para o usuário.');
        }
    } else {
        console.log('Erro no login.');
    }
};

testPost();