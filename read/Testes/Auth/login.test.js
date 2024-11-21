import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const fetchWithCookies = fetchCookie(fetch);

const apiUrlLogin = 'http://localhost:4000/users/login'; 

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
        console.log('Erro no login. Não é possível continuar.');
        return null;
    }

    console.log('Login:', loginData);
    return loginData; 
};


loginUser();
