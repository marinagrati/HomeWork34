import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { lightGreen, pink } from "@material-ui/core/colors";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import { ROUTES } from "./constants";
import { lazy, useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { OpenRoute, PrivateRoute } from "./utils/Routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightGreen[400],
      main: lightGreen[500],
      dark: lightGreen[600],
    },
    secondary: {
      light: pink[400],
      main: pink[500],
      dark: pink[600],
    },
    // default:{
    //   light: pink[400],
    //   main: pink[500],
    //   dark: pink[600],
    // }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 977,
      lg: 1173,
      xl: 1589,
      xxl: 1901,
    },
  },
});

const MainLayout = lazy(() => import(/* webpackChunkName: "MainLayout" */ "./layouts/MainLayout/MainLayout"));
const LoginLayout = lazy(() => import(/* webpackChunkName: "LoginLayout" */ "./layouts/LoginLayout/LoginLayout"));

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [snackbar, setSnackbar] = useState({
    opened: false,
    message: "",
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <StoreContext.Provider
          value={{
            isAuth,
            setIsAuth,
            username,
            setUsername,
            registeredUsers,
            setRegisteredUsers,
            snackbar,
            setSnackbar,
          }}
        >
          <Header />

          {/*работает как обычный switch-case, перебирая роуты*/}
          <Switch>
            <OpenRoute exact path={ROUTES.home} component={LoginLayout} />
            <PrivateRoute exact path={ROUTES.todos} component={MainLayout} auth={isAuth} />
            <Redirect to={ROUTES.home} />
          </Switch>
        </StoreContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
