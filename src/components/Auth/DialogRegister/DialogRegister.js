import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Dialog, IconButton, Snackbar, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import * as yup from "yup";
import PasswordInput from "../../../layouts/LoginLayout/PasswordInput";
import StoreContext from "../../../StoreContext";
import "../Auth.scss";
import { findUserInDatabase } from "../findUserInDatabase";

const DialogRegister = () => {
  const { setRegisteredUsers, snackbar, setSnackbar } = useContext(StoreContext);

  const { push } = useHistory();
  const { hash } = useLocation();

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email("введи нормальную почту!").required("!!!"),
    password: yup.string().min(8, "Password must be more than 7 characters").required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const register = ({ name, email, password }) => {
    const existingUser = findUserInDatabase({ email }, "email");
    if (existingUser) {
      return setSnackbar({ opened: true, message: "User with this email already registered" });
    }
    const newUser = { name, email, password };
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
    setSnackbar({ opened: true, message: "Successful registration!" });
    reset();
    closeDialog();
  };

  function closeDialog() {
    push({ hash: "" });
  }

  function closeSnackbar() {
    setSnackbar({
      opened: false,
      message: "",
    });
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbar.opened}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbar.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
      <Dialog open={hash === "#register"} className="auth" onClose={closeDialog}>
        <div className="auth__box">
          <h2 className="auth__title">Register</h2>
          <form onSubmit={handleSubmit(register)} className="auth__form">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name*"
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="dense"
                  error={!!errors.name?.message}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />

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
            <PasswordInput control={control} errors={errors} name="confirmPassword" label="Confirm password*" />

            <Button type="submit" fullWidth className="auth__submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default DialogRegister;
