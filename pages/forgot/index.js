import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

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

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Copyright from "../../src/components/Copyright";
import useStyles from "../../src/loginRegisterStyle";

import Header from "../../src/components/Header/Header";
import HeaderLinks from "../../src/components/Header/HeaderLinks";

function Forgot() {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();

  const [sendEmailFailed, setSendEmailFailed] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const sendResetEmail = useCallback(async event => {
    event.preventDefault();

    setIsSendingEmail(true);

    const email = event.target.email.value;

    const res = await fetch(
      `${process.env.MY_TRAINER_BACKEND}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    setIsSendingEmail(false);

    if (res.ok) {
      setSendEmailFailed(false);
      setEmailSent(true);
    } else {
      setSendEmailFailed(true);
      setEmailSent(false);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <Header
        absolute
        color="white"
        brand="My Trainer"
        rightLinks={<HeaderLinks />}
      />
      <br />
      <br />
      <br />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {isSendingEmail ? (
            <CircularProgress className={classes.avatar} color="secondary" />
          ) : (
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          )}
          <Typography component="h1" variant="h5" color="textPrimary">
            {t("FORGOTTEN_PASSWORD")}
          </Typography>
          <form className={classes.form} onSubmit={sendResetEmail}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("SEND_RESET_EMAIL")}
            </Button>
            {sendEmailFailed && (
              <Alert severity="error">{t("FAILED_SEND_EMAIL")}</Alert>
            )}
            {emailSent && (
              <Alert severity="success">
                {" "}
                {t("SUCCESS_SEND_EMAIL")}
              </Alert>
            )}
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  onClick={() => router.push("/login")}
                  variant="body2"
                >
                  {t("REMEMBER_IT")}
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

export default Forgot;
