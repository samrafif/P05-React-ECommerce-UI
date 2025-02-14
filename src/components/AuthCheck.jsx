import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AuthCheck = ({ user, Component, ...props }) => {
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user]);

  return <Component {...props} />;
};

export default AuthCheck;
