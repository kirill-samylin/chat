const io = require('socket.io')();

const port = 8000;
io.listen(port);

const moduleUsers = require('./modules/Users.js');
const moduleChats = require('./modules/Chats.js');

const Users = new moduleUsers.users((msg) => {
  console.log(msg)
});

const Chats = new moduleChats.chats((msg) => {
  console.log(msg)
});

//отправка чатов пользователю
function clientSendChat(userId, chatArray) {
  io.emit('sendUserChats', {
    user: userId,
    chats: chatArray
  });
}

//отправка сообщения пользователям
function clientSendMassage(chatId, massage) {
  io.emit('sendUsersMassage', {chatId, massage});
}

// добавляем информацию о пользователях в чаты
function sendChatUser(userId) {
  Chats.findChatsUser(userId, (chats) => {
    chats.forEach((chat) => {
      chat.users.forEach((user) => {
        const infoUser = Users.userFind(user.id);
        user.avatar = infoUser.avatar;
        user.name = infoUser.name;
      });
      chat.massages.forEach((msg) => {
        const infoUser = Users.userFind(msg.userId);
        msg.avatar = infoUser.avatar;
        msg.name = infoUser.name;
      });
    });
    clientSendChat(userId, chats);
  });
}

//Отправляем созданый чат пользователю
function insertChatForThisUser(user) {
  Chats.insertChat(user, false, (chat) => {
    clientSendChat(user.id, chat)
  });
}
//добавляем сообщение
function insertMassage(data) {
  Chats.insertMassage(data, (massage) => {
    const infoUser = Users.userFind(data.userId);
    massage.avatar = infoUser.avatar;
    massage.name = infoUser.name;
    clientSendMassage(data.chatId, massage);
  });
}
//изменяем информацию о пользователе
function editProfileUser({id, name, avatar}) {
  if (Users.checkUser(id)) {
    const user = Users.userFind(id);
    user.avatar = avatar;
    user.name = name;
    io.emit('userConnect', user);
    io.emit('allUpdateChats'); //обновляем все чаты у тех кто онлайн
  }
}
//изменяем информацию о чате
function editChatName (data) {
  if (Chats.checkChat(+data.id)) {
    Chats.updateName(data, () =>{
      io.emit('allUpdateChats'); //обновляем все чаты у тех кто онлайн
    })
  }
}

//добавляем пользователя в чат
function userConnectChat({userId, linkChat}) {
  if (Users.checkUser(userId) && Chats.checkLink(linkChat)) { //проверяем существование пользователя и чат
    const user = Users.userFind(userId);
    const chat = Chats.findChat('', linkChat);
    if (chat.admin!==userId && !Chats.checkChatUsers(chat.users, userId)) {
      chat.users.push(user)
      io.emit('allUpdateChats');
    } else {
      console.log('error userConnectChat')
    }
  } else {
    io.emit('redirectHomePage', userId);
  }
}

io.on('connection', (socket) => {

  // добавляем пользователя
  socket.on('insertUser', (data) => {
    if (data.name && data.id) {
      Users.insertUser(data, (profile) => {
        insertChatForThisUser(profile);
        io.emit('userConnect', profile);
      });
    }
  });

  // добавляем чат
  socket.on('insertChat', ({id, name}) => {
    if (name && id && Users.checkUser(id)) {
      Chats.insertChat(Users.userFind(id), name, (chat) => {
        io.emit('allUpdateChats');
      });
    }
  });

  // удаляем чат
  socket.on('deleteChat', ({userId, chatId}) => {
    if (userId && chatId>=0 && Users.checkUser(userId)) {
      Chats.deleteChat(chatId, userId, () => {
        io.emit('allUpdateChats');
      })
    }
  });

  // добавляем подключаем пользователя в чат
  socket.on('connectionChat', (data) => {
    if (data.userId && data.linkChat) {
      userConnectChat(data);
    }
  });

  //изменяем информацию о пользователе
  socket.on('editProfileUser', (data) => {
    if (data.id && data.avatar && data.name) {
      editProfileUser(data);
    }
  });

  //изменяем информацию о чате
  socket.on('editChatName', (data) => {
    if ((+data.id)>=0 && data.userId && data.name) {
      editChatName(data);
    }
  });

  // отправляем информацию пользователя
  socket.on('checkUser', (id) => {
    if (Users.checkUser(id)) {
        user = Users.userFind(id);
        socket.emit('userConnect', user);
        sendChatUser(id);
    }
  });

  //добавляем сообщение
  socket.on('sendMassage', (data) => {
    if (data.chatId>=0 && data.userId && data.massage) {
      insertMassage(data);
    }
  });

});
