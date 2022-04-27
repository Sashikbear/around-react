import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import FormValidator from "../utils/FormValidator";
import config from "../utils/config";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

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

  useEffect(() => {
    const handleClickClose = (e) => {
      if (e.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    };

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isConfirmDeletePopupOpen ||
      selectedCard
    ) {
      document.addEventListener("click", handleClickClose);
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("click", handleClickClose);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isConfirmDeletePopupOpen,
    selectedCard,
  ]);
  function handleEditAvatarClick() {
    formValidators["form-avatar"].resetValidation();
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    formValidators["form-profile"].resetValidation();
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    formValidators["form-add-card"].resetValidation();
    setIsAddPlacePopupOpen(true);
  }
  const handleConfirmDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedToDeleteCard(card);
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setSelectedToDeleteCard(null);
  }
  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .editProfile({ name: currentUser.name, about: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .editAvatar({ avatar: currentUser.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .createCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  const formValidators = {};

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute("name");
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  enableValidation(config);

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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ConfirmDeletePopup
            isLoading={isLoading}
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            card={selectedToDeleteCard}
          />
          <Footer />{" "}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
