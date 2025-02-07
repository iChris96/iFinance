import React, { useContext, createContext } from "react";
import PropTypes from "prop-types";
import { useStorageState } from "../hooks/useStorageState";

const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export const SessionProvider = ({ children }) => {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = (value) => {
    const k = JSON.stringify(value);
    console.log({ k });
    setSession(k);
  };

  const signOut = () => {
    console.log("signOut");
    setSession(null);
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
