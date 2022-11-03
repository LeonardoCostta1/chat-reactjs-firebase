import "./style.css";
import userlogo from '../../../assets/img/user-solid.svg'
function ChatProfile(props) {
  return (
    <div className="chat_profile_wrapper">
      <div className="user_container">
        <div className="photo">
          <img referrerPolicy="no-referrer" src={!props?.myUser?.photoURL? userlogo : props?.myUser?.photoURL }  alt="user"/>
        </div>
        <div className="displayName">{props?.myUser?.displayName}</div>
        <div className="online_text">online</div>
      </div>
    </div>
  );
}

export default ChatProfile;
