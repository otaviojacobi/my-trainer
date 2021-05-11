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

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Copyright from "../../src/components/Copyright";
import DividerWithText from "../../src/components/DividerWithText";
import useStyles from "../../src/loginRegisterStyle";

import Header from "../../src/components/Header/Header";
import HeaderLinks from "../../src/components/Header/HeaderLinks";

function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();

  const [loginFailed, setLoginFailed] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [session] = useSession();

  const credentialsLogin = useCallback(
    async event => {
      event.preventDefault();

      setIsFetchingUser(true);

      const email = event.target.email.value;
      const password = event.target.password.value;

      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setIsFetchingUser(false);

      if (user.ok) {
        router.push("/dashboard");
      } else {
        setLoginFailed(true);
      }
    },
    [router]
  );

  const googleLogin = event => {
    event.preventDefault();

    setIsFetchingUser(true);
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
        color="white"
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
      />
      <br/>
      <br/>
      <br/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {isFetchingUser ? (
            <CircularProgress className={classes.avatar} color="secondary" />
          ) : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5" color="textPrimary">
            {t("LOG_IN")}!
          </Typography>
          <form className={classes.form} onSubmit={credentialsLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("EMAIL_ADDRESS")}
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("PASSWORD")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {loginFailed && (
              <Alert severity="error">
                {t("INVALID_USERNAME_PASSWORD")}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("LOG_IN")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  onClick={() => router.push("/forgot")}
                  variant="body2"
                >
                  {t("FORGOT_PASSWORD")}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  onClick={() => router.push("/signup")}
                  variant="body2"
                >
                  {t("DONT_HAVE_ACC")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <DividerWithText>{t("OR")}</DividerWithText>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default SignIn;
