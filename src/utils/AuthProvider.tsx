import React, { useEffect, useState, useContext } from "react";
import { auth, googleProvider, fbProvider } from "./initFirebase";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

interface FirebaseUser {
  updatePassword(value: string): any;
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) router.push("/");
      setCurrentUser(user);
      console.log("Current user is", user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
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

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.40s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
