import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import DialogLogin from "../../components/Auth/DialogLogin/DialogLogin";
import "./LoginLayout.scss";
import DialogRegister from "../../components/Auth/DialogRegister/DialogRegister";

const LoginLayout = () => {
  const { push } = useHistory();

  function openAuthDialog(dialogName) {
    push({ hash: dialogName });
  }

  return (
    <>
      <div className="login-layout">
        <Button
          className="login-layout__btn"
          color="primary"
          variant="contained"
          onClick={() => openAuthDialog("login")}
        >
          Login
        </Button>
        <Button
          className="login-layout__btn"
          color="primary"
          variant="contained"
          onClick={() => openAuthDialog("register")}
        >
          Register
        </Button>
      </div>

      <DialogLogin />
      <DialogRegister />
    </>
  );
};

export default LoginLayout;
