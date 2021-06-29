import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import propTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { ROUTES } from "../constants";

const FullPageLoader = () => {
  return <CircularProgress />;
};

export const OpenRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Suspense fallback={<FullPageLoader />}>
        <Component {...props} />
      </Suspense>
    )}
  />
);

// <Route>
//   <Suspense fallback={<FullPageLoader />}>
//         <Component {...props} />
//       </Suspense>
// </Route>

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? (
        <Suspense fallback={<FullPageLoader />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <Redirect to={ROUTES.home} />
      )
    }
  />
);

OpenRoute.propTypes = {
  component: propTypes.object.isRequired,
};

PrivateRoute.propTypes = {
  auth: propTypes.bool.isRequired,
  component: propTypes.object.isRequired,
};
