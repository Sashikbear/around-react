import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("name");
  const [description, setDescription] = useState("description");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    console.log(name);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    console.log(description);
  }
  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name='profile'
      title='Edit profile'
      submitButton='Save'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='name-input'
        name='name'
        className='popup__input popup__input_type_name'
        type='text'
        placeholder='Name'
        minLength='2'
        maxLength='40'
        value={name}
        onChange={handleNameChange}
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
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className='popup__error job-input-error'></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
