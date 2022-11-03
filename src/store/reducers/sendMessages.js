import {
  addDoc,
  collection,
  Timestamp,
  getFirestore
} from "firebase/firestore";
import { app } from "../../firebase";
const db = getFirestore(app);

const sendMessagesReducer = (state = [], action) => {
  switch (action.type) {
    case "SAVE_MESSAGES":
      addDoc(collection(db, "messages", "room", action.token ?? "all"), {
        text: action?.act?.payload,
        createdAt: Timestamp.fromDate(new Date()),
        user: action?.user?.user?.uid,
        username: action?.user?.user?.displayName,
        photoURL: action?.user?.user?.photoURL
      }).catch((error) => {
        console.log(error);
      });
      return action.user;
    default:
      return state;
  }
};

export default sendMessagesReducer;
