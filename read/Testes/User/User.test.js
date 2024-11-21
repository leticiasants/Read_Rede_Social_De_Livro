import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';

const fetchWithCookies = fetchCookie(fetch);


const apiUrlDeleteUser = 'http://localhost:4000/users/delete'; 
const apiUrlUpdateProfile = 'http://localhost:4000/users/update-User'; 
const apiUrlLogin = 'http://localhost:4000/users/login'; 

const loginUser = async () => {
    const loginResponse = await fetchWithCookies(apiUrlLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'lll@lll.com',
            password: 'lll123',
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
const updateProfile = async (username, email, password, biography) => {
    console.log("Atualizando perfil...");
    
    const data = {};
    if (username) data.username = username;
    if (email) data.email = email;
    if (password) data.password = password;
    if (biography) data.biography = biography;

    const response = await fetchWithCookies(apiUrlUpdateProfile, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
        credentials: 'include',
    });

    const responseData = await response.json();
    console.log('Perfil Atualizado:', responseData);
};

const testUpdateProfile = async () => {
    const userData = await loginUser();
    if (userData) {
        await updateProfile('lll', null, null, null); 
        await updateProfile(null, null, null, 'Biografia atualizada lll!'); 
        await updateProfile(null, 'lll@lll.com', 'lll123', null); 
    } else {
        console.log('Erro no login. Não é possível atualizar o perfil.');
    }
};


const deleteUser = async () => {
    const response = await fetchWithCookies(apiUrlDeleteUser, {
        method: 'DELETE',
        credentials: 'include', 
    });

    const data = await response.json();
    console.log('Usuário Excluído:', data);
};

const testDeleteUser = async () => {
    const userData = await loginUser(); 

    if (userData) {
        await deleteUser(); 
    } else {
        console.log('Erro no login. Não é possível excluir o usuário.');
    }
};

//testDeleteUser();
testUpdateProfile();