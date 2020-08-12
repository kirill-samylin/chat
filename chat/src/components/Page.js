import React from 'react';
import Header from './Header';
import Chats from './Chats';
import InvitationPopup from './Popup/InvitationPopup';
import EditProfilePopup from './Popup/EditProfilePopup';
import EditChatPopup from './Popup/EditChatPopup';
import ConfirmPopup from './Popup/ConfirmPopup';
import Massage from './Popup/Massage';

function Page(props) {

  const [isInvitationPopupOpen, setIsInvitationPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditChatPopupOpen, setIsEditChatPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [nameChat, setNameChat] = React.useState();
  const [idChat, setIdChat] = React.useState();

  function handleInvitationClick() {
    setIsInvitationPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditChatClick(chat) {
    setNameChat(chat.nameChat);
    setIdChat(chat.chatId);
    setIsEditChatPopupOpen(true);
  }
  function handleDeleteChatClick(id) {
    setIsConfirmPopupOpen(true)
    setIdChat(id);
  }

  function closeAllPopups() {
    setIsInvitationPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditChatPopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  return (
    <>
      <Header onEditProfile={handleEditProfileClick} />
      <main className="main">
      <Chats
        onSendMassage={props.onSendMassage}
        onAddChat={handleInvitationClick}
        onEditChat={handleEditChatClick}
        onDeleteChat={handleDeleteChatClick}
        onCopy={props.onCopy}
        firstUrl={props.firstUrl}
        lastUrl={props.lastUrl}
      />
      </main>
      <InvitationPopup
        onConnectChat={props.onConnectChat}
        isOpen={isInvitationPopupOpen}
        onClose={closeAllPopups}
        onCreateChat={props.onCreateChat}
      />
      <EditProfilePopup
        onUpdateUser={props.onUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <EditChatPopup
        onEditChat={props.onEditChat}
        id={idChat}
        name={nameChat}
        isOpen={isEditChatPopupOpen}
        onClose={closeAllPopups}
      />
      <ConfirmPopup
        onConfirmDelete={props.onConfirmDelete}
        id={idChat}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
      />
      <Massage onMassage={props.onMassage}/>
    </>
  );
}

export default Page;
