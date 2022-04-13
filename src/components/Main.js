import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardClick,
  onConfirmDeleteClick,
}) {
  const [cards, setCards] = useState([]);

  const currentUser = useContext(CurrentUserContext);

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

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__column'>
          <div className='profile__image-area'>
            <div
              className='profile__image'
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <div
              className='profile__image-overlay'
              onClick={onEditAvatarClick}
            ></div>
          </div>

          <div className='profile__info'>
            <div className='profile__user'>
              <h1 className='profile__user-name'>{currentUser.name}</h1>

              <button
                className='button button_type_edit'
                type='button'
                aria-label='edit'
                onClick={onEditProfileClick}
              ></button>
            </div>
            <p className='profile__user-job'>{currentUser.about}</p>
          </div>
        </div>

        <button
          className='button button_type_add'
          type='button'
          aria-label='add'
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className='cards'>
        <ul className='cards__card-grid'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onConfirmDeleteClick={onConfirmDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;