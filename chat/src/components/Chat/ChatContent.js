import React from 'react';
import UserList from './Content/UserList';
import Massage from './Content/Massage';
import SendMassage from './Content/SendMassage';
import EditButton from './Content/EditButton';
import DeleteButton from './Content/DeleteButton';
import { CurrentChatContext } from '../../contexts/CurrentChatContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route } from 'react-router-dom';
import Clipboard from 'react-clipboard-polyfill';

function ChatContent(props) {

  const currentChat = React.useContext(CurrentChatContext);
  const currentUser = React.useContext(CurrentUserContext);

  function clickCopy() {
    props.onCopy(window.location.href);
  }

  return (
    <>
    {currentChat && currentChat.map((chat) => (
    <Route key={chat.id} path={`/${chat.link}`}>
      <div className="chat">
        <div className="chat__communication">
          <div className="chat__header">
            <h2 className="chat__title">{chat.nameChat}</h2>
            {(chat.admin===currentUser.id) ? <EditButton id={chat.id} nameChat={chat.nameChat} onEditChat={props.onEditChat} /> : null}
            <DeleteButton id={chat.id} onDeleteChat={props.onDeleteChat}/>
            <Clipboard render={({ clipboard, copyData }) => (
              <button onClick={() => {
                  clipboard.setData('text/plain', `${window.location.href}`);
                  clipboard.setData('text/html', `${window.location.href}`);
                  clickCopy();
                  copyData();
                }} title={chat.link} className="button-copy">copy link</button>
            )}
            />
          </div>
          <div className="chat-massage__visibility">
            <ul className="chat__massages">
            {chat.massages && chat.massages.map((mgs, i) => (
              <Massage key={i} msg={mgs} />
            ))}
            </ul>
          </div>
          <SendMassage chatId={chat.id} onSendMassage={props.onSendMassage} />
        </div>
        <UserList users={chat.users} />
      </div>
    </Route>
    ))}
    </>
  );
}

export default ChatContent;
