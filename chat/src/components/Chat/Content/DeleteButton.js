import React from 'react';

function DeleteButton(props) {

  function handleDeleteChat() {
    props.onDeleteChat(props.id);
  }

  return (
    <button onClick={handleDeleteChat} title="Delete chat" className="chat__delete"></button>
  );
}

export default DeleteButton;
