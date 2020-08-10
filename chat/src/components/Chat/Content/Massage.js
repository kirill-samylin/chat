import React from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Massage(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { msg } = props;
  return (
    <li key={msg.id} className="chat__massage">
      <div className="chat__avatar">
        <img className="chat__photo avatar" src={msg.avatar} alt={msg.name} />
      </div>
      <div className="chat__text-massage">
        <div className="chat__text-info">
          <p className="chat__nick">{msg.name} {msg.name===currentUser.name ? <span className="chat__you">(you)</span> : null}</p>
          <p className="chat__time">{msg.time}</p>
        </div>
        <p className="chat__paragraph">{msg.text}</p>
      </div>
    </li>
  );
}

export default Massage;
