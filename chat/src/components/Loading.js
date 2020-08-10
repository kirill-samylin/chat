import React from 'react';
import loading from '../images/loading.gif';

function Loading() {
  return (
    <>
    <img className="loading" src={loading} alt="Загрузка" />
    </>
  );
}

export default Loading;
