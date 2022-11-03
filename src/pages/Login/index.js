import { app } from "../../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import "./style.css";
import { useState } from "react";

const Login = () => {
  const db = getFirestore(app);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          token: Math.floor(
            Math.random() * (Math.floor(99) - Math.ceil(0)) + Math.ceil(0)
          )
        });
      })
      .catch((error) => {});
  };

  const createAccountWithEmailSenha = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: display,
          photoURL: user.photoURL,
          token: Math.floor(
            Math.random() * (Math.floor(99) - Math.ceil(0)) + Math.ceil(0)
          )
        });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  };


const signInWithEmailAndPAssword=(e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
  });
}

  return (
    <div className="login_wrapper">
      <div className="login_container">
        <div className="logo_login"><i className="fa-solid fa-circle"></i> Studio</div>
        <div className="headline">Create your Account</div>
        <div className="sub_headline">Enter the fields below to get strated</div>

        <form onSubmit={signInWithEmailAndPAssword}>
          <input
            type="email"
            placeholder="digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {/* <input
            type="text"
            placeholder="digite seu nome"
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
          ></input> */}
          <button type="submit">Sign In</button>
        </form>
        <div className="divisa"> - Or Sign in with - </div>
        <button onClick={() => signInWithGoogle()}>
          <i className="fa-brands fa-google"></i> <span>Google</span>
        </button>

        <div className="register">
          {" "}
          - Don't Have an Account? <span>Register Now</span> -{" "}
        </div>
      </div>
    </div>
  );
};
export default Login;
