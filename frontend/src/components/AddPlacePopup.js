import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeTitle(e) {
        setTitle(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            title: title,
            link: link,
        })
    }

    React.useEffect(() => {
        setTitle('')
        setLink('')
    }, [isOpen])

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="add-card"
            title="Новое место"
            button="Создать">
            <label className="form__field">
                <input
                    id="title-input"
                    className="form__input form__input_type_title"
                    value={title}
                    onChange={handleChangeTitle}
                    name="title"
                    type="text"
                    placeholder="Название"
                    minLength="1"
                    maxLength="30"
                    required />
                <span className="form__error title-input-error"></span>
            </label>
            <label className="form__field">
                <input
                    id="link-input"
                    className="form__input form__input_type_link"
                    value={link}
                    onChange={handleChangeLink}
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required />
                <span className="form__error link-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup