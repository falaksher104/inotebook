import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = () => {
    let tada;
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/verification", false);
    xhr.setRequestHeader("auth-token", localStorage.getItem("auth-token"));
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const result = JSON.parse(this.response);
        result.error ? (tada = false) : (tada = true);
      }
    };
    xhr.send();
    return tada;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn()) {
          if (rest.otherWay) {
            return (
              <Redirect
                to={{
                  pathname: "/addnote"
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        } else {
          localStorage.removeItem("auth-token");
          if (!rest.otherWay) {
            return (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};