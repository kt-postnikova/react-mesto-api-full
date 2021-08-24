import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }


    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, isOpen])


    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="user-info"
            title="Редактировать профиль"
            button="Сохранить">
            <label className="form__field">
                <input
                    id="name-input"
                    className="form__input form__input_type_name"
                    value={name || ''}
                    onChange={handleChangeName}
                    name="name"
                    type="text"
                    minLength="2"
                    maxLength="40"
                    required />
                <span className="form__error name-input-error"></span>
            </label>
            <label className="form__field">
                <input
                    id="about-input"
                    className="form__input form__input_type_about"
                    value={description || ''}
                    onChange={handleChangeDescription}
                    name="about"
                    type="text"
                    minLength="2"
                    maxLength="200"
                    required />
                <span className="form__error about-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup