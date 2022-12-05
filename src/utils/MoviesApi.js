export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
    })
        .then((response) => _checkResponse(response))
};