import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as apiAuth from '../utils/apiAuth';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import okImage from '../images/ok.svg';
import errorImage from '../images/error.svg';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState({ image: '', info: '' });

  const history = useHistory();

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
    setInfoTooltipOpen(false);
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo)
      .then(() => {
        setCurrentUser(Object.assign(currentUser, userInfo));
        setEditProfilePopupOpen(false);
      })
      .catch(err => {
        console.log(err);
      })

  }

  function handleUpdateAvatar(userAvatar) {
    api.editAvatar(userAvatar)
      .then(() => {
        setCurrentUser(Object.assign(currentUser, userAvatar));
        setEditAvatarPopupOpen(false)
      })
      .catch(err => {
        console.log(err);
      })

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

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

  function handleRegisterSubmit(password, email) {
    apiAuth.register(password, email)
      .then(() => {
        setMessage({ image: okImage, info: '???? ?????????????? ????????????????????????????????????!' });
        history.push('/signin')
      })
      .catch(() => {
        setMessage({ image: errorImage, info: '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.' })
      })
      .finally(() => {
        setInfoTooltipOpen(true)
      })
  }

  function handleAuthSubmit(password, email) {
    apiAuth.authorize(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token)
        }
        setLoggedIn(true);
        setEmail(email);
        history.push('./main-page')
      })
      .catch(() => {
        setInfoTooltipOpen(true);
        setMessage({ image: errorImage, info: '??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.' })
      })
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      api.getCards()
        .then((cardsArray) => {
          setCards(cardsArray.reverse());
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [loggedIn])

  function tokenCheck() {
    apiAuth.checkToken()
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.email);
        history.push('./main-page')
      })
      .catch(err => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  function signOut() {
    apiAuth.signOut()
    setLoggedIn(false)
    setCards([])
    setCurrentUser({})
    history.push('/signin')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onSignOut={signOut} />
      <Switch>
        <ProtectedRoute
          exact path="/main-page"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          setCards={setCards} />
        <Route path="/signup">
          <Register onRegister={handleRegisterSubmit} />
        </Route>
        <Route path="/signin">
          <Login onAuth={handleAuthSubmit} />
        </Route>
        <Route path="/">
          {loggedIn ? (<Redirect to="/main-page" />) : (<Redirect to="/signin" />)}
        </Route>
      </Switch>
      <Footer />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        image={message.image}
        info={message.info} />
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
        title="???? ???????????????"
        button="????">
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}>
      </ImagePopup>
    </CurrentUserContext.Provider>
  )
}

export default App;
