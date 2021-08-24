import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => {
        return i._id === currentUser._id
    });
    const cardLikeButtonClassName = (
        `like__button ${isLiked ? 'like__button_active' : ''}`
    );
    const cardDeleteButtonClassName = (
        `element__trash-btn ${isOwn ? 'element__trash-btn_visible' : 'element__trash-btn_hidden'}`
    );


    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <article className="element">
            <img className="element__image" onClick={handleCardClick} alt={card.name} src={card.link} />
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить"></button>
            <div className="element__block">
                <h2 className="element__title">{card.name}</h2>
                <div className="like">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Нравится"></button>
                    <span className="like__counter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;