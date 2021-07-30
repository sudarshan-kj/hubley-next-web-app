import React, { useEffect, useState, useContext } from "react";
import { auth, googleProvider, fbProvider } from "./initFirebase";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createNewUser } from "features/user/userSlice";
import { Center } from "@chakra-ui/react";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const emailVerificationRedirectUrl = "http://localhost:3000";

interface FirebaseUser {
  updatePassword(value: string): any;
  sendEmailVerification({ url: any }): any;
  emailVerified: string;
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(
          "ID Token is",
          user.getIdToken(true).then((token) => console.log("Token is", token))
        );
        router.push("/events/create");
      } else {
        router.push("/");
      }
      setCurrentUser(user);
      console.log("Current user is", user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signup(name: string, email: string, password: string) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (credential) {
        const user = {
          userName: name,
          userEmail: email,
          userFirebaseId: "RandomId",
        };
        console.log(
          "MAIN TOKEN is",
          credential.user
            .getIdToken(true)
            .then((token) => dispatch(createNewUser(user)))
        );

        if (credential && credential.user.emailVerified === false) {
          // credential.user
          //   .sendEmailVerification({
          //     url: `${emailVerificationRedirectUrl}`,
          //   })
          //   .then(function () {
          //     console.log("email verification sent to user");
          //   });
        }
      }); //catch is removed so that it is handled in the await code block under common input section
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password: string) {
    return currentUser.updatePassword(password);
  }

  function sendEmailVerification({ url }) {
    return currentUser.sendEmailVerification({
      url: `${emailVerificationRedirectUrl}`,
    });
  }

  function signInWithGoogle() {
    return auth.signInWithPopup(googleProvider);
  }

  function signInWithFacebook() {
    return auth.signInWithPopup(fbProvider);
  }

  const value = {
    currentUser,
    signInWithGoogle,
    signInWithFacebook,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    sendEmailVerification,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.40s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
          />
        </Center>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
