function Card({ onCardClick, card, onConfirmDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className='card'>
      <div
        className='card__image'
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
      />
      <button
        className='button button_type_delete'
        type='button'
        aria-label='delete'
        onClick={onConfirmDeleteClick}
      ></button>
      <div className='card__info'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__likes'>
          <button
            className='button button_type_like'
            type='button'
            aria-label='like'
          ></button>
          <span className='card__like-counter'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
