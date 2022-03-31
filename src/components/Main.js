import { useState, useEffect } from "react";
import api from "../utils/api";
function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getUserInfo().then((userData) => {
      console.log(userData);
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((cardsData) => {
      console.log(cardsData);
      setCards(cardsData);
    });
  }, []);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__column'>
          <div className='profile__image-area'>
            <div
              className='profile__image'
              style={{ backgroundImage: `url(${userAvatar})` }}
            ></div>
            <div
              className='profile__image-overlay'
              onClick={props.onEditAvatarClick}
            ></div>
          </div>

          <div className='profile__info'>
            <div className='profile__user'>
              <h1 className='profile__user-name'>{userName}</h1>

              <button
                className='button button_type_edit'
                type='button'
                aria-label='edit'
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className='profile__user-job'>{userDescription}</p>
          </div>
        </div>

        <button
          className='button button_type_add'
          type='button'
          aria-label='add'
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      {props.children}

      <section className='cards'>
        <ul className='cards__card-grid'>
          {cards.map((card) => (
            <li className='card' key={card._id}>
              <div
                className='card__image'
                style={{ backgroundImage: `url(${card.link})` }}
              />
              <button
                className='button button_type_delete'
                type='button'
                aria-label='delete'
              ></button>
              <div className='card__info'>
                <h2 className='card__title'></h2>
                <div className='card__likes'>
                  <button
                    className='button button_type_like'
                    type='button'
                    aria-label='like'
                  ></button>
                  <span className='card__like-counter'></span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
