export const BASE_URL = 'https://api.project.mesto.nomoredomains.club';
// export const BASE_URL = 'http://localhost:3000';

const getResponse = response => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(getResponse)
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(getResponse)
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            // "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(getResponse)
}

export const logout = () => {
    return fetch(`${BASE_URL}/logout`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    })
}