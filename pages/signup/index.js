import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useSession, signIn } from "next-auth/client";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import GoogleButton from "react-google-button";

import Copyright from "../../src/components/Copyright";
import DividerWithText from "../../src/components/DividerWithText";
import useStyles from "../../src/loginRegisterStyle";

import Header from "../../src/components/Header/Header";
import HeaderLinks from "../../src/components/Header/HeaderLinks";

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();

  const [registerFailed, setRegisterFailed] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [session] = useSession();

  const register = (username, email, password) =>
    fetch(`${process.env.MY_TRAINER_BACKEND}/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

  const credentialsRegister = useCallback(
    async event => {
      event.preventDefault();

      setIsCreatingUser(true);

      const username = `${event.target.firstName.value} ${event.target.lastName.value}`;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const res = await register(username, email, password);

      setIsCreatingUser(false);

      let user = { ok: false };
      if (res.ok) {
        user = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      }
      if (user.ok) {
        setRegisterFailed(false);
        router.push("/dashboard");
      } else {
        setRegisterFailed(true);
      }
    },
    [router]
  );

  const googleLogin = event => {
    event.preventDefault();

    setIsCreatingUser(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/dashboard");
  }, [router]);

  if (session) {
    router.push("/dashboard");
  }

  return (
    <div>
      <Header
        absolute
        color="black"
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
      />
      <br/>
      <br/>
      <br/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {isCreatingUser ? (
            <CircularProgress className={classes.avatar} color="secondary" />
          ) : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5">
            Sign up!
          </Typography>
          <form className={classes.form} onSubmit={credentialsRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            {registerFailed && (
              <Alert severity="error">
                Invalid username, email or password
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="#"
                  onClick={() => router.push("/login")}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <DividerWithText>or</DividerWithText>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleButton type="light" onClick={googleLogin} />
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
