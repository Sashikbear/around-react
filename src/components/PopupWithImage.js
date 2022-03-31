function PopupWithImage(props) {
  return (
    <section
      className={`popup popup_type_zoom-card  ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className='popup__zoom-wrapper'>
        <button
          className='button button_type_close button_location_zoom-card'
          type='button'
          aria-label='close'
        ></button>
        <img className='popup__image' src='#' alt='#' />
        <p className='popup__title'></p>
      </div>
    </section>
  );
}
export default PopupWithImage;
