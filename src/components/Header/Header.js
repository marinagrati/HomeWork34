import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import "./Header.scss";
import { ROUTES } from "../../constants";
import StoreContext from "../../StoreContext";

const Header = () => {
  const { username, setUsername, isAuth, setIsAuth } = useContext(StoreContext);
  const { push } = useHistory();

  function logout() {
    if (isAuth) {
      localStorage.removeItem("auth");
      setIsAuth(false);
      setUsername("");
      push(ROUTES.home);
    }
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header__box">
          <Link to={ROUTES.home} className="header__logo">
            <img src={logo} alt="" />
            {/*<img src={require("../../assets/img/logo.svg").default} alt="" />*/}
          </Link>

          <nav className="header__nav">
            <NavLink exact to={ROUTES.home}>
              Login
            </NavLink>
            <NavLink exact to={ROUTES.todos}>
              Todos
            </NavLink>
          </nav>

          {username ? username : null}

          <Button onClick={logout}>{isAuth ? "Logout" : "Login"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
