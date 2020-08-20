
import React from 'react';

function AuthorizationPopup(props) {

  const [name, setName] = React.useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    props.onInsertUser(name);
  }

  return (
    <div id="form_auth" className="popup popup_opened">
      <form onSubmit={handleFormSubmit} className="popup__container popup__container_black">
        <h2 className="popup__title popup__title_black">Authorization:</h2>
        <input onChange={handleChangeName} className="popup__input popup__input_black" placeholder="username" type="text" pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,15}" value={name || '' } />
        <button className="popup__button-add" type="submit">Login</button>
      </form>
    </div>
  );
}
export default AuthorizationPopup;
