import React from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="edit-avatar"
            title="Обновить аватар"
            button="Сохранить">
            <label className="form__field form__field_under">
                <input
                    id="avatar-input"
                    ref={avatarRef}
                    className="form__input form__input_type_avatar"
                    name="link"
                    type="url"
                    required />
                <span className="form__error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;