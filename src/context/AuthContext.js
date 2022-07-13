import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function signUp(email, password, input, setError) {
    setPersistence(
      auth,
      input.current.checked
        ? browserLocalPersistence
        : browserSessionPersistence
    );
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => {
        setError(error.message);
      });
    setDoc(doc(db, "users", email), {
      savedMovies: [],
    });
  }

  function login(email, password, input) {
    setPersistence(
      auth,
      input.current.checked
        ? browserLocalPersistence
        : browserSessionPersistence
    );
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem("user", true);
      } else {
        localStorage.removeItem("user");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
