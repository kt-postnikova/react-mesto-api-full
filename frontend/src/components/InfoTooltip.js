import React from 'react';

function InfoTooltip({ name, isOpen, onClose, image, info }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? ('popup_opened') : ''}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="tooltip__image" src={image} alt={info} />
                <p className="tooltip__info">{info}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;