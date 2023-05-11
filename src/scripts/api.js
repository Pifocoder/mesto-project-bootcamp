export { updateProfileInfo, getProfileInfo, getCards, registerCard, unregisterCard, addReaction, removeReaction, updateProfileAvatar }
const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: '58e60213-80d2-49f3-ad11-fbf6d1aa4eb4',
        'Content-Type': 'application/json'
    }
}
function getResponseData(result) {
    if (!result.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return result.json();
}

function updateProfileInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then((result) => {
        return getResponseData(result);
    })
}

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then((result) => {
        return getResponseData(result);
    })
}

function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then((result) => {
        return getResponseData(result);
    });
}

function unregisterCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((result) => {
        return getResponseData(result);
    });
}
function registerCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((result) => {
        return getResponseData(result);
    });
}
function addReaction(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((result) => {
        return getResponseData(result);
    });
}
function removeReaction(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((result) => {
        return getResponseData(result);
    });
}

function updateProfileAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            'avatar': avatarUrl
        })
    })
    .then((result) => {
        return getResponseData(result);
    });
}