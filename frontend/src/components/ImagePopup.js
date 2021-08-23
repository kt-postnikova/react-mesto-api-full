import React from 'react';

function ImagePopup(props) {

    return (
        <div className={`popup popup_show-image ${props.card ? ('popup_opened') : ''}`}>
            <figure className="popup__block">
                <button className="popup__close" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
                <img className="popup__image" alt={props.card ? (props.card.name) : ''} src={props.card ? (props.card.link) : ''} />
                <figcaption className="popup__caption">{props.card ? (props.card.name) : ''}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup