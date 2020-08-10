import React from 'react';

function EditButton(props) {

  function handleEditChat() {
    props.onEditChat({
      chatId: props.id,
      nameChat: props.nameChat
    });
  }

  return (
    <button onClick={handleEditChat} title="Change name" className="button-edit"></button>
  );
}

export default EditButton;
