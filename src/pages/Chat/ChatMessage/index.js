import { useEffect, useRef } from "react";
import "./style.css";
import { useSelector } from "react-redux";

const ChatMessage = (props) => {
  const user = useSelector((state) => state.user);
  
  const ViewRef = useRef();

  useEffect(() => {
    ViewRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props]);

  const messageClass = props.message.user === user?.uid ? "sent" : "received";
  return (
    <div className="board_messages_wrapper" ref={ViewRef}>
      <div className={`messages ${messageClass}`}>
        <img
          referrerPolicy="no-referrer"
          src={props?.message?.photoURL}
          alt="user"
        ></img>
        <div className="displayname">{props.message.username}</div>
        <div className="text_message">{props.message.text}</div>
        <div className="timestamp">
          {props?.message?.createdAt.toDate().toLocaleTimeString("pt-BR").substring(0, 5)}
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;
