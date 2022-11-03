import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { Container } from './styles';

function Loading() {
  const dispatch = useDispatch();
  useEffect(() => {
    alert('rolou')
    dispatch({ type: "USER_FETCH_REQUESTED" });
  });

  return <div>CARREGANDO...</div>;
}

export default Loading;
