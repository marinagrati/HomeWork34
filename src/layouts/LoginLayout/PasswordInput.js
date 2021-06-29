import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const PasswordInput = ({
  control,
  errors,
  name = "password",
  label = "Password*",
  variant = "outlined",
  size = "small",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          variant={variant}
          type={showPassword ? "text" : "password"}
          size={size}
          fullWidth
          margin="dense"
          error={!!errors[name]?.message}
          helperText={errors[name]?.message}
          {...field}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color={!!errors[name]?.message ? "secondary" : "default"}
                  size="small"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default PasswordInput;
