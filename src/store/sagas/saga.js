import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  collection,
  getFirestore,
  where,
  query,
  getDocs
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
const db = getFirestore(app);
const auth = getAuth(app);

function* fetchUser() {
  try {
    const user = auth?.currentUser;
    yield put({ type: "USER_FETCH_SUCCEEDED", user });
  } catch (error) {
    console.log(error);
  }
}

function* sendMessages(action) {
  try {
    const state = yield select();
    const user = yield select();
    const token = user?.only.map((user) => user?.token).toString();

    yield put({
      type: "SAVE_MESSAGES",
      token:token,
      act:action,
      user:state
    });
  } catch (error) {
    console.log(error);
  }
}

function fetchUserFromDb() {
  const user = auth?.currentUser;
  const UserRef = collection(db, `users`);
  const q = query(UserRef, where("uid", "==", user?.uid));
  const querySnapshot = getDocs(q);

  return querySnapshot
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

function* getUserForSendMessage() {
  try {
    const { response } = yield call(fetchUserFromDb);
    yield put({
      type: "GET_USER_FOR_SEND_MESSAGE_SUCCESS",
      user: response?.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    });
  } catch (error) {
    console.log(error);
  }
}

function getSignOut() {
  try {
    auth.signOut();
  } catch (error) {
    console.log(error);
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest("SEND_MESSAGES", sendMessages);
  yield takeLatest("SIGN_OUT", getSignOut);
  yield takeLatest("GET_USER_FOR_SEND_MESSAGE", getUserForSendMessage);
}

export default mySaga;
