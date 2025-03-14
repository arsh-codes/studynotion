import { Navigate } from "react-router-dom";
import PrivateRouteError from "@pages/PrivateRouteError";
import React from "react";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <PrivateRouteError />;
}
