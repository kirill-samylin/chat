import React from 'react';
function UserList(props) {
  return (
    <div className="chat-users">
      <h2 className="chat-users__title">Users:</h2>
      <div className="chat-users__visibility">
        <ul className="chat-users__list">
        {props.users && props.users.map((user, i) => (
          <li key={i} className="chat-users__item">
            <div className="chat-users__avatar">
              <img className="chat-users__photo avatar" src={user.avatar} alt={user.name} />
            </div>
            <p className="chat-users__nick">{user.name}</p>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
