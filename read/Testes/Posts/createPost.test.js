import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const apiUrlPost = 'http://localhost:4000/posts';
const apiUrlLogin = 'http://localhost:4000/users/login';

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
    return true;
};

const createPost = async () => {
    const response = await fetchWithCookies(apiUrlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: 'Post teste noturno pro jjj',
        }),
        credentials: 'include',
    });

    const data = await response.json();
    console.log('Post:', data);
};

const testCreatePost = async () => {
    const loggedIn = await loginUser(); 

    if (loggedIn) {
        await createPost();  
    } else {
        console.log('Erro no login. Não é possível criar o post.');
    }
};

testCreatePost();
