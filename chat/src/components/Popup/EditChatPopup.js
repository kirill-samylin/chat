import React from 'react';

function EditChatPopup(props) {

  const [chatName, setChatName] = React.useState();

  function handleChangeChatName(e) {
    setChatName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (props.name!==chatName) {
      props.onEditChat({
        id: props.id,
        name: chatName
      })
    }
    props.onClose();
  }

  React.useEffect(() => {
    setChatName(props.name);
  }, [props]);

  return (
    <div id="form_chat" className={(props.isOpen) ? 'popup popup_opened' : 'popup'}>
      <form onSubmit={handleSubmit} className="popup__container">
        <button onClick={props.onClose} className="button-close popup__button-close" type="button"></button>
        <h2 className="popup__title">Edit chat</h2>
        <input onChange={handleChangeChatName} className="popup__input" value={chatName || ''} type="text" pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,15}" required />
        <button className="popup__button-add" type="submit">Save</button>
      </form>
    </div>
  );
}
export default EditChatPopup;
