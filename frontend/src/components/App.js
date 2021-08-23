import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});


  React.useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);

    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(card) {
    api.editUserInfo(card)
      .then(res => {
        setCurrentUser(res);

        setEditProfilePopupOpen(false);
      })
      .catch(err => {
        console.log(err);
      })

  }

  function handleUpdateAvatar(card) {
    api.editAvatar(card)
      .then(res => {
        setCurrentUser(res);

        setEditAvatarPopupOpen(false)
      })
      .catch(err => {
        console.log(err);
      })

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter(newArr => {
            return newArr !== card
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(card) {
    api.createCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);

        setAddPlacePopupOpen(false);
      })
      .catch(err => {
        console.log(err);
      })

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        setCards={setCards} />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}>
      </EditProfilePopup>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}>
      </AddPlacePopup>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}>
      </EditAvatarPopup>
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        button="Да">
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}>
      </ImagePopup>
    </CurrentUserContext.Provider>
  )
}

export default App;
