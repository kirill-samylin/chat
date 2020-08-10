import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentChatContext } from '../../contexts/CurrentChatContext';
import { NavLink, Redirect} from 'react-router-dom';

function ChatList(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const currentChat = React.useContext(CurrentChatContext);

  return (
    <aside className="chats">
      <ul className="chats__channels">
        {currentChat && currentChat.map((chat) => (
          <li key={chat.id} className="chats__channel">
            <NavLink activeClassName="chats__name_active" to={`/${chat.link}`} className="chats__name">
              <span className="chats__span">{chat.nameChat}</span>
              <span className="chats__my">
                {(chat.admin===currentUser.id) ? '(my)' : null}
              </span>
            </NavLink>
          </li>
        ))}
        {(window.location.pathname==='/') ? <Redirect from="/" to={currentChat.length>0 ? currentChat[0].link : "/"} /> : null}
      </ul>
      <button onClick={props.onAddChat} title="Add chat" className="chats__add-channel"></button>
    </aside>
  );
}

export default ChatList;
