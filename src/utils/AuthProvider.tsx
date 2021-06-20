import React, { useEffect, useState, useContext } from "react";
import { auth, googleProvider, fbProvider } from "./initFirebase";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Center } from "@chakra-ui/react";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

interface FirebaseUser {
  updatePassword(value: string): any;
  sendEmailVerification(): any;
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user)
        if (user.emailVerified) {
          router.push("/users/sudi");
        } else {
          router.push("/verifyEmail");
        }
      else {
        router.push("/");
      }
      console.log("Email is not verified");
      setCurrentUser(user);
      console.log("Current user is", user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signup(email: string, password: string) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (credential) {
        console.log("User After signup is", credential);
        if (credential && credential.user.emailVerified === false) {
          credential.user
            .sendEmailVerification({
              url: "http://localhost:3000",
            })
            .then(function () {
              console.log("email verification sent to user");
            });
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
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

  function sendEmailVerification() {
    return currentUser.sendEmailVerification();
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
