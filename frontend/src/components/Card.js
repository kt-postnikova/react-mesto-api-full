import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => {
        return i._id === currentUser._id
    });
    const cardLikeButtonClassName = (
        `like__button ${isLiked ? 'like__button_active' : ''}`
    );
    const cardDeleteButtonClassName = (
        `element__trash-btn ${isOwn ? 'element__trash-btn_visible' : 'element__trash-btn_hidden'}`
    );


    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <>
            <article className="element">
                <img className="element__image" onClick={handleCardClick} alt={props.card.name} src={props.card.link} />
                <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить"></button>
                <div className="element__block">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="like">
                        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Нравится"></button>
                        <span className="like__counter">{props.card.likes.length}</span>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Card;