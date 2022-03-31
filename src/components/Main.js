function Main(props) {
  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__column'>
          <div className='profile__image-area'>
            <div className='profile__image'></div>
            <div
              className='profile__image-overlay'
              onClick={props.onEditAvatarClick}
            ></div>
          </div>

          <div className='profile__info'>
            <div className='profile__user'>
              <h1 className='profile__user-name'></h1>

              <button
                className='button button_type_edit'
                type='button'
                aria-label='edit'
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className='profile__user-job'></p>
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
        <ul className='cards__card-grid'></ul>
      </section>
    </main>
  );
}

export default Main;
