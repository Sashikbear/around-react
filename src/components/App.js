import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({
    name: "user name",
    about: "about user",
    avatar: "user avatar",
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleConfirmDeleteClick() {
    setIsConfirmDeletePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(undefined);
  }
  function handleUpdateUser(currentUser) {
    api
      .editProfile({ name: currentUser.name, about: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleUpdateAvatar(currentUser) {
    api
      .editAvatar({ avatar: currentUser.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  return (
    <div className='page'>
      <div className='wrapper'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onConfirmDeleteClick={handleConfirmDeleteClick}
            onCardClick={handleCardClick}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />{" "}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name='add-card'
            title='New Place'
            submitButton='Create'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              id='title-input'
              name='name'
              className='popup__input popup__input_type_image-title'
              type='text'
              placeholder='Title'
              minLength='1'
              maxLength='30'
              required
            />
            <span className='popup__error title-input-error'></span>
            <input
              id='url-input'
              type='url'
              name='url'
              className='popup__input popup__input_type_image-link'
              placeholder='Image Link'
              required
            />
            <span className='popup__error url-input-error'></span>
          </PopupWithForm>
          <PopupWithForm
            name='delete'
            title='Are you sure?'
            submitButton='Yes'
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />{" "}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
