import React from 'react';

function ConnectForm(props) {
  const [link, setLink] = React.useState();

  function handleInputLink(e) {
    setLink(e.target.value);
  }

  function handleSubmitConnect(e) {
    e.preventDefault();
    props.onConnectChat(link.replace('://', '').split('/')[1]);
    props.onClose();
    setLink('');
  }

  return (
    <form className="popup__form" onSubmit={handleSubmitConnect}>
      <button onClick={props.onClose} className="button-close popup__button-close" type="button"></button>
      <h2 className="popup__title">Connect to chat:</h2>
      <input onChange={handleInputLink} className="popup__input" type="url" value={link || ''} placeholder="Enter your chat link" required />
      <button className="popup__button-add" type="submit">Connect</button>
    </form>
  );
}

export default ConnectForm;
