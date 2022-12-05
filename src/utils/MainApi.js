export const BASE_URL = '//api.movies.nomoredomains.icu';
const token = () => localStorage.getItem('token');

function _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((response) => _checkResponse(response))
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => _checkResponse(response))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
};

export const getProfileInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => _checkResponse(response))
}

export const updateUser = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
        .then((response) => _checkResponse(response))
}

export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => _checkResponse(response))
};

export const saveMovie = (
    {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        id,
    }
) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                country,
                director,
                duration,
                year,
                description,
                image: "https://api.nomoreparties.co" + image.url,
                trailerLink,
                thumbnail: "https://api.nomoreparties.co" + image.formats.thumbnail.url,
                nameRU,
                nameEN,
                movieId: id,
            }
        )
    })
        .then((response) => _checkResponse(response))
};

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => _checkResponse(response))
};
