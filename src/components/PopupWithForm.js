function PopupWithForm({
  name,
  isOpen,
  title,
  onClose,
  submitButton,
  onSubmit,
  isLoading,
  loadingButton,
  children,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className='popup__container'>
        <button
          className='button button_type_close'
          type='button'
          aria-label='close'
          onClick={onClose}
        ></button>
        <form
          name={`form-${name}`}
          className={`popup__form popup__form_type_${name}`}
          action='#'
          onSubmit={onSubmit}
        >
          <h2 className='popup__form-title'>{title}</h2>
          {children}
          <button type='submit' className='popup__button'>
            {isLoading ? loadingButton : submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
