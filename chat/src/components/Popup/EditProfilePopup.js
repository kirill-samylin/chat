import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState();
  const [avatar, setAvatar] = React.useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleAvatarLink(e) {
    setAvatar(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      avatar: avatar,
    });
    props.onClose();
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  return (
    <div id="form_profile" className={(props.isOpen) ? 'popup popup_opened' : 'popup'}>
      <form onSubmit={handleSubmit} className="popup__container">
        <button onClick={props.onClose} className="button-close popup__button-close" type="button"></button>
        <h2 className="popup__title">Edit profile</h2>
        <input onChange={handleChangeName} className="popup__input" value={name || ''} type="text" pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,15}" required />
        <input onChange={handleAvatarLink} className="popup__input" type="url" value={avatar || ''} minLength="5" placeholder="Enter link" required />
        <button className="popup__button-add" type="submit">Save</button>
      </form>
    </div>
  );
}
export default EditProfilePopup;
