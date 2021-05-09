import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Copyright from "../../src/components/Copyright";
import DividerWithText from "../../src/components/DividerWithText";
import useStyles from "../../src/loginRegisterStyle";

import { useSession, signIn } from "next-auth/client";

export default function Forgot() {
  const classes = useStyles();
  const router = useRouter();

  const [sendEmailFailed, setSendEmailFailed] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [session, loading] = useSession();

  const sendResetEmail = useCallback(async (event) => {
    event.preventDefault();

    setIsSendingEmail(true);

    const email = event.target.email.value;

    const res = await fetch(`${process.env.MY_TRAINER_BACKEND}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setIsSendingEmail(false);

    if(res.ok) {
        setSendEmailFailed(false);
        setEmailSent(true);
    } else {
        setEmailSent(false);
        setSendEmailFailed(true);
    }

  }, []);

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/login");
  }, []);

  if (session) {
    router.push("/dashboard");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {isSendingEmail ? (
          <CircularProgress className={classes.avatar} color={"secondary"} />
        ) : (
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5">
          Forgotten Password
        </Typography>
        <form className={classes.form} onSubmit={sendResetEmail}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Reset Email
          </Button>
          {sendEmailFailed && <Alert severity="error" >Failed to send reset e-mail</Alert>}
          {emailSent && <Alert severity="success" > An e-mail was sent with following instructions !</Alert>}
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                onClick={() => router.push("/login")}
                variant="body2"
              >
                Remembered it? Login
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                onClick={() => router.push("/signup")}
                variant="body2"
              >
                Don't have an account ? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
