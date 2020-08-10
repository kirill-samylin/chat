module.exports.users = function(massage) {

  this.usersArray = [];
  this.defaultAvatar = 'https://www.meme-arsenal.com/memes/5797b2a42011d8efe33dfc053e62b490.jpg';

  //отправка сообщений
  this.sendMassages= (id, msg) => {
    massage({
      local: id,
      msg: msg
    })
  }

  //находим пользователя
  this.userFind = (id) => {
    return this.usersArray.find((user) => (user.id===id))
  }

  //проверка есть ли такой пользователь
  this.checkUser = (id) => {
    return this.usersArray.some((user) => (user.id===id))
  }

  //добавляем пользователя
  this.insertUser = (data, sendData) => {
    if (!this.checkUser(data.id)) {
      this.usersArray.push({
        id: data.id,
        name: data.name,
        avatar: this.defaultAvatar
      });
      sendData(this.userFind(data.id));
    } else {
      this.sendMassages(data.id, 'Такой пользователь есть')
    }
  }
  //изменяем информацию о пользователе
  this.editProfileUser = (data, cb) => {
    if (this.checkUser(data.id)) {
      const user = this.userFind(data.id);
      user.avatar = data.avatar;
      user.name = data.name;
      cb(true)
    } else {
      this.sendMassages(data.id, 'Такого пользователя нет');
      cb(false)
    }
  }

}
