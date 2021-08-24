import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import profileAddButton from '../images/add-button.svg';
import Card from './Card'


function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="content page__content">
            <section className="profile content__profile">
                <div className="profile__block">
                    <div className="avatar" onClick={onEditAvatar}>
                        <div className="avatar__overlay"></div>
                        <img className="avatar__image" src={currentUser.avatar} alt="Аватар пользователя" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button" onClick={onEditProfile} type="button" aria-label="Редактировать профиль"></button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={onAddPlace}><img src={profileAddButton} alt="Создать"
                    className="profile__add-button-img" /></button>
            </section>
            <section id="elements" className="elements content__elements">
                {
                    cards.map(card =>
                    (<Card
                        key={card._id}
                        card={card}
                        currentUser={currentUser}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}>
                    </Card>
                    ))
                }
            </section>
        </main >
    );
}

export default Main;