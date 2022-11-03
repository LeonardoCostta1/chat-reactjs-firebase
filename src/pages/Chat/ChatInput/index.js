import "./style.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LCButton from "../../../components/LCButton";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const openEmoji = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    dispatch({ type: "SEND_MESSAGES", payload: message });
    setMessage("");
  };

  return (
    <div className="chat_input_wrapper">
      <button className={`open_emoji ${open}`} onClick={() => openEmoji()}>
        <i className="fa-regular fa-face-smile"></i>
      </button>
      <form onSubmit={sendMessage}>
        {open ? (
          <Picker
            className="emoji_container"
            data={data}
            onEmojiSelect={(e) =>
              setMessage([...message, ...e.native].join(""))
            }
          />
        ) : (
          ""
        )}

        <input
          type="text"
          value={message}
          placeholder="digite sua mensagem"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <LCButton/>
      </form>
    </div>
  );
}

export default ChatInput;
