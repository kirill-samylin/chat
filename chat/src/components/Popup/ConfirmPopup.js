import React from 'react';

function ConfirmPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onClose();
    props.onConfirmDelete(props.id);
  }

  return (
    <div id="form_confirmation" className={`popup ${props.isOpen && 'popup popup_opened'}`}>
      <form className="popup__container" method="post" action="#">
        <button onClick={props.onClose} className="button-close popup__button-close" type="button"></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <button onClick={handleSubmit} className="popup__button-add" type="submit">Да</button>
      </form>
    </div>
  );
}
export default ConfirmPopup;
