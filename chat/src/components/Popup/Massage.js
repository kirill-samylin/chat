import React from 'react';
function Massage(props) {
  const { onMassage } = props;
  return (
    <div className={onMassage.hidden ? `msg ${onMassage.hidden}` : 'msg'}>
      <h2 className="msg__title"> {onMassage.title}:</h2>
      <p className="msg__text"> {onMassage.text}</p>
    </div>
  );
}

export default Massage;
