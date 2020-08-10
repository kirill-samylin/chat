import React from 'react';
import pencil from '../images/pencil.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__user">
        <p className="header__nick">{currentUser.name || ''}</p>
        <button onClick={props.onEditProfile} className="header__avatar">
          <img className="header__photo avatar" src={currentUser.avatar || ''} alt="user" />
          <img className="header__pencil" src={pencil} alt="pencil" />
        </button>
      </div>
    </header>
  );
}

export default Header;
