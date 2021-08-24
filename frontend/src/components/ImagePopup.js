import React from 'react';

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_show-image ${card ? ('popup_opened') : ''}`}>
            <figure className="popup__block">
                <button className="popup__close" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="popup__image" alt={card ? (card.name) : ''} src={card ? (card.link) : ''} />
                <figcaption className="popup__caption">{card ? (card.name) : ''}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup