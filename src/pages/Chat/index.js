import { app } from "../../firebase";
import userlogo from "../../assets/img/user-solid.svg";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  where
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./style.css";
import ChatUsers from "./ChatUsers";
import ChatProfile from "./ChatProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Nomessages from "../../components/Nomessages";
const auth = getAuth(app);
const db = getFirestore(app);

const Chat = () => {
  const [user] = useAuthState(auth);
  const UserRef = collection(db, `users`);
  const queryUser = query(UserRef, where("uid", "==", user?.uid));
  const [getUser] = useCollectionData(queryUser);
  const token = getUser?.map((user) => user?.token);

  const messagesRef = collection(db, `/messages/room/${token?.toString()}`);
  const q = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(q);

  const otherUid = getUser?.map((user) => user?.uidtalk);
  const queryOtherUser = query(
    UserRef,
    where("uid", "==", otherUid?.toString() ?? "")
  );
  const [getOtherUser] = useCollectionData(queryOtherUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_FETCH_REQUESTED" });
  },[dispatch]);

  return (
    <>
      <div className="chat_middle_container">
        <ChatUsers myUser={user} />
        <div className="chat_wrapper">
          <div className="top_bar_messages">
            {getOtherUser?.map((user, index) => {
              return (
                <div className="tphoto" key={index}>
                  <img
                    referrerPolicy="no-referrer"
                    src={!user?.photoURL ? userlogo : user?.photoURL}
                    alt="user"
                  />
                  <div className="name_user_chat">{user?.displayName}</div>
                </div>
              );
            })}
          </div>

          <div className="chatboard">
            {messages?.length === 0 ? (
              <Nomessages />
            ) : (
              messages?.map((msg, index) => (
                <ChatMessage key={index} message={msg} userChat={user} />
              ))
            )}
          </div>
          <ChatInput />
        </div>
        <ChatProfile myUser={user} />
      </div>
    </>
  );
};

export default Chat;
