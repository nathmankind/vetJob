import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = (children) => {
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;
  return token !== null ? (
    <Route>{children}</Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
};
