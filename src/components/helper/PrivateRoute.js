// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { isLoggedIn } from "../../services/AuthService";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const history = useHistory();

  // let loggedIn;
  // isLoggedIn().then((res) => {
  //   console.log(res, "ressss");
  //   loggedIn = res;
  // });

  const loggedIn = isLoggedIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
