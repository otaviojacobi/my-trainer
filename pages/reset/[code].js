import React, { useState } from "react";
import { useRouter } from "next/router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Copyright from "../../src/components/Copyright";
import useStyles from "../../src/loginRegisterStyle";

function Reset() {
  const classes = useStyles();
  const router = useRouter();

  const [changePwdFailed, setChangePwdFailed] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);

  const sendResetEmail = async event => {
    event.preventDefault();

    setIsChangingPwd(true);

    const password = event.target.password.value;
    const passwordConfirmation = event.target.passwordConfirmation.value;
    const { code } = router.query;

    const res = await fetch(
      `${process.env.MY_TRAINER_BACKEND}/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, code, passwordConfirmation }),
      }
    );

    setIsChangingPwd(false);

    if (res.ok) {
      setChangePwdFailed(false);
      router.push("/login");
    } else {
      setChangePwdFailed(true);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {isChangingPwd ? (
            <CircularProgress className={classes.avatar} color="secondary" />
          ) : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5" color="textPrimary">
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={sendResetEmail}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="New Password Confirmation"
              type="password"
              id="passwordConfirmation"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Password
            </Button>
            {changePwdFailed && (
              <Alert severity="error">Failed to reset password</Alert>
            )}
          </form>
        </div>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default Reset;
