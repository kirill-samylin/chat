import React from "react";
import Loading from './Loading';
import AuthorizationPopup from './Popup/AuthorizationPopup';
import Page from './Page';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentChatContext } from '../contexts/CurrentChatContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentChat, setCurrentChat] = React.useState([]);
  const [statusPage, setStatusPage] = React.useState(false);
  const [firstUrl, setFirstUrl] = React.useState('/');
  const [lastUrl, setLastUrl] = React.useState('/');
  const [massage, setMassage] = React.useState({
    hidden: null,
    title: '',
    text: ''
  });
  const server = React.useRef();

  function clearWindowMassage() {
    setMassage({
      hidden: null,
      title: '',
      text: ''
    })
  }

  const windowMassage = (style, title, text) => {
    setMassage({
      hidden: style,
      title: title,
      text: text
    })
    setTimeout(clearWindowMassage, 2000)
  }

  //отправляем сообщение
  function sendMassage(msg) {
    server.current.emit('sendMassage', msg);
  }

  //изменяем информацию о профиле
  function updateUser(user) {
    user.id = currentUser.id;
    server.current.emit('editProfileUser', user);
  }

  //подключаемся к чату
  function userConnectToChat(link) {
    server.current.emit('connectionChat', {
      userId: currentUser.id,
      linkChat: link
    });
  }

  //меняем название чата
  function editNameChat(data) {
    data.userId = currentUser.id;
    server.current.emit('editChatName', data);
  }

  //создаем пользователя
  function insertUser(name) {
    server.current.emit('insertUser', {
      id: localStorage.getItem('idLocal'),
      name: name
    });
  }

  //создаем чат
  function insertChat(name) {
    server.current.emit('insertChat', {
      id: currentUser.id,
      name: name
    });
  }

  function deleteForm(id) {
    setFirstUrl('/'+currentChat.find(chat => chat.id === id).link);
    setLastUrl('/'+currentChat[0].link);
    server.current.emit('deleteChat', {
      userId: currentUser.id,
      chatId: id
    });
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if ((window.location.pathname!=='/' && currentChat.length>0 && !currentChat.some(chat => chat.link === window.location.pathname.replace('/', '')))) {
    userConnectToChat(window.location.pathname.replace('/', ''))
  }

  function clickCopy(url) {
    windowMassage('msg_then', 'Save', url)
  }

  React.useEffect(() => {
    server.current = io.connect("http://localhost:8000");
    let massageArray = []; //для добавления сообщения в конец
    const myId = localStorage.getItem('idLocal');

    server.current.on('sendUsersMassage', ({chatId, massage}) => {
      if (massageArray.some((chat) => (chat.id === chatId))) {
        const copyChat = massageArray.concat();
        if (massage.userId!==myId) {
          setMassage({
            hidden: 'msg_then',
            title: 'New massage',
            text: `From "${massage.name}". Massage: ${massage.text}`
          });
          setTimeout(clearWindowMassage, 2000);
        }
        copyChat.find((chat) => (chat.id === chatId)).massages.push(massage);
        setCurrentChat(copyChat);
      }
    });

    server.current.on('userConnect', (data) => {
      if (data.id===myId) {
        document.title = `Welcome ${data.name}`;
        setCurrentUser(data);
      }
    });

    server.current.on('redirectHomePage', ({userId, link}) => {
      if (userId===myId) {
        setFirstUrl(link);
        setLastUrl(massageArray[0]?.link || '/');
      }
    });

    server.current.emit('checkUser', myId);

    server.current.on('allUpdateChats', () =>{ //рендерим все данные
      server.current.emit('checkUser', myId); //это нужно чтобы если кто-то обновил свой профиль
    });

    server.current.on('sendUserChats', (data) => {
      if (data.user===myId) {
        massageArray = data.chats;
        setLastUrl(massageArray[0]?.link || '/')
        setCurrentChat(data.chats);
      }
    });

    if (!myId) {
      localStorage.setItem('idLocal', getRandomIntInclusive(100000000000000, 900000000000000)); //создаем id
    }

    setTimeout(()=>{
      setStatusPage(true)
    }, 500)

  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <CurrentChatContext.Provider value={currentChat}>
      <div className="App">
        {!statusPage ? <Loading /> : currentUser.name ?
        <Page
          onSendMassage={sendMassage}
          onConnectChat={userConnectToChat}
          onUpdateUser={updateUser}
          onEditChat={editNameChat}
          onMassage={massage}
          onCopy={clickCopy}
          onCreateChat={insertChat}
          onConfirmDelete={deleteForm}
          firstUrl={firstUrl}
          lastUrl={lastUrl}
        /> :
        <>
          <AuthorizationPopup onInsertUser={insertUser} />
          {(window.location.pathname!=='/' && currentChat.length===0) ? <Redirect from="/" to="/" /> : null}
        </>
        }
      </div>
    </CurrentChatContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
