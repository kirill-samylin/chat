module.exports.chats = function(msg) {

  this.chats = [];
  this.numberIdChat = 0;
  this.numberIdMassage = 0;

  //генерируем ссылку для чата
  this._generationLink = () => {
    let link = '';
    const possible = 'abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM';
    for( let i=0; i < 16; i++ )
      link += possible.charAt(Math.floor(Math.random() * possible.length));

    return link;
  }

  //время сейчас
  this._getTime = () => {
    const time = new Date();
    const hours = ((''+time.getHours()).length===1) ? ('0'+ time.getHours()) : time.getHours();
    const minute = ((''+time.getMinutes()).length===1) ? ('0'+time.getMinutes()) : time.getMinutes();
    const day = ((''+time.getDate()).length===1) ? ('0'+time.getDate()) : time.getDate();
    const month = ((''+time.getMonth()).length===1) ? ('0'+(time.getMonth()+1)) : (time.getMonth()+1);
    const year = time.getFullYear();

    return `${hours}:${minute} ${day}.${month}.${year}`;

  }

  //проверка на рабочую ссылку
  this.checkLink = (link) => {
    return this.chats.some((chat) => (chat.link===link))
  }

  //есть ли пользователь в чате
  this.checkChatUsers = (userList, id) => {
    return userList.some((user) => (user.id===id))
  }

  //проверка на сущесвование чата
  this.checkChat = (id) => {
    return this.chats.some((chat) => (chat.id===id))
  }

  //найти чат
  this.findChat = (id, link) => {
    return this.chats.find((chat) => (chat.id===id || chat.link===link))
  }

  //найти чат
  this.mapChat = (userId) => {
    return this.chats.map((chat) => (chat.admin===userId || this.checkChatUsers(chat.users, userId)))
  }

  //Все чаты где есть пользователь
  this.findChatsUser = (userId, cb) => {
    //получаем все чаты пользователя
    const userChats = this.chats.filter((chat) => chat.admin===userId || this.checkChatUsers(chat.users, userId));
    cb(userChats);
  }

  //Создаем чат пользователю
  this.insertChat = (user, name, cb) => {
    const newChat = {
      id: this.numberIdChat,
      nameChat: name || user.name,
      admin: user.id,
      users: [{id: user.id, name: user.name, avatar: user.avatar }],
      massages: [],
      link: this._generationLink()
    };
    this.chats.push(newChat);
    this.numberIdChat++;
    cb([newChat])
  }

  //Удаляем чат
  this.deleteChat = (chatId, userId, cb) => {
    const chat = this.findChat(chatId);
    if (chat.admin===userId) {
      this.chats = this.chats.filter((item) => item.id!==chatId);
      cb();
    } else if (this.checkChatUsers(chat.users, userId)) {
      this.chats.find((item) => item.id===chatId).users = chat.users.filter((user) => user.id!==userId);
      cb();
    }
  }

  //сообщение
  this.insertMassage = ({chatId, userId, massage}, cb) => {
    //проверяем существование чата и пользователя в нем
    if (this.checkChat(chatId)) {
      const chat = this.findChat(chatId);
      if (this.checkChatUsers(chat.users, userId)) {
        const newMassage = {
          id: this.numberIdMassage,
          chatId: chatId,
          userId: userId,
          text: massage,
          time: this._getTime()
        };
        chat.massages.push(newMassage);
        this.numberIdMassage++
        cb(newMassage);
        return
      }
    }
  }
  this.updateName = ({id, name, userId}, cb) => {
    if (this.chats.some((chat) => (chat.id===+id && chat.admin===userId))) {
      this.chats.find((chat) => (chat.id===+id && chat.admin===userId)).nameChat = name;
      cb()
    }
  }
}
