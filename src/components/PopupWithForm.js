function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className='popup__container'>
        <button
          className='button button_type_close'
          type='button'
          aria-label='close'
          onClick={props.onClose}
        ></button>
        <form
          name={`form-${props.name}`}
          className={`popup__form popup__form_type_${props.name}`}
          action='#'
          method='get'
          noValidate
        >
          <h2 className='popup__form-title'>{props.title}</h2>
          {props.children}
          <button type='submit' className='popup__button'>
            {props.submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
