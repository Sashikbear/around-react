import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState();

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
  return (
    <div className='page'>
      <div className='wrapper'>
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onConfirmDeleteClick={handleConfirmDeleteClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          name='profile'
          title='Edit profile'
          submitButton='Save'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id='name-input'
            name='name'
            className='popup__input popup__input_type_name'
            type='text'
            placeholder='Name'
            minLength='2'
            maxLength='40'
            required
          />
          <span className='popup__error name-input-error'></span>
          <input
            id='job-input'
            name='about'
            className='popup__input popup__input_type_job'
            type='text'
            placeholder='About me'
            minLength='2'
            maxLength='200'
            required
          />
          <span className='popup__error job-input-error'></span>
        </PopupWithForm>
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
          name='avatar'
          title='Change profile picture'
          submitButton='Save'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id='avatar-input'
            type='url'
            name='avatar'
            className='popup__input popup__input_type_image-link'
            placeholder='Image Link'
            required
          />
          <span className='popup__error avatar-input-error'></span>
        </PopupWithForm>
        <PopupWithForm
          name='delete'
          title='Are you sure?'
          submitButton='Yes'
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
