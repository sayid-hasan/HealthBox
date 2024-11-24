import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import useAxios from "../Hooks/useAxios";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosNonSecure = useAxios();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  // create user
  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // ONAUTH STATE CHANGE
  useEffect(() => {
    const unsubscrube = onAuthStateChanged(auth, (currentUser) => {
      console.log("current User ", currentUser);
      setUser(currentUser);
      if (currentUser) {
        console.log(currentUser);

        const userInfo = { email: currentUser?.email };
        // sent useremail and get token in response and save it in 1 cookies 2. or localstorage or state/memory
        axiosNonSecure.post("/jwt", userInfo).then((res) => {
          // console.log("token", res.data.token);
          if (res.data.token) {
            localStorage.setItem("access-token", res?.data?.token);
            setLoading(false);
          }
        });
      } else {
        //erase the token from locastorage or cookie or caching or memory
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscrube();
    };
  }, [axiosNonSecure]);

  // login user
  const loginUser = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // LOGIN WITH GOOGLE
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // LOGIN WITH facebook
  const signInWithFacebook = () => {
    facebookProvider.addScope("email");
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  // LOGIN WITH GOOGLE
  const signInWithGithub = () => {
    githubProvider.addScope("email");
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  // update profile

  const updateUserProfile = (username, image) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: image,
    });
  };

  //logout user
  const logOutUser = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };

  const authinfo = {
    user,
    loading,
    setUser,
    setLoading,
    createUser,
    loginUser,
    signInWithGithub,
    signInWithFacebook,
    signInWithGoogle,
    updateUserProfile,
    logOutUser,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
