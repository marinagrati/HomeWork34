import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import * as yup from "yup";
import { ROUTES } from "../../../constants";
import PasswordInput from "../../../layouts/LoginLayout/PasswordInput";
import StoreContext from "../../../StoreContext";
import "../Auth.scss";
import { findUserInDatabase } from "../findUserInDatabase";

const DialogLogin = () => {
  const { setIsAuth, setUsername, setSnackbar } = useContext(StoreContext);

  const { push } = useHistory();
  const { hash } = useLocation();

  const schema = yup.object().shape({
    email: yup.string().email("введи нормальную почту!").required("!!!"),
    password: yup.string().min(8, "Password must be more than 7 characters").required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const login = ({ email, password }) => {
    const existingUser = findUserInDatabase({ email, password }, "allFields");

    if (!existingUser) {
      return setSnackbar({ opened: true, message: "Wrong credentials" });
    }

    reset();
    closeDialog();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
    push(ROUTES.todos);
    setUsername(email);
  };

  function closeDialog() {
    push({ hash: "" });
  }

  return (
    <Dialog open={hash === "#login"} className="auth" onClose={closeDialog}>
      <div className="auth__box">
        <h2 className="auth__title">Login</h2>
        <form onSubmit={handleSubmit(login)} className="auth__form">
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  label="Email*"
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  {...field}
                />
              );
            }}
          />

          <PasswordInput control={control} errors={errors} />

          <Button type="submit" fullWidth className="auth__submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default DialogLogin;
