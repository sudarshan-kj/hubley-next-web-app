import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import router from "next/router";

const CustomRouter = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.emailVerified && router.pathname !== "/verifyEmail") {
        router.push("/verifyEmail");
      }
    }
  }, [router.pathname, currentUser]);

  return <>{children}</>;
};

export default CustomRouter;
