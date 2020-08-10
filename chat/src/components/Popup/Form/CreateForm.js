import React from 'react';

function CreateForm(props) {
  const [chatName, setChatName] = React.useState();

  function handleChangeChatName(e) {
    setChatName(e.target.value);
  }

  function handleSubmitCreate(e) {
    e.preventDefault();
    props.onCreateChat(chatName)
    props.onClose();
    setChatName('');
  }

  return (
    <form className="popup__form" onSubmit={handleSubmitCreate}>
      <button onClick={props.onClose} className="button-close popup__button-close" type="button"></button>
      <h2 className="popup__title">Create chat:</h2>
      <input onChange={handleChangeChatName} className="popup__input" type="text" value={chatName || ''} placeholder="Enter your chat name" required />
      <button className="popup__button-add" type="submit">Create</button>
    </form>
  );
}

export default CreateForm;
