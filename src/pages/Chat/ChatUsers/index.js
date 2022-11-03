import "./style.css";
import { app } from "../../../firebase";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import userlogo from "../../../assets/img/user-solid.svg";
const db = getFirestore(app);

function ChatUsers(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("displayName"));
  const [users] = useCollectionData(q);

  const criarConversa = async (user) => {
    if (props?.myUser?.uid > user?.uid) {
      await updateDoc(doc(usersRef, props?.myUser?.uid), {
        token: props?.myUser?.uid + user?.uid,
        uidtalk: user?.uid
      });

      await updateDoc(doc(usersRef, user?.uid), {
        token: props?.myUser?.uid + user?.uid,
        uidtalk: props?.myUser?.uid
      });

      dispatch({ type: "GET_USER_FOR_SEND_MESSAGE" });
    } else {
      await updateDoc(doc(usersRef, props?.myUser?.uid), {
        token: user?.uid + props?.myUser?.uid,
        uidtalk: user?.uid
      });

      await updateDoc(doc(usersRef, user?.uid), {
        token: user?.uid + props?.myUser?.uid,
        uidtalk: props?.myUser?.uid
      });
      dispatch({ type: "GET_USER_FOR_SEND_MESSAGE" });
    }
  };

  const sair = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <div className="chat_user_wrapper">
      <div className="logo_wrapper">
        <div className="logo">
          <i className="fa-solid fa-circle"></i> Studio
        </div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button"
          }}
        >
          <MenuItem onClick={sair}>Logout</MenuItem>
        </Menu>
      </div>
      <div className="top_bar">
        <input type="user" placeholder="Pesquisar Colaboradores" />
      </div>

      <div className="users_container_scroll">
        {users?.map((user, index) => {
          return (
            <div key={index}>
              {props?.myUser?.uid !== user?.uid && (
                <div className="user_box" onClick={() => criarConversa(user)}>
                  <div className="us">
                    <img
                      referrerPolicy="no-referrer"
                      src={!user.photoURL ? userlogo : user.photoURL}
                      alt="user"
                    ></img>
                    <div className="username">
                      {user.displayName}

                      <div className="last_message">
                        Our current product focuses on helping so
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatUsers;
