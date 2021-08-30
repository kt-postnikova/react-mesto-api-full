import React from 'react';

class Api extends React.Component {
    constructor(options) {
        super(options);

        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this.baseUrl}` + '/cards', {
            method: 'GET',
            credentials: 'include',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    createCard(inputValues) {
        return fetch(`${this.baseUrl}` + '/cards', {
            method: 'POST',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify({
                name: inputValues.title,
                link: inputValues.link
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}` + '/cards/' + `${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.headers,
        })
            .then(this._getResponseData)
    }


    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this.baseUrl}` + '/cards/' + `${cardId}` + '/likes', {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            credentials: 'include',
            headers: this.headers
        })
            .then(this._getResponseData)
    }


    // putLike(cardId) {
    //     return fetch(`${this.baseUrl}` + '/cards/likes/' + `${cardId}`, {
    //         method: 'PUT',
    //         headers: this.headers,
    //     })
    //         .then(this._getResponseData)
    // }

    // deleteLike(cardId) {
    //     return fetch(`${this.baseUrl}` + '/cards/likes/' + `${cardId}`, {
    //         method: 'DELETE',
    //         headers: this.headers,
    //     })
    //         .then(this._getResponseData)
    // }

    getUserInfo() {
        return fetch(`${this.baseUrl}` + '/users/me', {
            method: 'GET',
            credentials: 'include',
            headers: this.headers
        })
            .then(this._getResponseData)
    }

    editUserInfo(inputValues) {
        return fetch(`${this.baseUrl}` + '/users/me', {
            method: 'PATCH',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.about,
            })
        })
            .then(this._getResponseData)
    }


    editAvatar(inputValues) {
        return fetch(`${this.baseUrl}` + '/users/me/avatar', {
            method: 'PATCH',
            credentials: 'include',
            headers: this.headers,
            body: JSON.stringify({
                avatar: inputValues.avatar
            })
        })
            .then(this._getResponseData)
    }

}

const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://api.project.mesto.nomoredomains.club',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;