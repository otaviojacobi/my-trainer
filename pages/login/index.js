import React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Copyright from '../../src/components/Copyright';
import useStyles from '../../src/loginRegisterStyle';

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();

  const [loginFailed, setLoginFailed] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  const login = (email, password) => {
    return fetch(`${process.env.MY_TRAINER_BACKEND}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: email,
        password
      })
    });
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    setIsFetchingUser(true);

    const email = event.target.email.value;
    const password = event.target.password.value;
    const res = await login(email, password);

    setIsFetchingUser(false);

    if (res.ok) {
      router.push('/dashboard');
    } else {
      setLoginFailed(true);
    }
  }, []);

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {isFetchingUser ? <CircularProgress className={classes.avatar} color={"secondary"}/> : <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> }
        <Typography component="h1" variant="h5">
          Sign in!
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {loginFailed && <Alert severity="error" >You have entered an invalid username or password</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" onClick={() => router.push('/signup')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
