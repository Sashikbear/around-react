import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newCard = { name: title, link: link };
    onAddPlaceSubmit(newCard);
  }
  return (
    <PopupWithForm
      name='add-card'
      title='New Place'
      submitButton='Create'
      loadingButton='Saving..'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id='title-input'
        name='name'
        className='popup__input popup__input_type_image-title'
        type='text'
        placeholder='Title'
        minLength='1'
        maxLength='30'
        onChange={handleTitleChange}
        value={title || ""}
        required
      />
      <span className='popup__error title-input-error'></span>
      <input
        id='url-input'
        type='url'
        name='url'
        className='popup__input popup__input_type_image-link'
        placeholder='Image Link'
        onChange={handleLinkChange}
        value={link || ""}
        required
      />
      <span className='popup__error url-input-error'></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
