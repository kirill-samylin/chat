import React from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function SendMassage(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [massage, setMassage] = React.useState('');

  function handleMassage(e) {
    setMassage(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.onSendMassage({
      chatId: props.chatId,
      userId: currentUser.id,
      massage: massage
    });
    setMassage('');
  }

  return (
    <form onSubmit={handleFormSubmit} className="chat__form">
      <input onChange={handleMassage} className="chat__input" type="text" placeholder="Write" value={massage} />
      <button type="submit" className="chat__button">Send</button>
    </form>
  );
}

export default SendMassage;
