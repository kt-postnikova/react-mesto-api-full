import React from 'react';

function PopupWithForm({ name, isOpen, onClose, onSubmit, title, children, button }) {

    return (
        <>
            <div className={`popup popup_type_${name} ${isOpen ? ('popup_opened') : ''}`}>
                <div className="popup__container">
                    <button className="popup__close" onClick={onClose} type="button" aria-label="Закрыть"></button>
                    <form
                        className="form"
                        onSubmit={onSubmit}
                        id={name}
                        name={name}>
                        <h2 className="form__header">{title}</h2>
                        {children}
                        <button className="form__button" type="submit">{button}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PopupWithForm;