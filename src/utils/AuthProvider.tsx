import React, { useEffect, useState, useContext } from "react";
import { Spinner } from "@chakra-ui/react";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value="something">
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
