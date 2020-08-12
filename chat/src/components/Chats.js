import React from 'react';
import ChatList from './Chat/ChatList';
import ChatContent from './Chat/ChatContent';
function Chats(props) {
  return (
    <>
      <ChatList onAddChat={props.onAddChat} firstUrl={props.firstUrl} lastUrl={props.lastUrl}/>
      <ChatContent
        onSendMassage={props.onSendMassage}
        onEditChat={props.onEditChat}
        onCopy={props.onCopy}
        onDeleteChat={props.onDeleteChat}
      />
    </>
  );
}

export default Chats;
