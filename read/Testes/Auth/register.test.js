import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const apiUrl = 'http://localhost:4000/users/register';

const fetchWithCookies = fetchCookie(fetch);

const registerUser = async () => {
    const registerResponse = await fetchWithCookies(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'lll',
            email: 'lll@lll.com',
            password: 'lll123',
            password2: 'lll123',
        }),
        credentials: 'include',
    });

    const text = await registerResponse.text();
    let registerData = null;
    try {
        registerData = JSON.parse(text);
    } catch (error) {
        console.error("Erro ao parsear JSON:", error);
    }

    if (!registerData) {
        console.log('Erro no registro. Não é possível criar o usuário.');
        return false;
    }

    console.log('Usuário registrado com sucesso:', registerData);
    return registerData;
};

const testUserRegistration = async () => {
    const registration = await registerUser();
    if (registration) {
        console.log('Registro bem-sucedido.');
    } else {
        console.log('Erro no registro do usuário.');
    }
};

testUserRegistration();
