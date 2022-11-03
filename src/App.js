// import React, { Suspense } from "react";
import "./App.css";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { app } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
// import Loading from "./components/Loading";

function App() {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  return (
      <div className="App">{user ? <Chat /> : <Login />}</div>
  );
}
export default App;
