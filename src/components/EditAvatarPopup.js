import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name='avatar'
      title='Change profile picture'
      submitButton='Save'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='avatar-input'
        type='url'
        name='avatar'
        className='popup__input popup__input_type_image-link'
        placeholder='Image Link'
        ref={inputRef}
        required
      />
      <span className='popup__error avatar-input-error'></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
