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
            headers: this.headers,
        })
            .then(this._getResponseData)
    }

    createCard(inputValues) {
        return fetch(`${this.baseUrl}` + '/cards', {
            method: 'POST',
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
            headers: this.headers,
        })
            .then(this._getResponseData)
    }


    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this.baseUrl}` + '/cards/likes/' + `${cardId}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
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
            headers: this.headers
        })
            .then(this._getResponseData)
    }

    editUserInfo(inputValues) {
        return fetch(`${this.baseUrl}` + '/users/me', {
            method: 'PATCH',
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
            headers: this.headers,
            body: JSON.stringify({
                avatar: inputValues.avatar
            })
        })
            .then(this._getResponseData)
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: 'be14df10-ef56-405e-9870-1c2d83310783',
        'Content-Type': 'application/json'
    }
});

export default api;