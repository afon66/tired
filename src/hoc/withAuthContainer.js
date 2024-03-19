import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;
    return <Component {...props} />;
  }

  let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
  });

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
}