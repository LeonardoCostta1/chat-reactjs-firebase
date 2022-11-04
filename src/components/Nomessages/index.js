import React from "react";

import "./style.css";

function Nomessages() {
  return (
    <div className="nomessages_wrapper">
      <div className='logo'><i className="fa-solid fa-circle"></i> Studio</div>
      <div className="initial_text">
        - inicie uma conversa <span>agora !</span> -
      </div>
      <div class="intro-text">
        Envie e receba mensagens sem precisar manter seu celular conectado à
        internet.
        <br />
        Use o WhatsApp em até quatro aparelhos conectados e um celular ao mesmo
        tempo.
      </div>
    </div>
  );
}

export default Nomessages;
