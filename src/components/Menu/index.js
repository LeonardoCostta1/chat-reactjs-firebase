import React from 'react';
import { useDispatch } from 'react-redux';
import'./style.css';

function Menu() {
  const dispatch = useDispatch();

  const sair =()=>{
    dispatch({ type: "SIGN_OUT" });
  }

  return <div className='menu_wrapper'>
    <div className='menu_wrapper'>
      <div className='logo'><i className="fa-solid fa-circle"></i> Studio</div>
      <div className='sair' onClick={sair}>sair <i className="fa-regular fa-circle-xmark"></i></div>
    </div>
  </div>;
}

export default Menu;