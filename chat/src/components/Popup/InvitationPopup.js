
import React from 'react';
import CreateForm from './Form/CreateForm';
import ConnectForm from './Form/ConnectForm';

function InvitationPopup(props) {

  const [addChat, setAddChat] = React.useState(false);

  function formSwitch() {
    setAddChat(!addChat);
  }

  return (
    <div id="form_invite" className={(props.isOpen) ? 'popup popup_opened' : 'popup'}>
      <div className="popup__container">
        <div className="popup__switch">
          <button onClick={formSwitch} className={`popup__button ${addChat && "popup__active"}`}>connect</button>
          <div className="popup__line"></div>
          <button onClick={formSwitch} className={`popup__button ${!addChat && "popup__active"}`}>add</button>
        </div>
        {!addChat ?
          <ConnectForm onClose={props.onClose} onConnectChat={props.onConnectChat} /> :
          <CreateForm onClose={props.onClose} onCreateChat={props.onCreateChat}/>
        }
      </div>
    </div>
  );
}

export default InvitationPopup;
